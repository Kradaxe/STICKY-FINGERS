import { RepositoryAnalysis } from "../types/repository";

interface Props {
  analysis: RepositoryAnalysis;
}

const List = ({ title, items }: { title: string; items: string[] }) => {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold">{title}</h3>

      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function TechnologyCard({ analysis }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">
        Technology Stack
      </h2>

      <List title="Languages" items={analysis.languages ?? []} />

      <List title="Database" items={analysis.database} />

      <List title="Styling" items={analysis.styling} />

      <List title="Authentication" items={analysis.authentication} />

      <List title="Testing" items={analysis.testing} />

      <List title="Tools" items={analysis.tools} />

      <List title="Deployment" items={analysis.deployment} />
    </div>
  );
}