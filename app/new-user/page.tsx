import { auth, currentUser } from "@clerk/nextjs";

import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();

  console.log(user);

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  if (!match) {
    //if user somehow got created without the db knowing, create a new user in the db
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/journal");
};

export default async function NewUser() {
  await createNewUser();
  return <div>...loading</div>;
}
