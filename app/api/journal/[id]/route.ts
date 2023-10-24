import { NextResponse } from "next/server";
import { analyizeEntry } from "@/utils/ai";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

export const PATCH = async (request: Request, { params }) => {
  const user = await getUserFromClerkID();
  const { content } = await request.json();

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: content,
  });

  const analysis = await analyizeEntry(entry.content);
  console.log("return from analysis call", analysis);

  const savedAnalysis = await prisma.entryAnalysis.upsert({
    where: {
      entryId: entry.id,
    },
    update: { ...analysis },
    create: {
      entryId: entry.id,
      userId: user.id,
      ...analysis,
    },
  });

  console.log("saved analysis", savedAnalysis);
  return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } });
};
