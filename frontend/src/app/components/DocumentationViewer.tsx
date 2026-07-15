"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  readme: string;
  setup: string;
  architecture: string;
  api: string;
}

type Tab = "README" | "SETUP" | "ARCHITECTURE" | "API";

export default function DocumentationViewer({
  readme,
  setup,
  architecture,
  api,
}: Props) {
  const [tab, setTab] = useState<Tab>("README");

  const docs = {
    README: readme,
    SETUP: setup,
    ARCHITECTURE: architecture,
    API: api,
  };

  return (
    <div className="surface mt-10 overflow-hidden rounded-2xl">
      <div className="flex overflow-x-auto border-b border-white/10">
        {Object.keys(docs).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key as Tab)}
            className={`px-5 py-3 ${
              tab === key
                ? "border-b-2 border-violet-400 font-semibold text-white"
                : "text-slate-500 hover:text-slate-200"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="prose max-w-none p-6 sm:p-8">
        <ReactMarkdown>
          {docs[tab]}
        </ReactMarkdown>
      </div>
    </div>
  );
}
