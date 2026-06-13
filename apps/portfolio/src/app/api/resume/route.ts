import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: "main" } });

    if (!resume?.fileUrl) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.redirect(resume.fileUrl);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}
