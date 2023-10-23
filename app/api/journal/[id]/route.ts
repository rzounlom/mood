import { NextResponse } from "next/server";
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

  return NextResponse.json({ data: { ...entry } });
};
