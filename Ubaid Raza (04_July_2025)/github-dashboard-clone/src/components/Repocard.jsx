export default function RepoCard({ repo }) {
  return (
    <div className="p-4 border rounded-md bg-white dark:bg-githubDarkLight border-gray-200 dark:border-githubBorder flex flex-col justify-between">
      <div className="space-y-2">
        <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          {repo.name}
        </a>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {repo.description}
        </p>
      </div>
      <div className="flex items-center text-xs gap-4 mt-4">
        <span className="flex items-center gap-1">
          <span className={`h-3 w-3 rounded-full ${repo.languageColor}`}></span>
          {repo.language}
        </span>
        <span>★ {repo.stars.toLocaleString()}</span>
        <span>Updated {repo.updated}</span>
      </div>
    </div>
  )
}