interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="surface rounded-2xl p-5 transition hover:-translate-y-1 hover:border-violet-400/40">
      <p className="text-xs font-medium uppercase tracking-[.16em] text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</h3>
    </div>
  );
}
