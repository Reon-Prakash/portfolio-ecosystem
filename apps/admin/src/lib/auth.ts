import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("LOGIN ATTEMPT:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("MISSING CREDENTIALS");
          return null;
        }

        const admin = await prisma.adminUser.findUnique({
          where: { email: credentials.email },
        });

        console.log("DB USER:", admin);

        if (!admin) {
          console.log("NO USER FOUND");
          return null;
        }

        console.log("DB HASH:", admin.password);

        const valid = await bcrypt.compare(
          credentials.password,
          admin.password,
        );

        console.log("PASSWORD VALID:", valid);

        if (!valid) {
          console.log("PASSWORD WRONG");
          return null;
        }

        console.log("LOGIN SUCCESS");

        return {
          id: admin.id,
          email: admin.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
