import { useEffect, useState } from "react"

const UseGlitch = (interval = 2000, duration = 150) => {
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

export default UseGlitch