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
  const analysisData = [
    {
      name: "Summary",
      value: "",
    },
    {
      name: "Subject",
      value: "",
    },
    {
      name: "Mood",
      value: "",
    },
    {
      name: "Negative",
      value: "False",
    },
  ];

  return (
    <div className="w-full h-full grid grid-cols-3">
      {/* <Editor entry={entry} /> */}
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                className="px-2 py-4 flex items-center justify-between border-b borer-t border-black/10"
                key={item.name}
              >
                <span>{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JournalEditorPage;
