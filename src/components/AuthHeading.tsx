import { useEffect, useState } from 'react'

const useGlitch = (interval = 3000, duration = 150) => {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), duration)
    }, interval)
    return () => clearInterval(id)
  }, [interval, duration])

  return glitch
}

interface AuthHeadingProps {
  lines: [string, string]
}

const AuthHeading = ({ lines }: AuthHeadingProps) => {
  const glitch = useGlitch()

  return (
    <div className="mb-10">
      <h1
        className="text-3xl font-extrabold uppercase leading-snug transition-all duration-75"
        style={
          glitch
            ? { textShadow: '3px 0 #1a1a1a, -3px 0 #b03a2e', transform: 'skewX(-4deg)' }
            : {}
        }
      >
        {lines[0]}
        <br />
        {lines[1]}
      </h1>
      <div className="mt-3 w-16 h-0.5 bg-black" />
    </div>
  )
}

export default AuthHeading