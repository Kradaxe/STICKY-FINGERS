import ReactMarkdown from "react-markdown";

interface Props {
  markdown: string;
}

export default function MarkdownViewer({
  markdown,
}: Props) {
  return (
    <div className="prose max-w-none rounded-2xl border border-violet-400/20 bg-violet-500/10 p-6">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
