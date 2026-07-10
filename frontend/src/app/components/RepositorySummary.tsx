import ReactMarkdown from "react-markdown";

interface Props {
  summary: string;
}

export default function RepositorySummary({
  summary,
}: Props) {
  return (
    <div className="prose prose-invert max-w-none rounded-xl border p-8">
      <ReactMarkdown>
        {summary}
      </ReactMarkdown>
    </div>
  );
}