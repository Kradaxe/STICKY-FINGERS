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
    <div className="mt-10 rounded-xl border bg-white">
      <div className="flex border-b">
        {Object.keys(docs).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key as Tab)}
            className={`px-5 py-3 ${
              tab === key
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="prose max-w-none p-8">
        <ReactMarkdown>
          {docs[tab]}
        </ReactMarkdown>
      </div>
    </div>
  );
}