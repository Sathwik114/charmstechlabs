import { createClient, type Client, type InValue } from "@libsql/client";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";

type Row = Record<string, unknown>;

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  type: string;
  icon: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface ProjectModule {
  id: string;
  projectId: string;
  moduleName: string;
  description: string | null;
  displayOrder: number;
}

export interface ProjectFeature {
  id: string;
  projectId: string;
  feature: string;
  displayOrder: number;
}

export interface Project {
  id: string;
  projectCode: string;
  title: string;
  slug: string;
  degree: string;
  categoryId: string;
  subcategory: string | null;
  difficulty: string;
  shortDescription: string;
  description: string;
  problemStatement: string | null;
  proposedSolution: string | null;
  objectives: string | null;
  duration: string | null;
  pricing: string | null;
  status: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: ProjectCategory;
  technologies: Technology[];
  modules?: ProjectModule[];
  features?: ProjectFeature[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  duration: string;
  level: string;
  status: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  technologies: Technology[];
  modules: Array<{
    id: string;
    courseId: string;
    moduleName: string;
    description: string | null;
    displayOrder: number;
  }>;
  _count?: { modules: number };
}

export interface ProjectRequest {
  id: string;
  requestCode: string;
  projectId: string | null;
  fullName: string;
  mobile: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  year: string;
  preferredContact: string;
  message: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
  project: Pick<Project, "id" | "title" | "slug"> | null;
}

export interface Registration {
  id: string;
  registrationCode: string;
  fullName: string;
  mobile: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  year: string;
  interestType: string;
  preferredCourse: string | null;
  preferredProject: string | null;
  preferredTechnology: string | null;
  message: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
}

let client: Client | undefined;
let schemaPromise: Promise<void> | undefined;

function getClient(): Client {
  if (!client) {
    const url =
      process.env.TURSO_DATABASE_URL ||
      (process.env.NODE_ENV !== "production"
        ? `file:${resolve(process.cwd(), "prisma", "dev.db")}`
        : undefined);
    if (!url) {
      throw new Error("TURSO_DATABASE_URL must be configured in production.");
    }

    const authToken = process.env.TURSO_AUTH_TOKEN;
    client = createClient({
      url,
      ...(authToken ? { authToken } : {}),
    });
  }

  return client;
}

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS AdminUser (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'admin',
    isActive INTEGER NOT NULL DEFAULT 1, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS ProjectCategory (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
    description TEXT, isActive INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS Technology (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL, icon TEXT, isActive INTEGER NOT NULL DEFAULT 1,
    createdAt TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS Project (
    id TEXT PRIMARY KEY, projectCode TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE, degree TEXT NOT NULL, categoryId TEXT NOT NULL,
    subcategory TEXT, difficulty TEXT NOT NULL, shortDescription TEXT NOT NULL,
    description TEXT NOT NULL, problemStatement TEXT, proposedSolution TEXT,
    objectives TEXT, duration TEXT, pricing TEXT, status TEXT NOT NULL DEFAULT 'Available',
    isFeatured INTEGER NOT NULL DEFAULT 0, isPublished INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES ProjectCategory(id)
  )`,
  `CREATE TABLE IF NOT EXISTS ProjectModule (
    id TEXT PRIMARY KEY, projectId TEXT NOT NULL, moduleName TEXT NOT NULL,
    description TEXT, displayOrder INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (projectId) REFERENCES Project(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS ProjectFeature (
    id TEXT PRIMARY KEY, projectId TEXT NOT NULL, feature TEXT NOT NULL,
    displayOrder INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (projectId) REFERENCES Project(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS Course (
    id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
    shortDescription TEXT NOT NULL, description TEXT NOT NULL, duration TEXT NOT NULL,
    level TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Available',
    isFeatured INTEGER NOT NULL DEFAULT 0, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS CourseModule (
    id TEXT PRIMARY KEY, courseId TEXT NOT NULL, moduleName TEXT NOT NULL,
    description TEXT, displayOrder INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (courseId) REFERENCES Course(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS Registration (
    id TEXT PRIMARY KEY, registrationCode TEXT NOT NULL UNIQUE, fullName TEXT NOT NULL,
    mobile TEXT NOT NULL, email TEXT NOT NULL, college TEXT NOT NULL, degree TEXT NOT NULL,
    branch TEXT NOT NULL, year TEXT NOT NULL, interestType TEXT NOT NULL,
    preferredCourse TEXT, preferredProject TEXT, preferredTechnology TEXT, message TEXT,
    status TEXT NOT NULL DEFAULT 'New', adminNotes TEXT,
    createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS ProjectRequest (
    id TEXT PRIMARY KEY, requestCode TEXT NOT NULL UNIQUE, projectId TEXT,
    fullName TEXT NOT NULL, mobile TEXT NOT NULL, email TEXT NOT NULL,
    college TEXT NOT NULL, degree TEXT NOT NULL, branch TEXT NOT NULL, year TEXT NOT NULL,
    preferredContact TEXT NOT NULL, message TEXT, status TEXT NOT NULL DEFAULT 'New',
    adminNotes TEXT, createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL,
    FOREIGN KEY (projectId) REFERENCES Project(id) ON DELETE SET NULL
  )`,
  `CREATE TABLE IF NOT EXISTS ContactEnquiry (
    id TEXT PRIMARY KEY, enquiryCode TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
    mobile TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL, message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New', adminNotes TEXT,
    createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS InternshipRequest (
    id TEXT PRIMARY KEY, requestCode TEXT NOT NULL UNIQUE, fullName TEXT NOT NULL,
    mobile TEXT NOT NULL, email TEXT NOT NULL, college TEXT NOT NULL, degree TEXT NOT NULL,
    branch TEXT NOT NULL, year TEXT NOT NULL, technologyInterest TEXT NOT NULL,
    message TEXT, status TEXT NOT NULL DEFAULT 'New', createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS _ProjectTechnologies (
    A TEXT NOT NULL, B TEXT NOT NULL,
    PRIMARY KEY (A, B),
    FOREIGN KEY (A) REFERENCES Project(id) ON DELETE CASCADE,
    FOREIGN KEY (B) REFERENCES Technology(id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS _CourseTechnologies (
    A TEXT NOT NULL, B TEXT NOT NULL,
    PRIMARY KEY (A, B),
    FOREIGN KEY (A) REFERENCES Course(id) ON DELETE CASCADE,
    FOREIGN KEY (B) REFERENCES Technology(id) ON DELETE CASCADE
  )`,
];

async function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const db = getClient();
      await db.batch(schemaStatements.map((sql) => ({ sql })), "write");
    })().catch((error: unknown) => {
      schemaPromise = undefined;
      throw error;
    });
  }

  await schemaPromise;
}

function normalizeRow<T>(row: Row): T {
  const booleanColumns = new Set(["isActive", "isFeatured", "isPublished"]);
  const dateColumns = new Set(["createdAt", "updatedAt"]);
  const normalized: Row = {};

  for (const [key, value] of Object.entries(row)) {
    if (booleanColumns.has(key)) {
      normalized[key] = Boolean(value);
    } else if (dateColumns.has(key) && typeof value === "string") {
      normalized[key] = new Date(value);
    } else {
      normalized[key] = value;
    }
  }

  return normalized as T;
}

async function all<T>(sql: string, args: InValue[] = []): Promise<T[]> {
  await ensureSchema();
  const result = await getClient().execute({ sql, args });
  return result.rows.map((row) => normalizeRow<T>(row as Row));
}

export async function executeSql(sql: string, args: InValue[] = []): Promise<void> {
  await ensureSchema();
  await getClient().execute({ sql, args });
}

export async function executeBatch(
  statements: Array<{ sql: string; args?: InValue[] }>,
): Promise<void> {
  await ensureSchema();
  if (statements.length > 0) {
    await getClient().batch(statements, "write");
  }
}

export async function getProjectCount(degree?: string): Promise<number> {
  const rows = await all<{ count: number }>(
    `SELECT COUNT(*) AS count FROM Project${degree ? " WHERE degree = ?" : ""}`,
    degree ? [degree] : [],
  );
  return Number(rows[0].count);
}

async function attachProjectRelations(
  projects: Project[],
  options: { modules?: boolean; features?: boolean } = {},
): Promise<Project[]> {
  if (projects.length === 0) return projects;
  const ids = projects.map((project) => project.id);
  const placeholders = ids.map(() => "?").join(", ");
  const [categories, technologyLinks, modules, features] = await Promise.all([
    all<ProjectCategory>(
      `SELECT DISTINCT c.* FROM ProjectCategory c JOIN Project p ON p.categoryId = c.id WHERE p.id IN (${placeholders})`,
      ids,
    ),
    all<Technology & { projectId: string }>(
      `SELECT pt.A AS projectId, t.* FROM _ProjectTechnologies pt JOIN Technology t ON t.id = pt.B WHERE pt.A IN (${placeholders})`,
      ids,
    ),
    options.modules
      ? all<ProjectModule>(
          `SELECT * FROM ProjectModule WHERE projectId IN (${placeholders}) ORDER BY displayOrder ASC`,
          ids,
        )
      : Promise.resolve([]),
    options.features
      ? all<ProjectFeature>(
          `SELECT * FROM ProjectFeature WHERE projectId IN (${placeholders}) ORDER BY displayOrder ASC`,
          ids,
        )
      : Promise.resolve([]),
  ]);

  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const technologiesByProject = new Map<string, Technology[]>();
  for (const { projectId, ...technology } of technologyLinks) {
    const list = technologiesByProject.get(projectId) ?? [];
    list.push(technology);
    technologiesByProject.set(projectId, list);
  }

  const modulesByProject = new Map<string, ProjectModule[]>();
  for (const module of modules) {
    const list = modulesByProject.get(module.projectId) ?? [];
    list.push(module);
    modulesByProject.set(module.projectId, list);
  }

  const featuresByProject = new Map<string, ProjectFeature[]>();
  for (const feature of features) {
    const list = featuresByProject.get(feature.projectId) ?? [];
    list.push(feature);
    featuresByProject.set(feature.projectId, list);
  }

  return projects.map((project) => ({
    ...project,
    category: categoryById.get(project.categoryId)!,
    technologies: technologiesByProject.get(project.id) ?? [],
    ...(options.modules ? { modules: modulesByProject.get(project.id) ?? [] } : {}),
    ...(options.features ? { features: featuresByProject.get(project.id) ?? [] } : {}),
  }));
}

export async function getFeaturedProjects(limit: number): Promise<Project[]> {
  const projects = await all<Project>(
    "SELECT * FROM Project WHERE isPublished = 1 ORDER BY createdAt DESC LIMIT ?",
    [limit],
  );
  return attachProjectRelations(projects);
}

export async function getPublishedProjects(filters: {
  categoryId?: string | null;
  degree?: string | null;
} = {}): Promise<Project[]> {
  const conditions: string[] = [];
  const args: InValue[] = [];
  conditions.push("isPublished = 1");
  if (filters.categoryId) {
    conditions.push("categoryId = ?");
    args.push(filters.categoryId);
  }
  if (filters.degree) {
    conditions.push("degree = ?");
    args.push(filters.degree);
  }

  const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const projects = await all<Project>(`SELECT * FROM Project${where} ORDER BY createdAt DESC`, args);
  return attachProjectRelations(projects);
}

export async function getProjectBySlug(
  slug: string,
  options: { includeDrafts?: boolean; modules?: boolean; features?: boolean } = {},
): Promise<Project | null> {
  const conditions = ["slug = ?"];
  const args: InValue[] = [slug];
  if (!options.includeDrafts) conditions.push("isPublished = 1");
  const projects = await all<Project>(
    `SELECT * FROM Project WHERE ${conditions.join(" AND ")} LIMIT 1`,
    args,
  );
  const [project] = await attachProjectRelations(projects, options);
  return project ?? null;
}

export async function getRelatedProjects(categoryId: string, exceptId: string): Promise<Project[]> {
  const projects = await all<Project>(
    "SELECT * FROM Project WHERE categoryId = ? AND id != ? AND isPublished = 1 LIMIT 3",
    [categoryId, exceptId],
  );
  return attachProjectRelations(projects);
}

export async function getProjectCategories(activeOnly = true): Promise<ProjectCategory[]> {
  return all<ProjectCategory>(
    `SELECT * FROM ProjectCategory${activeOnly ? " WHERE isActive = 1" : ""} ORDER BY name ASC`,
  );
}

async function attachCourseRelations(
  courses: Course[],
  options: { modules?: boolean; counts?: boolean } = {},
): Promise<Course[]> {
  if (courses.length === 0) return courses;
  const ids = courses.map((course) => course.id);
  const placeholders = ids.map(() => "?").join(", ");
  const [technologyLinks, modules] = await Promise.all([
    all<Technology & { courseId: string }>(
      `SELECT ct.A AS courseId, t.* FROM _CourseTechnologies ct JOIN Technology t ON t.id = ct.B WHERE ct.A IN (${placeholders})`,
      ids,
    ),
    options.modules || options.counts
      ? all<Course["modules"][number]>(
          `SELECT * FROM CourseModule WHERE courseId IN (${placeholders}) ORDER BY displayOrder ASC`,
          ids,
        )
      : Promise.resolve([]),
  ]);
  const technologiesByCourse = new Map<string, Technology[]>();
  for (const { courseId, ...technology } of technologyLinks) {
    const list = technologiesByCourse.get(courseId) ?? [];
    list.push(technology);
    technologiesByCourse.set(courseId, list);
  }
  const modulesByCourse = new Map<string, Course["modules"]>();
  for (const module of modules) {
    const list = modulesByCourse.get(module.courseId) ?? [];
    list.push(module);
    modulesByCourse.set(module.courseId, list);
  }

  return courses.map((course) => {
    const courseModules = modulesByCourse.get(course.id) ?? [];
    return {
      ...course,
      technologies: technologiesByCourse.get(course.id) ?? [],
      modules: options.modules ? courseModules : [],
      ...(options.counts ? { _count: { modules: courseModules.length } } : {}),
    };
  });
}

export async function getCourses(options: {
  status?: string;
  includeModules?: boolean;
  includeCounts?: boolean;
} = {}): Promise<Course[]> {
  const args: InValue[] = [];
  const where = options.status ? " WHERE status = ?" : "";
  if (options.status) args.push(options.status);
  const courses = await all<Course>(`SELECT * FROM Course${where} ORDER BY createdAt DESC`, args);
  return attachCourseRelations(courses, {
    modules: options.includeModules,
    counts: options.includeCounts,
  });
}

export async function getCourseBySlug(
  slug: string,
  status?: string,
  includeModules = true,
): Promise<Course | null> {
  const conditions = ["slug = ?"];
  const args: InValue[] = [slug];
  if (status) {
    conditions.push("status = ?");
    args.push(status);
  }
  const courses = await all<Course>(
    `SELECT * FROM Course WHERE ${conditions.join(" AND ")} LIMIT 1`,
    args,
  );
  const [course] = await attachCourseRelations(courses, { modules: includeModules });
  return course ?? null;
}

export async function getAdminProjects(): Promise<Array<Project & {
  _count: { requests: number };
}>> {
  const rows = await all<Project & {
    categoryName: string | null;
    categorySlug: string | null;
    categoryDescription: string | null;
    categoryIsActive: number | null;
    categoryCreatedAt: string | null;
    categoryUpdatedAt: string | null;
    requestCount: number;
  }>(
    `SELECT p.*, c.name AS categoryName, c.slug AS categorySlug,
      c.description AS categoryDescription, c.isActive AS categoryIsActive,
      c.createdAt AS categoryCreatedAt, c.updatedAt AS categoryUpdatedAt,
      COUNT(r.id) AS requestCount
     FROM Project p JOIN ProjectCategory c ON c.id = p.categoryId
     LEFT JOIN ProjectRequest r ON r.projectId = p.id
     GROUP BY p.id ORDER BY p.createdAt DESC`,
  );
  return rows.map(({ categoryName, categorySlug, categoryDescription, categoryIsActive, categoryCreatedAt, categoryUpdatedAt, requestCount, ...project }) => ({
    ...project,
    category: {
      id: project.categoryId,
      name: categoryName!,
      slug: categorySlug!,
      description: categoryDescription,
      isActive: Boolean(categoryIsActive),
      createdAt: new Date(categoryCreatedAt!),
      updatedAt: new Date(categoryUpdatedAt!),
    },
    _count: { requests: Number(requestCount) },
  }));
}

export async function getAdminCourses(): Promise<Array<Course & { _count: { modules: number } }>> {
  const courses = await getCourses({ includeModules: true });
  return courses.map((course) => ({
    ...course,
    _count: { modules: course.modules.length },
  }));
}

export async function getProjectRequests(): Promise<ProjectRequest[]> {
  const rows = await all<ProjectRequest & {
    relatedProjectId: string | null;
    relatedProjectTitle: string | null;
    relatedProjectSlug: string | null;
  }>(
    `SELECT r.*, p.id AS relatedProjectId, p.title AS relatedProjectTitle,
      p.slug AS relatedProjectSlug
     FROM ProjectRequest r LEFT JOIN Project p ON p.id = r.projectId
     ORDER BY r.createdAt DESC`,
  );
  return rows.map(({ relatedProjectId, relatedProjectTitle, relatedProjectSlug, ...request }) => ({
    ...request,
    project: relatedProjectId && relatedProjectTitle && relatedProjectSlug
      ? { id: relatedProjectId, title: relatedProjectTitle, slug: relatedProjectSlug }
      : null,
  }));
}

export async function getRegistrations(): Promise<Registration[]> {
  return all<Registration>("SELECT * FROM Registration ORDER BY createdAt DESC");
}

export async function getRequestCount(status?: string): Promise<number> {
  const rows = await all<{ count: number }>(
    `SELECT COUNT(*) AS count FROM ProjectRequest${status ? " WHERE status = ?" : ""}`,
    status ? [status] : [],
  );
  return Number(rows[0].count);
}

export async function getCourseCount(): Promise<number> {
  const rows = await all<{ count: number }>("SELECT COUNT(*) AS count FROM Course");
  return Number(rows[0].count);
}

export async function createContactEnquiry(data: {
  enquiryCode: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}): Promise<{ enquiryCode: string }> {
  const now = new Date().toISOString();
  await executeSql(
    `INSERT INTO ContactEnquiry (id, enquiryCode, name, email, mobile, subject, message, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [randomUUID(), data.enquiryCode, data.name, data.email, data.mobile, data.subject, data.message, now, now],
  );
  return { enquiryCode: data.enquiryCode };
}

export async function createProjectRequest(data: {
  requestCode: string;
  projectId: string | null;
  fullName: string;
  mobile: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  year: string;
  preferredContact: string;
  message: string;
  status: string;
}): Promise<{ requestCode: string }> {
  const now = new Date().toISOString();
  await executeSql(
    `INSERT INTO ProjectRequest
     (id, requestCode, projectId, fullName, mobile, email, college, degree, branch, year, preferredContact, message, status, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      randomUUID(), data.requestCode, data.projectId, data.fullName, data.mobile, data.email,
      data.college, data.degree, data.branch, data.year, data.preferredContact, data.message,
      data.status, now, now,
    ],
  );
  return { requestCode: data.requestCode };
}

export async function countAdminUsers(): Promise<number> {
  const rows = await all<{ count: number }>("SELECT COUNT(*) AS count FROM AdminUser");
  return Number(rows[0].count);
}

export async function createAdminUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
}): Promise<void> {
  const now = new Date().toISOString();
  await executeSql(
    "INSERT INTO AdminUser (id, name, email, passwordHash, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [randomUUID(), data.name, data.email, data.passwordHash, data.role, now, now],
  );
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const [user] = await all<AdminUser>("SELECT * FROM AdminUser WHERE email = ? LIMIT 1", [email]);
  return user ?? null;
}
