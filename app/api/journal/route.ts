import { NextResponse } from "next/server";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

//create an api to create a new journal entry
export const POST = async () => {
  const user = await getUserFromClerkID(); //get user from db

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day!",
    },
  });

  return NextResponse.json({ data: entry });
};
