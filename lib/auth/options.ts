import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const email = credentials?.email?.toString().trim().toLowerCase();
      const password = credentials?.password?.toString().trim();

      if (!email || !password) {
        return null;
      }

      const user = await db.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          passwordHash: true,
          isActive: true,
        },
      });

      if (!user || !user.passwordHash || !user.isActive) {
        return null;
      }

      const isPasswordValid = await verifyPassword(password, user.passwordHash);
      if (!isPasswordValid) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.fullName,
        role: user.role,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.email) {
        const normalizedEmail = user.email.trim().toLowerCase();
        const normalizedName = user.name?.trim();

        const dbUser = await db.user.upsert({
          where: { email: normalizedEmail },
          update: normalizedName ? { fullName: normalizedName } : {},
          create: {
            email: normalizedEmail,
            fullName: normalizedName || normalizedEmail.split("@")[0],
          },
          select: {
            id: true,
            role: true,
            fullName: true,
          },
        });

        token.id = dbUser.id;
        token.role = dbUser.role;
        token.email = normalizedEmail;
        token.name = dbUser.fullName;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.role = typeof token.role === "string" ? token.role : "STUDENT";
        session.user.email = typeof token.email === "string" ? token.email : session.user.email;
        session.user.name = typeof token.name === "string" ? token.name : session.user.name;
      }
      return session;
    },
  },
};
