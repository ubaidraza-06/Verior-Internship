import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import RepoCard from '../components/RepoCard'
import ActivityItem from '../components/ActivityItem'

const repos = [
  {
    name: 'tailwindcss',
    description: 'A utility‑first CSS framework...',
    language: 'JavaScript',
    languageColor: 'bg-yellow-400',
    stars: 67000,
    updated: '2 days ago',
  },
  {
    name: 'vite',
    description: 'Next generation frontend tooling...',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    stars: 60000,
    updated: '5 days ago',
  },
  {
    name: 'react',
    description: 'A declarative JavaScript library for building UIs.',
    language: 'JavaScript',
    languageColor: 'bg-blue-300',
    stars: 220000,
    updated: '1 day ago',
  },
  {
    name: 'Next',
    description: 'A React framework for building fast, modern web applications.',
    language: 'Typescript',
    languageColor: 'bg-orange-300',
    stars: 45000,
    updated: '3 days ago',
  }
]

const activity = [
  {
    user: 'octocat',
    action: 'pushed to',
    target: 'main at octocat/Hello‑World',
    time: '1h',
    avatar: 'https://avatars.githubusercontent.com/u/583231?v=4',
  },
  {
    user: 'gaearon',
    action: 'opened issue',
    target: 'facebook/react#123',
    time: '3h',
    avatar: 'https://avatars.githubusercontent.com/u/810438?v=4',
  },
  {
    user: 'yyx990803',
    action: 'created repository',
    target: 'vitejs/vite',
    time: '1d',
    avatar: 'https://avatars.githubusercontent.com/u/499550?v=4',
  },
]

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Repo grid */}
          <section className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold">Repositories</h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {repos.map(repo => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </div>
          </section>

          {/* Activity feed */}
          <aside className="w-full lg:w-80 space-y-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <div className="border rounded-md bg-white dark:bg-githubDarkLight border-gray-200 dark:border-githubBorder divide-y divide-gray-200 dark:divide-githubBorder">
              {activity.map((item, i) => (
                <ActivityItem key={i} item={item} />
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
