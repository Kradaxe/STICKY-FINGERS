import { Repository } from "../types/repository";

export default function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <div className="surface rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-violet-300"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" /> Repository analyzed</div>
          <h2 className="text-3xl font-bold tracking-tight text-white">{repository.name}</h2>
          <p className="mt-1 text-sm text-slate-400">{repository.owner}</p>
        </div>
        <div className="h-fit rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 text-sm text-violet-200">◈ {repository.defaultBranch}</div>
      </div>
      <p className="mt-5 max-w-3xl leading-7 text-slate-300">{repository.description || "No repository description provided."}</p>
      <div className="mt-7 grid grid-cols-2 gap-5 border-t border-white/8 pt-6 md:grid-cols-4">
        <Metric label="★ STARS" value={repository.stars} />
        <Metric label="⑂ FORKS" value={repository.forks} />
        <Metric label="◌ LANGUAGE" value={repository.primaryLanguage ?? "Unknown"} />
        <Metric label="⌥ BRANCH" value={repository.defaultBranch} />
      </div>
      {repository.topics.length > 0 && <div className="mt-6"><h3 className="text-sm font-semibold text-white">Topics</h3><div className="mt-3 flex flex-wrap gap-2">{repository.topics.map((topic) => <span key={topic} className="rounded-full border border-violet-300/15 bg-violet-300/10 px-3 py-1 text-sm text-violet-200">{topic}</span>)}</div></div>}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-semibold text-white">{value}</p></div>;
}
