import { NavLink } from "react-router-dom"
import { PATH } from "../components"

const Sitebar = () => {
  const links = [
    { name: "Home", path: PATH.home },
    { name: "Products", path: PATH.products },
    { name: "Category", path: PATH.category },
    { name: "Users", path: PATH.users },
  ]

  return (
    <aside className="sitebar-bg relative w-[22%] min-h-screen border-transparent flex flex-col overflow-hidden bg-black bg-[repeating-linear-gradient(to right,transparent_0px,transparent_23px,#2a2a2a_24px)]">

      <div className="absolute left-5 top-20 bottom-4 flex flex-col gap-4 z-20 py-6">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="w-7 h-7 bg-[#161616] border-2 border-neutral-600 rounded-full shadow-inner shrink-0" />
        ))}
      </div>

      <div className=" bg-black h-20 pt-2 flex flex-col items-center justify-center border-b border-neutral-800 relative z-10">
        <div className="scan-line-y"></div>
        <div className="scan-line-x"></div>

        <p className="sitebar-header-bg text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-mono">
          CONTROL UNIT
        </p>

        <h1 className="text-lg tracking-[0.35em] font-bold text-[#c7c0b1] flex items-center">
          ADMIN<span className="text-[#a32323]"> 01</span>
          <span className="ml-1 w-2 h-4 bg-[#a32323] animate-pulse"></span>
        </h1>
      </div>

      <nav className="flex-1 -right-5 px-14 py-12 space-y-8 text-lg tracking-[0.15em] uppercase relative z-10">
        {links.map(link => (
          <NavLink key={link.name} to={link.path} className={({ isActive }) => `relative block transition-all duration-300 ${isActive ? "text-[#c7c0b1]" : "text-neutral-500 hover:text-[#c7c0b1]"}`}>
            {({ isActive }) => (
              <>
                {link.name} <div className={`absolute -bottom-2 left-0 h-0.5 bg-[#a32323] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sitebar
