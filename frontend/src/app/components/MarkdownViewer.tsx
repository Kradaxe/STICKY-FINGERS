import ReactMarkdown from "react-markdown";

interface Props {
  markdown: string;
}

export default function MarkdownViewer({
  markdown,
}: Props) {
  return (
    <div className="prose prose-invert max-w-none rounded-xl bg-zinc-900 p-6">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}