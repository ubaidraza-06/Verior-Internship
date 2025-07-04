import { HomeIcon, BookOpenIcon, Code2Icon, ActivityIcon } from 'lucide-react'

const nav = [
  { name: 'Overview', icon: HomeIcon,  },
  { name: 'Repositories', icon: BookOpenIcon, active: true },
  { name: 'Projects', icon: Code2Icon },
  { name: 'Activity', icon: ActivityIcon },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-gray-200 dark:border-githubBorder h-screen sticky top-0 bg-gray-50 dark:bg-githubDarkLight">
      <div className="p-6">
        <img src="/github.svg" alt="GitHub logo" className="w-8 mb-6" />
        <nav className="space-y-1">
          {nav.map(item => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href="#"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-githubText hover:bg-gray-200/60 dark:hover:bg-githubBorder'
                }`}
              >
                <Icon className="h-5 w-5 mr-2 shrink-0" />
                {item.name}
              </a>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}