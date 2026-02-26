import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button, SearchInput, Loading, PATH, LedgerLayout } from "../../../components"
import { debounce, instance } from "../../../hooks"
import type { CategoryType } from "../../../@types"
import { useNavigate } from "react-router-dom"

const Category = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const debouncedSearch = debounce(search, 500)
  const [loading, setLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setLoading(true)
    instance()
      .get("/categories")
      .then(res => {
        const filtered = debouncedSearch
          ? res.data.filter((c: CategoryType) =>
            c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          : res.data
        setCategories(filtered)
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
        <Button onClick={() => navigate(PATH.categoryCreate)} type="button" extraClass="!flex !items-center !gap-2 !px-4.5 !py-1.5 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10" >
          <Plus className="w-4" /> Create
        </Button>
      </div>

      <LedgerLayout
        title="CATEGORIES"
        badge="TOTAL RECORDS"
        badgeValue={String(categories.length).padStart(3, "0")}
        visible={visible}
        footer={{ left: "PAGE 01 — CATEGORY MODULE" }}
      >
        <div className="relative z-10 p-8 grid grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 flex text-3xl items-center justify-center py-32">
              <Loading />
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-4 flex flex-col items-center justify-center py-23.75">
              <span className="text-[80px] font-black text-[#1a1a1a]/10 leading-none tracking-wider select-none sector-font">
                EMPTY
              </span>
              <p className="text-[10px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase mt-3">
                NO CATEGORIES FOUND
              </p>
            </div>
          ) : (
            categories.map((item, i) => (
              <div
                key={item.id}
                onClick={() => navigate(`${PATH.category}/${item.id}`)}
                style={{
                  opacity: 0,
                  transform: "translateY(24px)",
                  animation: "fadeUp 0.55s ease forwards",
                  animationDelay: `${i * 60}ms`,
                }}
                className="cursor-pointer group"
              >
                <div className="relative w-full pr-1.5 pb-1.5">
                  <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  <div className="relative z-10 border-2 border-[#1a1a1a] overflow-hidden bg-[#c7c0b1] transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                    <div className="relative w-full h-44 overflow-hidden border-b-2 border-[#1a1a1a]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 right-2.5 bg-[#1a1a1a] text-[#c7c0b1] text-[10px] font-mono tracking-[0.2em] px-2 py-0.5">
                        #{String(item.id).padStart(4, "0")}
                      </div>
                    </div>

                    <div className="px-4 py-3">
                      <p className="font-black text-[15px] text-[#1a1a1a] uppercase tracking-[0.06em] mono-font truncate pb-2">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between my-1.5">
                        <span className="text-[10px] tracking-[0.18em] uppercase text-[#1a1a1a]/40 border border-[#1a1a1a]/15 bg-[#1a1a1a]/5 px-1.5 py-0.5 truncate max-w-[80%]">
                          {item.slug}
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

export default Category