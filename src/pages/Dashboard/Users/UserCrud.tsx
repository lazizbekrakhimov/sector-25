import { useState, useEffect, type SubmitEvent } from "react"
import { Plus } from "lucide-react"
import { Button, fadeUp, Input, Label, LedgerLayout, Loading, ShadowBox } from "../../../components"
import { useNavigate, useParams } from "react-router-dom"
import { instance } from "../../../hooks"
import { CrudFn } from "../../../services"
import { ROLES } from "../../../const"

const UserCrud = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState(false)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [avatar, setAvatar] = useState<string>("")
  const [role, setRole] = useState<string>("customer")
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null)
  const [checkingEmail, setCheckingEmail] = useState<boolean>(false)

  async function checkEmail(val: string) {
    if (!val || !val.includes("@")) return
    setCheckingEmail(true)
    try {
      const res = await instance().post("/users/is-available", { email: val })
      setEmailAvailable(res.data.isAvailable)
    } catch {
      setEmailAvailable(null)
    } finally {
      setCheckingEmail(false)
    }
  }

  function handleSubmit(evt: SubmitEvent<HTMLFormElement>) {
    setLoading(true)
    evt.preventDefault()
    const data: Record<string, string> = { name: name.trim(), email: email.trim() }
    if (!id) data.password = password
    if (avatar.trim()) data.avatar = avatar.trim()
    if (!id) data.role = role

    CrudFn(id, id ? `/users/${id}` : "/users", data, setLoading, navigate, `User ${id ? "updated" : "created"} successfully!`)
  }

  useEffect(() => {
    if (id) {
      instance()
        .get(`/users/${id}`)
        .then((res) => {
          setName(res.data.name)
          setEmail(res.data.email)
          setAvatar(res.data.avatar)
          setAvatarPreview(res.data.avatar)
          setRole(res.data.role)
        })
    }
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [])

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="px-11 py-8">
      <div className="flex items-center justify-end mb-8 gap-5" style={fadeUp(0, visible)}>
        <Button type="submit" extraClass="!flex !items-center !gap-2 !px-4.5 !py-2 !mt-0 !w-auto !text-sm !font-medium hover:!bg-[#161616] relative z-10" >
          {loading ? <Loading /> : <><Plus className="w-4 h-4" /> Save</>}
        </Button>
      </div>

      <LedgerLayout
        title={id ? "UPDATE USER" : "ADD NEW USER"}
        badge="STATUS"
        badgeValue="DRAFT"
        visible={visible}
        footer={{ left: "NEW RECORD — USERS MODULE" }}
      >
        <div className="relative z-10 px-18 py-8 grid grid-cols-3 gap-8">

          <div className="col-span-1 flex flex-col gap-5">
            <div style={fadeUp(240, visible)} className="relative w-full pr-1.5 pb-1.5 group">
              <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] overflow-hidden transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <div className="px-4 pt-4 pb-2 border-b-2 border-[#1a1a1a]">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a]/40 mono-font">
                    AVATAR PREVIEW
                  </p>
                </div>
                <div className="relative w-full h-52 bg-[#1a1a1a]/5">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="preview" className="w-full h-full object-cover" onError={() => setAvatarPreview("")} />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                      <span className="text-[36px] font-black text-[#1a1a1a]/10 mono-font select-none">
                        {name ? name[0].toUpperCase() : "U"}
                      </span>
                      <p className="text-[9px] tracking-[0.25em] text-[#1a1a1a]/25 uppercase">
                        NO AVATAR
                      </p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3">
                  <p className="text-[10px] font-black mono-font uppercase text-[#1a1a1a]/50 tracking-[0.04em] truncate">
                    {name || "—"}
                  </p>
                  <p className="text-[9px] font-mono text-[#1a1a1a]/30 mt-0.5 truncate">
                    {email || "—"}
                  </p>
                </div>
              </div>
            </div>

            <div style={fadeUp(360, visible)} className="relative w-full pr-1.5 pb-1.5 group">
              <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-[#1a1a1a] z-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <div className="relative z-10 border-2 border-[#1a1a1a] bg-[#c7c0b1] p-4 transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a]/40 mono-font mb-3">
                  ROLE
                </p>
                <div className="flex gap-2">
                  {ROLES.map((r) => (
                    <button key={r} type="button" onClick={() => setRole(r)} className="flex-1 cursor-pointer py-2 text-[10px] font-bold tracking-[0.2em] uppercase mono-font border-2 transition-all duration-150"
                      style={
                        role === r
                          ? { background: "#1a1a1a", color: "#c7c0b1", borderColor: "#1a1a1a" }
                          : { background: "transparent", color: "#1a1a1a", borderColor: "#1a1a1a/30" }
                      }
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-5">
            <ShadowBox style={fadeUp(240, visible)}>
              <Label extraClass="mono-font tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Full Name"} />
              <Input
                value={name}
                setValue={setName}
                extraClass="mono-font text-[15px] font-normal mt-2"
                placeholder="e.g. John Doe"
                type="text"
                name="name"
              />
            </ShadowBox>

            <ShadowBox style={fadeUp(320, visible)}>
              <Label extraClass="mono-font tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Email Address"} />
              <div className="relative">
                <Input
                  value={email}
                  setValue={(val: string) => {
                    setEmail(val)
                    setEmailAvailable(null)
                  }}
                  extraClass="mono-font text-[15px] font-normal mt-2"
                  placeholder="e.g. john@mail.com"
                  type="email"
                  name="email"
                />
                {!id && (
                  <div className="flex items-center gap-2 mt-2">
                    <button type="button" onClick={() => checkEmail(email)} className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 border border-[#1a1a1a]/30 hover:border-[#1a1a1a] transition-all mono-font text-[#1a1a1a]/50 hover:text-[#1a1a1a]" >
                      {checkingEmail ? "CHECKING..." : "CHECK AVAILABILITY"}
                    </button>
                    {emailAvailable === true && (
                      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#1a6e1e] mono-font">
                        ✓ AVAILABLE
                      </span>
                    )}
                    {emailAvailable === false && (
                      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#8b1e1e] mono-font">
                        ✗ TAKEN
                      </span>
                    )}
                  </div>
                )}
              </div>
            </ShadowBox>

            {!id && (
              <ShadowBox style={fadeUp(400, visible)}>
                <Label extraClass="mono-font tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Password"} />
                <Input value={password} setValue={setPassword} extraClass="mono-font text-[15px] font-normal mt-2" placeholder="••••••••" type="password" name="password" />
              </ShadowBox>
            )}

            <ShadowBox style={fadeUp(id ? 400 : 480, visible)}>
              <Label extraClass="mono-font tracking-[0.3em] uppercase font-bold pb-1 mt-7" content={"Avatar URL"} />
              <Input
                value={avatar}
                setValue={(val: string) => {
                  setAvatar(val)
                  setAvatarPreview(val)
                }}
                extraClass="mono-font text-[15px] font-normal mt-2"
                placeholder="https://example.com/avatar.jpg"
                type="text"
                name="avatar"
              />
            </ShadowBox>
          </div>
        </div>
      </LedgerLayout>
    </form>
  )
}

export default UserCrud