import { NextResponse } from "next/server";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { qa } from "@/utils/ai";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const user = await getUserFromClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      content: true,
      createdAt: true,
    },
  });

  const answer = await qa(question, entries);
  return NextResponse.json({ data: answer });
};