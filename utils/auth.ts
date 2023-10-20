import type { User } from "@clerk/nextjs/api";
import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

//getting current user from db with clerk id
export const getUserFromClerkID = async (
  includes = {},
  select = { id: true }
) => {
  const { userId } = auth();
  const user = await prisma.user.findUniqueOrThrow({
    //throw in case user is in clerk but not in my db
    where: {
      clerkId: userId as string,
    },
    select, //select properties to select from model
  });

  return user;
};

// export const syncNewUser = async (clerkUser: User) => {
//   const existingUser = await prisma.user.findUnique({
//     where: {
//       clerkId: clerkUser.id,
//     },
//   });

//   if (!existingUser) {
//     const email = clerkUser.emailAddresses[0].emailAddress;
//     // const { subscriptionId, customerId } = await createAndSubNewCustomer(email)

//     await prisma.user.create({
//       data: {
//         clerkId: clerkUser.id,
//         email,
//         account: {
//           create: {
//             // stripeCustomerId: customerId,
//             // stripeSubscriptionId: subscriptionId,
//           },
//         },
//       },
//     });
//   }
// };
