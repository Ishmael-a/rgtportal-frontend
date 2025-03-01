import { LayoutDashboard } from 'lucide-react'


const Sidebar = () => {
    const sideItems = [
        {
        title: "HR dashboard",
        Icon: LayoutDashboard
        },
        {
        title: "Feed",
        Icon: LayoutDashboard
        },
        {
        title: "Time Off",
        Icon: LayoutDashboard
        },
        {
        title: "Recruitment",
        Icon: LayoutDashboard
        }
    ]
  return (
    <aside className='min-w-[300px] bg-white rounded-xl'>
      <nav>
        <ul>
          {sideItems.map((item, index) => {
            const {title, Icon} = item
            return (
              <li key={index} className='flex items-center gap-x-4 p-3'>
                <Icon />
                <span>{title}</span>
              </li>
            )
          })}
        </ul>
      </nav>
   </aside>
  )
}

export default Sidebar