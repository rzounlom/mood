"use client";

import { updateEntry } from "@/utils/api";
import { useAutosave } from "react-autosave";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Editor = ({ entry }) => {
  const [text, setText] = useState(entry.content);
  const [currentEntry, setEntry] = useState(entry);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useAutosave({
    data: text,
    onSave: async (_text) => {
      if (_text === entry.content) return;
      setIsSaving(true);

      const { data } = await updateEntry(entry.id, { content: _text });

      setEntry(data);
      setIsSaving(false);
    },
  });

  return (
    <div className="w-full h-full">
      <div>
        {isSaving ? (
          "loading..."
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <textarea
        className="w-full h-full text-xl p-8 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default Editor;
