import { loadEnvConfig } from "@next/env";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import type { InValue } from "@libsql/client";
import { executeBatch } from "@/lib/db";

loadEnvConfig(process.cwd());

const databasePath = resolve(process.cwd(), "prisma", "dev.db");
if (!existsSync(databasePath)) {
  throw new Error(`Legacy SQLite database not found: ${databasePath}`);
}

const tables = [
  "AdminUser",
  "ProjectCategory",
  "Technology",
  "Project",
  "ProjectModule",
  "ProjectFeature",
  "Course",
  "CourseModule",
  "Registration",
  "ProjectRequest",
  "ContactEnquiry",
  "InternshipRequest",
  "_ProjectTechnologies",
  "_CourseTechnologies",
];

const exportDatabase = `
import json
import sqlite3
import sys

tables = ${JSON.stringify(tables)}
connection = sqlite3.connect("file:" + sys.argv[1] + "?mode=ro", uri=True)
connection.row_factory = sqlite3.Row
data = {
    table: [dict(row) for row in connection.execute('SELECT * FROM "' + table + '"')]
    for table in tables
}
print(json.dumps(data))
connection.close()
`;

const python = process.env.PYTHON ?? "python";
const result = spawnSync(python, ["-c", exportDatabase, databasePath], {
  encoding: "utf8",
  maxBuffer: 20 * 1024 * 1024,
});

if (result.error) {
  throw new Error(`Could not run Python to read the SQLite database: ${result.error.message}`);
}
if (result.status !== 0) {
  throw new Error(`Could not export the SQLite database: ${result.stderr.trim()}`);
}

type LegacyRow = Record<string, unknown>;
type ExportedData = Record<string, LegacyRow[]>;
const data = JSON.parse(result.stdout) as ExportedData;

function toSqlValue(value: unknown): InValue {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "boolean" ||
    value instanceof Uint8Array
  ) {
    return value;
  }
  throw new TypeError(`Unsupported SQLite value type: ${typeof value}`);
}

async function main(): Promise<void> {
  let inserted = 0;
  for (const table of tables) {
    const statements = (data[table] ?? []).map((row) => {
      const columns = Object.keys(row);
      const quotedColumns = columns.map((column) => `"${column.replaceAll('"', '""')}"`);
      const placeholders = columns.map(() => "?").join(", ");
      const args = columns.map((column) => toSqlValue(row[column]));

      return {
        sql: `INSERT OR IGNORE INTO "${table}" (${quotedColumns.join(", ")}) VALUES (${placeholders})`,
        args,
      };
    });

    for (let offset = 0; offset < statements.length; offset += 100) {
      await executeBatch(statements.slice(offset, offset + 100));
    }
    inserted += statements.length;
    console.log(`Imported ${statements.length} rows from ${table}.`);
  }

  console.log(`SQLite data migration complete (${inserted} total rows).`);
}

main().catch((error: unknown) => {
  console.error("SQLite data migration failed:", error);
  process.exitCode = 1;
});
