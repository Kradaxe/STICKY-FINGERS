"use client";

import { useState } from "react";

import RepositoryForm from "./components/RepositoryForm";
import RepositoryCard from "./components/RepositoryCard";

import { analyzeRepository } from "./services/repository.service";

import { RepositoryResponse } from "./types/repository";
import StatsCard from "./components/StatsCard";
import TechnologyCard from "./components/TechnologyCard";

import FileTree from "./components/FileTree";
import FileViewer from "./components/FileViewer";
import { getFileContent } from "./services/file.service";

import MarkdownViewer from "./components/MarkdownViewer";
import { explainFile } from "./services/ai.services";

import RepositorySummary from "./components/RepositorySummary";

import DocumentationViewer from "./components/DocumentationViewer";
import { generateDocumentation } from "./services/documentation.service";
import { askRepository } from "./services/chat.service";
import { DocumentationResponse } from "./types/documentation";

export default function Home() {
  const [result, setResult] = useState<RepositoryResponse["data"]>();
  const [repoUrl, setRepoUrl] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [extension, setExtension] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [activeTab, setActiveTab] = useState<
  "overview" |
  "docs" |
  "chat"
>("overview");
  const [documentation, setDocumentation] = useState<
  DocumentationResponse["data"] | null
>(null);

const [loadingDocs, setLoadingDocs] = useState(false);

  const analyze = async (url: string) => {
    setResult(undefined);
    setFileContent("");
    setSelectedFile("");
    setExtension("");
    setRepoUrl(url);
  
    const response = await analyzeRepository(url);
  
    setResult(response.data);
  };

  const openFile = async (path: string) => {
    if (!result) return;
  
    const response = await getFileContent(
      result.repository.path,
      path
    );
  
    setSelectedFile(path);
    setFileContent(response.data.content);
    setExtension(response.data.extension);
    setExplanation("");
  };

  const explainSelectedFile = async () => {
    if (!selectedFile || !fileContent) return;

    setLoadingAI(true);

    try {
      const response = await explainFile(
        selectedFile,
        fileContent
      );

      setExplanation(
        response.data.explanation
      );
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-16 pt-6 sm:px-8">
      <div className="grid-glow pointer-events-none absolute inset-x-0 top-0 h-[620px]" />
      <div className="relative mx-auto max-w-7xl">
        <nav className="mb-20 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 text-xl font-black text-white shadow-lg shadow-violet-500/20">S</div><span className="font-bold tracking-tight text-white">STICKY<span className="text-violet-400">-</span>FINGERS</span></div>
          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-400" /> SYSTEM ONLINE</div>
        </nav>
        {!result && <section className="mb-16 text-center"><p className="mb-5 text-xs font-bold uppercase tracking-[.28em] text-violet-300">Repository intelligence, instantly</p><h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-[-.055em] text-white sm:text-7xl">See the architecture <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">behind the code.</span></h1><p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">Turn any GitHub repository into an interactive, AI-assisted workspace. Explore, understand, and document codebases in seconds.</p></section>}
        <RepositoryForm onAnalyze={analyze} />

      {result && (
        <div className="mt-14">
          <RepositoryCard
            repository={result.repository}
          />

          <div className="mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-white/8 bg-white/[.035] p-1.5">
            {[
              "overview",
              "docs",
              "chat",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(
                    tab as
                      | "overview"
                      | "docs"
                      | "chat"
                  )
                }
                className={`rounded-xl px-5 py-3 text-sm font-semibold capitalize transition ${
                  activeTab === tab
                    ? "bg-violet-500 text-white shadow-lg shadow-violet-900/40"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <>
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatsCard
                  title="Files"
                  value={result.structure.statistics.totalFiles}
                />

                <StatsCard
                  title="Directories"
                  value={result.structure.statistics.totalDirectories}
                />

                <StatsCard
                  title="Repository Size"
                  value={`${(
                    result.structure.statistics.totalSize / 1024
                  ).toFixed(2)} KB`}
                />

                <StatsCard
                  title="Languages"
                  value={
                    Object.keys(
                      result.structure.statistics.extensions
                    ).length
                  }
                />
              </div>

              <div className="mt-8">
                {result.analysis && (
                  <TechnologyCard
                    analysis={result.analysis}
                  />
                )}
              </div>

              <div className="mt-8">
                <RepositorySummary
                  summary={result.summary}
                />
              </div>

              <section className="mt-8">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">Repository structure</p><h2 className="mt-1 text-2xl font-bold text-white">Explore the codebase</h2></div>
                  <span className="hidden text-sm text-slate-500 sm:block">Select any file to inspect it live</span>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="surface h-[580px] overflow-auto rounded-2xl p-5"><div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-white">File map</h3><span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400">{result.structure.statistics.totalFiles} files</span></div><FileTree nodes={result.structure.tree} onSelect={openFile} /></div>
                  <div className="lg:col-span-2"><div className="mb-4 flex items-center justify-between gap-3"><h3 className="truncate font-mono text-sm font-semibold text-slate-200">{selectedFile || "Select a file from the map"}</h3><button onClick={explainSelectedFile} disabled={!selectedFile || loadingAI} className="shrink-0 rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-40">{loadingAI ? "Thinking..." : "✨ Explain file"}</button></div><div className="h-[580px] overflow-hidden rounded-2xl border border-white/10 bg-[#111522]"><FileViewer content={fileContent || "// Choose a file from the repository map to inspect its source code."} language={extension || "typescript"} /></div></div>
                </div>
                {explanation && <div className="mt-6"><MarkdownViewer markdown={explanation} /></div>}
              </section>
            </>
          )}

          {activeTab === "docs" && (
            <div className="mt-10">
              {documentation ? (
                <DocumentationViewer
                  readme={documentation.readme}
                  setup={documentation.setup}
                  architecture={documentation.architecture}
                  api={documentation.api}
                />
              ) : (
                <div className="surface rounded-2xl p-12 text-center">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">Documentation studio</p>
                  <h2 className="mt-3 text-3xl font-bold text-white">Turn the codebase into clear docs.</h2>
                  <p className="mx-auto mt-3 max-w-lg text-slate-400">Generate a README, setup instructions, architecture notes, and API documentation based on this repository.</p>
                  <button
                    onClick={async () => {
                      if (!result) return;
                      setLoadingDocs(true);
                      try {
                        const docs = await generateDocumentation(repoUrl);
                        setDocumentation(docs.data);
                      } finally {
                        setLoadingDocs(false);
                      }
                    }}
                    disabled={loadingDocs}
                    className="mt-7 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loadingDocs ? "Generating documentation..." : "Generate documentation →"}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "chat" && (
            <div className="surface mt-10 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">AI repository assistant</p><h2 className="mb-5 mt-2 text-2xl font-bold text-white">
                Ask This Repository
              </h2>

              <div className="flex gap-4">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Where is authentication implemented?"
                  className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-violet-400"
                />

                <button
                  onClick={async () => {
                    if (!result || !question) return;

                    setLoadingAnswer(true);

                    const response =
                      await askRepository(
                        result.repository.url,
                        question
                      );

                    setAnswer(response.data);

                    setLoadingAnswer(false);
                  }}
                  className="rounded-xl bg-violet-500 px-5 py-3 font-bold text-white"
                >
                  {loadingAnswer ? "Thinking..." : "Ask"}
                </button>
              </div>

              {answer && (
                <div className="mt-6 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-5 text-slate-300">
                  {answer}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      </div></main>
  );
}
