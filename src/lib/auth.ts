import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { countAdminUsers, createAdminUser, getAdminUserByEmail } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@charmstechlabs.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Auto-setup: If no admin exists, create the default one
        const adminCount = await countAdminUsers();
        if (adminCount === 0) {
          const hashedPassword = await bcrypt.hash("admin123", 10);
          await createAdminUser({
            email: "admin@charmstechlabs.com",
            name: "Super Admin",
            passwordHash: hashedPassword,
            role: "admin"
          });
        }

        const user = await getAdminUserByEmail(credentials.email);

        if (!user || !user.isActive) {
          throw new Error("User not found or disabled");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key_for_development_only_12345",
};
