import { useLocation, useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import { IoChevronBackOutline } from "react-icons/io5"
import Button from "../components/Button"
import { Loading, Modal, PATH } from "../components"
import { useContext, useState } from "react"
import { Context } from "../context/Context"
import toast from "react-hot-toast"

const Header = () => {
  const { setToken } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [logOutModal, setLogOutModal] = useState<boolean>(false)
  const pageName = location.pathname.split("/")[1] || "home"

  function handleLogOut() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLogOutModal(false)
      setToken("")
      navigate(PATH.home)
      toast.success("You are logged out")
    }, 2000)
  }

  return (
    <>
      <header className="sticky top-0 z-40 h-20 bg-black border-transparent flex items-center justify-between px-10 pt-2 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#8b1e1e] z-30" />
        <div className="flex items-center gap-6 relative z-10">
          <Button
            onclick={() => navigate(-1)}
            type="button"
            extraClass="!flex !items-center !gap-2 !px-2.5 !py-2.5 !mt-0 !w-auto !text-sm hover:!text-[#c7c0b1] !font-medium !bg-black hover:!bg-[#8b1e1e]"
          >
            <IoChevronBackOutline size={16} />
          </Button>

          <div className="relative pt-1">
            <span className="sector-font absolute -top-2 -left-2 text-7xl font-bold uppercase text-[#161616]/35 tracking-widest select-none pointer-events-none">
              {pageName}
            </span>

            <p className="text-xs text-neutral-400 uppercase tracking-[0.15em] relative z-10">
              Sector 25
            </p>

            <h2 className="sector-font text-[20px] uppercase font-64 text-[#c7c0b1] tracking-[0.25em] relative z-10">
              {pageName}
            </h2>
          </div>
        </div>

        <Button
          onclick={() => setLogOutModal(true)}
          type="button"
          extraClass="!flex !items-center !gap-2 !px-4 !py-2 !mt-0 !w-auto !text-sm !font-medium hover:!bg-black relative z-10"
        >
          <FiLogOut size={16} />
          Logout
        </Button>
      </header>

      <Modal
        title={"Do you really want to LOGOUT ?"}
        open={logOutModal}
        onClose={() => setLogOutModal(false)}
      >
        <div className="flex gap-4 justify-center">
          <Button
            onclick={() => setLogOutModal(false)}
            type="button"
            extraClass="flex-1 mt-0 flex items-center justify-center gap-2 bg-[#161616] hover:!bg-[#8b1e1e] hover:!text-[#c7c0b1]"
          >
            Cancel
          </Button>

          <Button
            onclick={handleLogOut}
            type="button"
            extraClass="flex-1 mt-0 flex items-center justify-center gap-3 hover:!bg-[#161616]"
          >
            {loading ? <Loading /> : <><FiLogOut size={18} /> Logout</>}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default Header
