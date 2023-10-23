import Editor from "@/components/Editor";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (id: any) => {
  const user = await getUserFromClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        //compound index query based on order of index array
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const JournalEditorPage = async ({ params }) => {
  const entry = await getEntry(params.id);

  return (
    <div className="w-full h-full">
      {/* <Editor entry={entry} /> */}
      <Editor entry={entry} />
    </div>
  );
};

export default JournalEditorPage;
