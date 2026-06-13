import ClientPage from "@/components/ClientPage";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  const [
    profile,
    about,
    timeline,
    skills,
    courseCerts,
    participationCerts,
    resume,
    socialLinks,
    quote,
  ] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "main" } }),
    prisma.about.findUnique({ where: { id: "main" } }),
    prisma.timelineEntry.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({
      where: { type: "course" },
      orderBy: { order: "asc" },
    }),
    prisma.certification.findMany({
      where: { type: "participation" },
      orderBy: { order: "asc" },
    }),
    prisma.resume.findUnique({ where: { id: "main" } }),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    prisma.quote.findUnique({ where: { id: "main" } }),
  ]);

  return {
    profile,
    about,
    timeline,
    skills,
    courseCerts,
    participationCerts,
    resume,
    socialLinks,
    quote,
  };
}

export default async function Home() {
  const data = await getData();
  return <ClientPage data={data} />;
}
