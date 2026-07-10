import { Repository } from "../types/repository";

interface Props {
  repository: Repository;
}

export default function RepositoryCard({
  repository,
}: Props) {
  return (
    <div className="rounded-xl border p-6 shadow">
      <h2 className="text-2xl font-bold">
        {repository.name}
      </h2>

      <p className="text-gray-500">
        {repository.owner}
      </p>

      <p className="mt-4">
        {repository.description}
      </p>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div>
        <p className="text-sm text-gray-500">⭐ Stars</p>
        <p className="font-semibold">{repository.stars}</p>
      </div>
      
      <div>
        <p className="text-sm text-gray-500">🍴 Forks</p>
        <p className="font-semibold">{repository.forks}</p>
      </div>
      
      <div>
        <p className="text-sm text-gray-500">
          🧠 Language
        </p>
        <p className="font-semibold">
          {repository.primaryLanguage ?? "Unknown"}
        </p>
      </div>
      
      <div>
        <p className="text-sm text-gray-500">
          🌿 Branch
        </p>
        <p className="font-semibold">
          {repository.defaultBranch}
        </p>
      </div>
    </div>
      
    {repository.topics.length > 0 && (
      <div className="mt-6">
        <h3 className="font-semibold">Topics</h3>
    
        <div className="mt-2 flex flex-wrap gap-2">
          {repository.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    )}
      {repository.topics.length > 0 && (
      <div className="mt-6">
        <h3 className="font-semibold">Topics</h3>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {repository.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    )}
    </div>
  );
}
