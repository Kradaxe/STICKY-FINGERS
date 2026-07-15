import ReactMarkdown from "react-markdown";

interface Props {
  summary: string;
}

export default function RepositorySummary({
  summary,
}: Props) {
  return (
    <div className="surface prose max-w-none rounded-2xl p-6 sm:p-8">
      <ReactMarkdown>
        {summary}
      </ReactMarkdown>
    </div>
  );
}
