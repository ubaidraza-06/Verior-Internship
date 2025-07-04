export default function ActivityItem({ item }) {
  return (
    <div className="flex gap-3 py-4 px-4">
      <img className="h-6 w-6 rounded-full mt-1" src={item.avatar} alt="" />
      <div className="flex-1 text-sm">
        <p>
          <a href="#" className="font-semibold hover:underline">
            {item.user}
          </a>{' '}
          {item.action}{' '}
          <a href="#" className="font-semibold hover:underline">
            {item.target}
          </a>
        </p>
        <p className="text-xs text-gray-500 mt-1">{item.time} ago</p>
      </div>
    </div>
  )
}
