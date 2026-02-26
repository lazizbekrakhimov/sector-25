import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { UserType } from "../../../@types"
import { Pencil, Trash2, Mail, ShieldCheck, User } from "lucide-react"
import { Button, fadeUp, LedgerLayout, Loading, Modal } from "../../../components"
import { DeleteFn, getById } from "../../../services"
import { ROLE_COLOR } from "../../../const"

const UserMore = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [moreData, setMoreData] = useState<UserType | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [delModal, setDelModal] = useState<boolean>(false)

  useEffect(() => {
    setVisible(false)
    getById(`/users/${id}`, setMoreData, setVisible)
  }, [])

  function handleDelete() {
    setLoading(true)
    DeleteFn(`/users/${id}`, setLoading, setDelModal, "User deleted successfully!", navigate)
  }

  if (!moreData) return ""

  return (
    <div className="px-11 py-8">
      <div className="flex items-center justify-end mb-8 gap-5" style={fadeUp(0, visible)}>
        <Button onClick={() => setDelModal(true)} type="button" extraClass="!flex !bg-black !border-black !items-center !gap-2 !px-4.5 !py-2 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] hover:!border-[#8b1e1e] relative z-10">
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
        <Button onClick={() => navigate('update')} type="button" extraClass="!flex !items-center !gap-2 !px-4.5 !py-2 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10">
          <Pencil className="w-4 h-4" /> Edit
        </Button>
      </div>

      <LedgerLayout
        title="USER INFO"
        badge="RECORD ID"
        badgeValue={`#${String(moreData.id).padStart(4, "0")}`}
        visible={visible}
        footer={{ left: `USER #${String(moreData.id).padStart(4, "0")} — DETAIL MODULE` }}
      >
        <div className="relative z-10 px-18 py-8 grid grid-cols-3 gap-6">
          <div className="col-span-1 flex flex-col gap-5">

            <div style={fadeUp(240, visible)} className="relative w-full pr-1.5 pb-1.5 group">
              <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <div className="relative z-10 border-2 border-[#1a1a1a] overflow-hidden bg-[#c7c0b1] transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <div className="relative w-full h-64 overflow-hidden border-b-2 border-[#1a1a1a]">
                  <img src={moreData.avatar} alt={moreData.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.25em] uppercase px-2.5 py-1 border-2"
                    style={{
                      borderColor: ROLE_COLOR[moreData.role] ?? "#1a1a1a",
                      color: "#fff",
                      backgroundColor: ROLE_COLOR[moreData.role] ?? "#1a1a1a",
                    }}
                  >
                    {moreData.role}
                  </div>
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="font-black text-[16px] text-[#1a1a1a] uppercase tracking-[0.06em] mono-font">
                    {moreData.name}
                  </p>
                  <p className="text-[10px] text-[#1a1a1a]/35 font-mono mt-0.5">
                    #{String(moreData.id).padStart(4, "0")}
                  </p>
                </div>
              </div>
            </div>

            <div style={fadeUp(320, visible)} className="relative w-full pr-1.5 pb-1.5 group">
              <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-3 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <p className="text-[9px] tracking-[0.25em] text-[#1a1a1a]/35 uppercase font-bold mb-1">AVATAR URL</p>
                <p className="text-[10px] font-mono text-[#1a1a1a]/45 break-all leading-[1.6]">{moreData.avatar}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-5">

            <div style={fadeUp(240, visible)} className="relative w-full pr-1.5 pb-1.5 group">
              <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-5 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <div className="flex flex-row justify-between">
                  <div>
                    <p className="text-[9px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase font-bold flex items-center gap-1.5 mb-1.5">
                      <User size={9} /> FULL NAME
                    </p>
                    <p className="font-black text-[20px] text-[#1a1a1a] uppercase tracking-[0.04em] mono-font leading-tight">
                      {moreData.name}
                    </p>
                  </div>
                  <div className="pr-40">
                    <p className="text-[9px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase font-bold flex items-center gap-1.5 mb-1.5">
                      <ShieldCheck size={9} /> ROLE
                    </p>
                    <span
                      className="inline-block text-[12px] font-bold tracking-[0.2em] uppercase px-3 py-1 border-2"
                      style={{
                        borderColor: ROLE_COLOR[moreData.role] ?? "#1a1a1a",
                        color: ROLE_COLOR[moreData.role] ?? "#1a1a1a",
                        backgroundColor: `${ROLE_COLOR[moreData.role] ?? "#1a1a1a"}10`,
                      }}
                    >
                      {moreData.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={fadeUp(320, visible)} className="relative w-full pr-1.5 pb-1.5 group">
              <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-5 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <p className="text-[9px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase font-bold flex items-center gap-1.5 mb-2">
                  <Mail size={9} /> EMAIL ADDRESS
                </p>
                <p className="font-mono text-[15px] text-[#1a1a1a]/70 tracking-[0.02em]">{moreData.email}</p>
              </div>
            </div>

            <div style={fadeUp(400, visible)} className="relative w-full pr-1.5 pb-1.5 group">
              <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-5 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <p className="text-[9px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase font-bold mb-2">PASSWORD</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[20px] text-[#1a1a1a]/30 tracking-[0.3em] select-none">
                    {"•".repeat(Math.min(moreData.password?.length ?? 8, 12))}
                  </p>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#8b1e1e]/50 border border-[#8b1e1e]/20 px-2 py-0.5">
                    HIDDEN
                  </span>
                </div>
              </div>
            </div>

            <div style={fadeUp(480, visible)} className="relative w-full pr-1.5 pb-1.5 group">
              <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] px-5 py-4 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <p className="text-[9px] tracking-[0.3em] text-[#1a1a1a]/35 uppercase font-bold mb-3">META</p>
                <div className="grid grid-cols-3 gap-4">
                  {([
                    ["USER ID", `#${String(moreData.id).padStart(4, "0")}`],
                    ["ROLE", moreData.role.toUpperCase()],
                    ["STATUS", "ACTIVE"],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k} className="border border-[#1a1a1a]/10 px-3 py-2.5">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#1a1a1a]/30 font-bold">{k}</p>
                      <p className="font-black text-[13px] text-[#1a1a1a] mono-font mt-1 truncate">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LedgerLayout>

      <Modal
        open={delModal}
        onClose={() => setDelModal(false)}
        title={"Do you really want to delete this user?"}
      >
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setDelModal(false)}
            type="button"
            extraClass="flex-1 mt-0 flex items-center justify-center gap-2 bg-black border-black hover:!bg-[#161616] hover:!text-[#8b1e1e]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            type="button"
            extraClass="flex-1 mt-0 flex items-center justify-center gap-3 hover:!bg-[#161616]"
          >
            {loading ? <Loading /> : <><Trash2 size={18} /> Delete</>}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default UserMore