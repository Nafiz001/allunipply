import { DefaultSession } from "next-auth";

type AppUserRole = "STUDENT" | "COUNSELOR" | "ADMIN";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: AppUserRole;
    };
  }

  interface User {
    role: AppUserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: AppUserRole;
  }
}
