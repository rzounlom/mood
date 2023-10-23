import { NextResponse } from "next/server";
import { analyize } from "@/utils/ai";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";

//create an api to create a new journal entry
export const POST = async () => {
  const user = await getUserFromClerkID(); //get user from db
  const entry = await prisma.journalEntry.create({
    data: {
      content: "Write about your day!",
      user: {
        connect: {
          id: user.id,
        },
      },
      analysis: {
        create: {
          mood: "Neutral",
          subject: "None",
          negative: false,
          summary: "None",
          sentimentScore: 0,
          color: "#0101fe",
          userId: user.id,
        },
      },
    },
  });

  return NextResponse.json({ data: entry });
};
