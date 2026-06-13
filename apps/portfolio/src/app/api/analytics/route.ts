import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

async function readBody(request: NextRequest) {
  const text = await request.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await readBody(request);

    if (body.action === "exit" && body.visitorId) {
      await prisma.visitor.update({
        where: { id: body.visitorId },
        data: {
          exitTime: body.exitTime ? new Date(body.exitTime) : new Date(),
          sessionDuration: typeof body.sessionDuration === "number" ? body.sessionDuration : 0,
        },
      });

      return NextResponse.json({ success: true });
    }

    const country =
      request.headers.get("x-vercel-ip-country") ||
      request.headers.get("cf-ipcountry") ||
      "Unknown";

    const visitor = await prisma.visitor.create({
      data: {
        browser: body.browser || "Unknown",
        operatingSystem: body.operatingSystem || "Unknown",
        deviceType: body.deviceType || "desktop",
        screenResolution: body.screenResolution || "Unknown",
        referrer: body.referrer || "Direct",
        country,
        entryTime: new Date(),
      },
    });

    return NextResponse.json({ visitorId: visitor.id });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to record analytics" }, { status: 500 });
  }
}
