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
  "explorer" |
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
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        STICKY-FINGERS
      </h1>

      <RepositoryForm
        onAnalyze={analyze}
      />

      {result && (
        <div className="mt-10">
          <RepositoryCard
            repository={result.repository}
          />

          <div className="mt-6 flex gap-2">
            {[
              "overview",
              "explorer",
              "docs",
              "chat",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(
                    tab as
                      | "overview"
                      | "explorer"
                      | "docs"
                      | "chat"
                  )
                }
                className={`rounded-lg px-5 py-3 capitalize ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "border bg-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <>
              <button
                onClick={async () => {
                  if (!result) return;

                  setLoadingDocs(true);

                  const docs = await generateDocumentation(
                    repoUrl
                  );

                  setDocumentation(docs.data);

                  setLoadingDocs(false);
                }}
                className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
              >
                {loadingDocs
                  ? "Generating..."
                  : "Generate Documentation"}
              </button>

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
            </>
          )}

          {activeTab === "explorer" && (
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div className="rounded-xl border p-6 overflow-auto h-[700px]">
                <h2 className="mb-4 text-xl font-bold">
                  Repository Explorer
                </h2>

                <FileTree
                  nodes={result.structure.tree}
                  onSelect={openFile}
                />
              </div>

              <div className="col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {selectedFile || "Select a file"}
                  </h2>

                  <button
                    onClick={explainSelectedFile}
                    disabled={loadingAI}
                    className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
                  >
                    {loadingAI
                      ? "Thinking..."
                      : "✨ Explain File"}
                  </button>
                </div>

                <div className="col-span-2 h-[700px] overflow-hidden rounded-xl border">
                  <FileViewer
                    content={fileContent}
                    language={extension}
                  />
                </div>

                {explanation && (
                  <div className="mt-8">
                    <MarkdownViewer
                      markdown={explanation}
                    />
                  </div>
                )}
              </div>
            </div>
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
                <div className="rounded-xl border p-8 text-center text-gray-500">
                  Click "Generate Documentation" to view docs
                </div>
              )}
            </div>
          )}

          {activeTab === "chat" && (
            <div className="mt-10 rounded-xl border p-6">
              <h2 className="text-2xl font-bold mb-4">
                Ask This Repository
              </h2>

              <div className="flex gap-4">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Where is authentication implemented?"
                  className="flex-1 rounded-lg border px-4 py-3"
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
                  className="rounded-lg bg-black px-5 py-3 text-white"
                >
                  {loadingAnswer ? "Thinking..." : "Ask"}
                </button>
              </div>

              {answer && (
                <div className="mt-6 rounded-lg border p-4 whitespace-pre-wrap">
                  {answer}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}