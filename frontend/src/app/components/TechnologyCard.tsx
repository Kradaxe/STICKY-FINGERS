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
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
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
    <div className="surface space-y-6 rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white">
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
