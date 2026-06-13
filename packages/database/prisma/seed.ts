import path from "path";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@portfolio.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";
  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      password: hashedPassword,
    },
  });

  await prisma.about.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      content: "Write your About Me content from the admin panel.",
    },
  });

  await prisma.quote.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      text: "Consistency creates progress.",
      author: "Reon",
    },
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
