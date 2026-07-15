"use client";

import { useState } from "react";

interface Props {
  onAnalyze: (url: string) => Promise<void>;
}

export default function RepositoryForm({
  onAnalyze,
}: Props) {
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!url.trim()) return;

    setLoading(true);

    try {
      await onAnalyze(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="relative mx-auto max-w-3xl"
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#111522]/90 p-2 shadow-2xl shadow-black/30 sm:flex-row sm:p-2.5">
        <div className="flex flex-1 items-center gap-3 px-3"><span className="text-xl text-violet-300">⌘</span><input type="url" placeholder="Paste a GitHub repository URL..." value={url} onChange={(e) => setUrl(e.target.value)} className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500" /></div>
        <button className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50" disabled={loading}>{loading ? "Mapping repository..." : "Analyze repository →"}</button>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">Public repositories only · AI-powered codebase intelligence</p>
    </form>
  );
}
