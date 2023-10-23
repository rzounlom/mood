import { NextResponse } from "next/server";
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
    },
  });

  revalidatePath("/journal"); //tell next to pull fetch data instead of using cached data

  return NextResponse.json({ data: entry });
};
