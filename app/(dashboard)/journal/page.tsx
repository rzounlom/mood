import EntryCard from "@/components/EntryCard";
import Link from "next/link";
import NewEntry from "@/components/NewEntry";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntries = async () => {
  //get user from db based on cler id
  const user = await getUserFromClerkID();

  //get all journal users
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return entries;
};

const JournalPage = async () => {
  const data = await getEntries();
  console.log({ data });
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      {" "}
      <h1 className="text-4xl mb-12">Journals</h1>
      <div className="grid grid-cols-3 gap-4">
        <NewEntry />
        {data.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
