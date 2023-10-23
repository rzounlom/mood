const JournalEditorPage = async ({ params }) => {
  // const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      {/* <Editor entry={entry} /> */}
      {params.id}
    </div>
  );
};

export default JournalEditorPage;
