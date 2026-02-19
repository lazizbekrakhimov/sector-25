import { useState, useEffect } from "react"
import { useGlitch } from "../../hooks/useGlitch"

const Home = () => {
  const STATS = [
    { label: "Products", value: 128 },
    { label: "Users", value: 54 },
    { label: "Categories", value: 12 },
  ]

  const [scan, setScan] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const [noise, setNoise] = useState(false)
  const [time, setTime] = useState(new Date())

  const label = useGlitch("Overview", glitch)

  useEffect(() => {
    const iv = setInterval(() => setScan(p => (p + 1) % 100), 14)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>

    const fire = () => {
      setGlitch(true)
      setNoise(true)

      setTimeout(() => {
        setGlitch(false)
        setNoise(false)
      }, 420)

      t = setTimeout(fire, 6000 + Math.random() * 4000)
    }

    t = setTimeout(fire, 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="h-full max-h-[95%] w-full bg-[#161616] flex items-center justify-center overflow-hidden font-['Share_Tech_Mono']">
      <div className="w-full max-w-4xl px-6">

        <div className="relative rounded-2xl p-6 pb-8 bg-[#c7c0b1] border-2 border-[#a8a298] shadow-[0_1.5rem_4rem_rgba(0,0,0,0.7)]">

          <div className="relative overflow-hidden rounded-lg aspect-video bg-[#0a0806] border-[0.375rem] border-[#160e06] shadow-[inset_0_0_5rem_rgba(0,0,0,0.9)]">

            <div className="absolute inset-0 z-10 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_0.125rem,rgba(0,0,0,0.18)_0.125rem,rgba(0,0,0,0.18)_0.25rem)]" />

            <div className="absolute left-0 right-0 z-10 pointer-events-none h-0.5 bg-linear-to-r from-transparent via-[#c7c0b1]/10 to-transparent" style={{ top: `${scan}%` }} />

            {noise && (
              <div className="absolute inset-0 z-20 opacity-20 mix-blend-screen bg-size-[8rem]" />
            )}

            <div className="absolute inset-0 z-10 flex p-8 gap-8">

              <div className="flex flex-col justify-between w-[42%]">
                <div>
                  <p className="text-[0.65rem] tracking-[0.3rem] mb-4 text-[#c7c0b1]/50">
                    ◈ ON AIR ◈
                  </p>

                  <h1
                    className="font-['Bebas_Neue'] text-4xl uppercase tracking-[0.3rem] leading-none text-[#c7c0b1]"
                    style={{
                      textShadow: glitch
                        ? "0.2rem 0 rgba(192,57,43,0.8), -0.2rem 0 rgba(60,200,255,0.5)"
                        : "0 0 2rem rgba(199,192,177,0.2)",
                      opacity: glitch ? 0.75 : 1,
                    }}
                  >
                    {label}
                  </h1>

                  <p className="text-[0.6rem] tracking-[0.25rem] mt-3 text-[#c7c0b1]/45">
                    MAIN DASHBOARD
                  </p>
                </div>

                <div>
                  <p className="text-[0.6rem] tracking-[0.2rem] text-[#c7c0b1]/35 mb-1">
                    SYS TIME
                  </p>

                  <p className="font-['Bebas_Neue'] text-4xl tracking-[0.3rem] text-[#c7c0b1] leading-none">
                    {time.toLocaleTimeString("en-US", { hour12: false })}
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-px my-4 bg-linear-to-b from-transparent via-[#c7c0b1]/15 to-transparent" />

              <div className="flex flex-col justify-between flex-1">

                <div className="grid grid-cols-3 gap-6">
                  {STATS.map(s => (
                    <div key={s.label}>
                      <p className="text-[0.6rem] tracking-[0.15rem] text-[#c7c0b1]/45 mb-1">
                        {s.label.toUpperCase()}
                      </p>
                      <p className="font-['Bebas_Neue'] text-4xl tracking-[0.2rem] text-[#c7c0b1]">
                        {s.value}
                      </p>
                      <div className="w-6 h-0.5 mt-2 bg-[#c0392b]" />
                    </div>
                  ))}
                </div>

                <p className="text-[0.55rem] tracking-[0.2rem] pt-3 border-t border-[#c7c0b1]/10 text-[#c7c0b1]/30">
                  ▓▓▓▓▓▓▓░░ SIGNAL 78% · CH-25
                </p>

              </div>
            </div>

          </div>

          <p className="text-center text-[0.8rem] uppercase tracking-[0.5rem] mt-4 text-[rgba(80,72,60,0.7)]">
            RETROTV
          </p>

        </div>

      </div>
    </div>
  )
}

export default Home
