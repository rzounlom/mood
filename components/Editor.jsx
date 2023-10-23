"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Editor = ({ entry }) => {
  const [text, setText] = useState(entry.content);
  const [currentEntry, setEntry] = useState(entry);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full text-xl p-8 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default Editor;
