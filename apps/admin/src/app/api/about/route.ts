import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const data = await prisma.about.findUnique({
    where: { id: "main" },
  });

  return NextResponse.json(data || {});
}

export async function POST(req: Request) {
  const body = await req.json();

  const data = await prisma.about.upsert({
    where: { id: "main" },
    update: body,
    create: { id: "main", ...body },
  });

  return NextResponse.json(data);
}
