import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, SearchInput, Loading, PATH, LedgerLayout } from "../../../components"
import { debounce, instance } from "../../../hooks"
import type { UserType } from "../../../@types"
import { useNavigate } from "react-router-dom"
import { ROLE_COLOR } from "../../../const"

const Users = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const debouncedSearch = debounce(search, 500)
  const [loading, setLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<UserType[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setLoading(true)
    instance()
      .get("/users")
      .then(res => {
        const filtered = debouncedSearch
          ? res.data.filter((u: UserType) =>
            u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          : res.data
        setUsers(filtered.slice(0, 30))
        const t = setTimeout(() => setVisible(true), 30)
        return () => clearTimeout(t)
      })
      .finally(() => setLoading(false))
  }, [debouncedSearch])

  return (
    <div className="px-11 py-8">
      <div className="flex items-center justify-between mb-8 gap-6">
        <div className="flex-1">
          <SearchInput value={search} setValue={setSearch} setLoading={setLoading} />
        </div>
        <Button onClick={() => navigate(PATH.usersCreate)} type="button" extraClass="!flex !items-center !gap-2 !px-4.5 !py-1.5 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10" >
          <Plus className="w-4" /> Create
        </Button>
      </div>

      <LedgerLayout
        title="USERS"
        badge="TOTAL RECORDS"
        badgeValue={String(users.length).padStart(3, "0")}
        visible={visible}
        footer={{ left: "PAGE 01 — USERS MODULE" }}
      >
        <div className="relative z-10 p-8 grid grid-cols-2 gap-5">
          {loading ? (
            <div className="col-span-2 text-4xl flex items-center justify-center py-32">
              <Loading />
            </div>
          ) : users.length === 0 ? (
            <div className="col-span-4 flex flex-col items-center justify-center py-23.75">
              <span className="text-[80px] font-black text-[#1a1a1a]/10 leading-none tracking-wider select-none sector-font">
                EMPTY
              </span>
              <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase mt-3">
                NO USERS FOUND
              </p>
            </div>
          ) : (
            users.map((user, i) => (
              <div key={user.id}
                onClick={() => navigate(`${PATH.users}/${user.id}`)}
                style={{
                  opacity: 0,
                  transform: "translateY(24px)",
                  animation: "fadeUp 0.55s ease forwards",
                  animationDelay: `${i * 50}ms`,
                }}
                className="cursor-pointer group"
              >
                <div className="relative w-full pr-1.5 pb-1.5">
                  <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 flex items-stretch">

                    <div className="relative w-24 shrink-0 border-r-2 border-[#1a1a1a] overflow-hidden">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/5 pointer-events-none" />
                    </div>

                    <div className="flex-1 px-4 py-4 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-black text-[15px] text-[#1a1a1a] uppercase tracking-[0.04em] mono-font leading-tight truncate">
                            {user.name}
                          </p>
                          <span className="shrink-0 text-[9px] font-bold tracking-[0.25em] uppercase px-2 py-0.5 border"
                            style={{
                              borderColor: ROLE_COLOR[user.role] ?? "#1a1a1a",
                              color: ROLE_COLOR[user.role] ?? "#1a1a1a",
                              backgroundColor: `${ROLE_COLOR[user.role] ?? "#1a1a1a"}12`,
                            }}
                          >
                            {user.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#1a1a1a]/45 font-mono mt-1 truncate">{user.email}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#1a1a1a]/10">
                        <span className="text-[10px] font-mono text-[#1a1a1a]/25 tracking-widest">
                          #{String(user.id).padStart(4, "0")}
                        </span>
                        <span className="text-[13px] font-mono text-[#8b1e1e]/50 tracking-widest uppercase">
                          VIEW →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </LedgerLayout>
    </div>
  )
}

export default Users