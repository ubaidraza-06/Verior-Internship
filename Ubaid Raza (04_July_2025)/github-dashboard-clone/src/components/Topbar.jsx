import { BellIcon, PlusIcon, SearchIcon } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 border-b border-gray-200 dark:border-githubBorder bg-white/80 dark:bg-githubDarkLight/60 backdrop-blur">
      <div className="flex items-center gap-2 px-4 w-full">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search or jump to…"
            className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-githubBorder/40 border border-transparent focus:border-blue-500 focus:ring-0 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>

        {/* Actions */}
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-githubBorder">
          <PlusIcon className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-githubBorder">
          <BellIcon className="h-5 w-5" />
        </button>
        <img
          className="h-8 w-8 rounded-full"
          src="https://avatars.githubusercontent.com/u/583231?v=4"
          alt="Profile"
        />
      </div>
    </header>
  )
}