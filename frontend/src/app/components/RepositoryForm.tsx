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
      className="space-y-4"
    >
      <input
        type="text"
        placeholder="GitHub Repository URL"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        className="w-full rounded-lg border p-3"
      />

      <button
        className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Repository"}
      </button>
    </form>
  );
}