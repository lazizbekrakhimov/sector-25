import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NotFound = () => {
  const navigate = useNavigate()
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#161616] flex items-center justify-center font-mono">
      <div className="w-10.5 h-107.5 bg-black flex items-center justify-center shrink-0">
        <span
          className="text-[#c7c0b1] font-bold text-[9px] tracking-[0.15em] uppercase opacity-70"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          ERROR // SECTOR 25
        </span>
      </div>

      <div className="bg-[#c7c0b1] w-95 min-h-107.5 relative overflow-hidden px-9 pt-10 pb-8">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-black text-[#1a1a1a]/6 select-none pointer-events-none leading-none tracking-tighter">
          404
        </span>

        <div className="relative z-10">
          <p className="text-[11px] tracking-[0.12em] text-[#1a1a1a] opacity-50 mb-2 uppercase">
            SYSTEM STATUS
          </p>
          <div className="h-px bg-[#1a1a1a] opacity-25 mb-5" />

          <h1
            className="text-[96px] font-black text-[#b03a2e] m-0 leading-none tracking-tighter transition-all duration-75"
            style={
              glitch
                ? { textShadow: '3px 0 #1a1a1a, -3px 0 #b03a2e', transform: 'skewX(-4deg)' }
                : {}
            }
          >
            404
          </h1>

          <h2 className="text-[28px] font-black text-[#1a1a1a] mt-2 mb-5 leading-[1.1] tracking-wide uppercase">
            IDENTITY<br />NOT FOUND
          </h2>

          <div className="h-px bg-[#1a1a1a] opacity-25 mb-5" />

          <p className="text-[10px] tracking-widest text-[#1a1a1a] opacity-55 leading-[1.7] mb-6 uppercase">
            THE SECTOR YOU ARE LOOKING FOR DOES NOT EXIST OR HAS BEEN TERMINATED.
          </p>

          <div className="flex items-center border border-[#1a1a1a]/20 py-3 mb-7">
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] tracking-[0.12em] text-[#1a1a1a] opacity-45 uppercase">CODE</span>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#1a1a1a] uppercase">404</span>
            </div>
            <div className="w-px h-7.5 bg-[#1a1a1a]/20" />
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] tracking-[0.12em] text-[#1a1a1a] opacity-45 uppercase">STATUS</span>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#1a1a1a] uppercase">CRITICAL</span>
            </div>
            <div className="w-px h-7.5 bg-[#1a1a1a]/20" />
            <div className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] tracking-[0.12em] text-[#1a1a1a] opacity-45 uppercase">ACCESS</span>
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#b03a2e] uppercase">DENIED</span>
            </div>
          </div>

          <div className="flex justify-center items-center mt-5 ">
            <span
              onClick={() => navigate(-1)}
              className="hover:text-[#8b1e1e] text-[18px] text-[#1a1a1a] cursor-pointer hover:underline ml-2"
            >
              NAVIGATE BACK TO SAFETY
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound