import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    totalVisitors: 0,
    todayVisitors: 0,
    avgDuration: 0,
  });
}
