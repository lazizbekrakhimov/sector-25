import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { instance, useGlitch } from "../../hooks"
import { Loading } from "../../components"

const Home = () => {
  const [result, setResult] = useState<number[]>([0, 0, 0]);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  const products = () => instance().get("/products");
  const category = () => instance().get("/categories");
  const users = () => instance().get("/users");

  useEffect(() => {
    Promise.all([products(), category(), users()])
      .then(res => {
        setResult([res[0].data.length, res[1].data.length, res[2].data.length])
      })
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const STATS = [
    { label: "Products", value: result[0], path: "/products" },
    { label: "Categories", value: result[1], path: "/category" },
    { label: "Users", value: result[2], path: "/users" },
  ];

  const [scan, setScan] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const [noise, setNoise] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const label = useGlitch("Overview", glitch)

  useEffect(() => {
    const iv = setInterval(() => setScan(p => (p + 1) % 100), 14)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const fire = () => {
      setGlitch(true); setNoise(true)
      setTimeout(() => { setGlitch(false); setNoise(false) }, 420)
      t = setTimeout(fire, 6000 + Math.random() * 4000)
    }
    t = setTimeout(fire, 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="h-full max-h-[85vh] w-full bg-[#161616] flex items-center justify-center overflow-hidden">

      <div className="w-full max-w-4xl px-6" style={{ transform: mounted ? "translateY(0)" : "translateY(24px)", opacity: mounted ? 1 : 0, transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease" }}>

        <div className="bg-[#c7c0b1] border-2 border-[#a8a298] shadow-[6px_6px_0_#8a8478,12px_12px_0_rgba(0,0,0,0.4)]">

          <div className="flex items-end justify-end px-6 py-3 border-b-2 border-[#a8a298]">
            <div className="flex items-center gap-1.5">
              {[...Array(6)].map((_, i) => (<div key={i} className={`w-0.5 h-3 ${i === 2 ? "bg-[#c0392b]" : "bg-[rgba(60,48,28,0.3)]"}`} />))}
              <span className="text-[8px] tracking-widest text-[rgba(60,48,28,0.45)] ml-1">CH-25</span>
            </div>
          </div>

          <div className="p-5 bg-[#b5ae9e]">
            <div className="border-4 border-[#1a1410] shadow-[inset_0_0_0_2px_#2e2820,inset_0_0_40px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-video bg-[#161616] overflow-hidden">

                <div className="absolute inset-0 z-10 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.18)_2px,rgba(0,0,0,0.18)_4px)]" />
                <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_50%,rgba(0,0,0,0.7)_100%)]" />
                <div className="absolute left-0 right-0 h-px z-20 pointer-events-none bg-[rgba(199,192,177,0.07)]" style={{ top: `${scan}%` }} />

                {noise && <div className="absolute inset-0 z-30 opacity-10 mix-blend-screen bg-[#c7c0b1]" />}

                <div className="absolute inset-0 z-20 flex items-stretch">

                  <div className="flex flex-col justify-between w-2/5 p-8 border-r border-[rgba(199,192,177,0.08)]">
                    <div>
                      <div className="inline-flex items-center gap-1.5 border border-[rgba(192,57,43,0.4)] bg-[rgba(192,57,43,0.08)] px-2 py-0.5 mb-4">
                        <div className="w-1.5 h-1.5 bg-[#c0392b] shadow-[0_0_5px_#c0392b] animate-pulse" />
                        <span className="text-[8px] tracking-[4px] text-[#c0392b]">ON AIR</span>
                      </div>

                      <h1
                        className="sector-font text-6xl leading-[120%] tracking-[0.20em] text-[#c7c0b1]"
                        style={{
                          textShadow: glitch
                            ? "3px 0 rgba(192,57,43,0.9), -3px 0 rgba(60,200,255,0.6)"
                            : "0 0 30px rgba(199,192,177,0.2)",
                          opacity: glitch ? 0.65 : 1,
                        }}
                      >
                        {label}
                      </h1>

                      <div className="w-8 h-0.5 bg-[#c0392b] mt-3 mb-2" />
                      <p className="text-[8px] mt-5 tracking-[4px] text-[rgba(199,192,177,0.35)]"> MAIN DASHBOARD </p>
                    </div>
                    <p className="text-[7px] tracking-[3px] text-[rgba(199,192,177,0.2)]">▓▓▓▓▓▓░░ 78%</p>
                  </div>

                  <div className="flex-1 flex flex-col justify-center px-8 py-8 gap-0">

                    <div className="grid grid-cols-2 border-b border-[rgba(199,192,177,0.1)] pb-3 mb-0">
                      <p className="text-[9px] tracking-[2px] pl-4 text-[rgba(199,192,177,0.3)]">MODULE</p>
                      <p className="text-[9px] tracking-[2px] pl-6.5 text-[rgba(199,192,177,0.3)]">COUNT</p>
                    </div>

                    {STATS.map((s) => {
                      const isHov = hovered === s.label
                      return (
                        <div
                          key={s.label}
                          className="grid grid-cols-2 gap-10 items-center border-b border-[rgba(199,192,177,0.05)] cursor-pointer mono-font"
                          style={{
                            padding: "20px 0",
                            background: isHov ? "rgba(192,57,43,0.06)" : "transparent",
                            transition: "background 0.2s ease",
                          }}
                          onMouseEnter={() => setHovered(s.label)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() => navigate(s.path)}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="bg-[#c0392b]"
                              style={{
                                opacity: isHov ? 1 : 0.35,
                                transition: "all 0.2s ease",
                                boxShadow: isHov ? "0 0 10px #c0392b" : "none",
                              }}
                            />
                            <div>
                              <p
                                className="text-2xl tracking-[3px] leading-none"
                                style={{
                                  color: isHov ? "#c7c0b1" : "rgba(199,192,177,0.5)",
                                  transition: "color 0.2s ease",
                                  textShadow: isHov ? "0 0 20px rgba(199,192,177,0.3)" : "none",
                                }}
                              >
                                {s.label.toUpperCase()}
                              </p>
                              <p
                                className="text-[14px] duration-300 tracking-[2px] mt-1"
                                style={{
                                  color: isHov ? "#d4a017" : "transparent",
                                  transition: "color 0.2s ease",
                                }}
                              >
                                VIEW ALL →
                              </p>
                            </div>
                          </div>
                          <p
                            className="tracking-wider leading-none"
                            style={{
                              fontSize: "64px",
                              color: isHov ? "#c7c0b1" : "rgba(199,192,177,0.65)",
                              textShadow: isHov ? "0 0 36px rgba(199,192,177,0.3)" : "none",
                              transform: isHov ? "translateX(6px)" : "translateX(0)",
                              transition: "all 0.25s ease",
                              opacity: glitch ? 0.6 : 1,
                            }}
                          >
                            {s.value
                              ? s.value
                              : <span className="text-xs tracking-normal"><Loading /></span>
                            }
                          </p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-3 border-t-2 border-[#a8a298]">
            <div className="flex flex-col gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-px bg-[rgba(60,48,28,0.25)]" />
              ))}
            </div>
            <p className="sector-font text-sm tracking-[12px] text-[rgba(60,48,28,0.45)] uppercase">
              Sector TV
            </p>
            <div className="flex flex-col gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-px bg-[rgba(60,48,28,0.25)]" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-150">
          {[0, 1].map(i => (
            <div key={i} className="w-10 h-2 bg-[#8a8478] border-x-2 border-b-2 border-[#6e6860]" />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home