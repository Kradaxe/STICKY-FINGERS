"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
  language: string;
}

export default function FileViewer({
  content,
  language,
}: Props) {
  return (  
    <div className="h-full overflow-y-auto">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          borderRadius: "12px",
          minHeight: "700px",
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
}