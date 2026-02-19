import { useState, useEffect } from "react"

export function useGlitch(text: string, on: boolean) {
    const chars = "#$%@!?&*"
    const [out, setOut] = useState(text)

    useEffect(() => {
        if (!on) {
            setOut(text)
            return
        }

        let i = 0
        const iv = setInterval(() => {
            if (i > 10) {
                setOut(text)
                clearInterval(iv)
                return
            }

            setOut(
                text
                    .split("")
                    .map((c, j) =>
                        j < i ? c : chars[Math.floor(Math.random() * chars.length)]
                    )
                    .join("")
            )

            i++
        }, 45)

        return () => clearInterval(iv)
    }, [on, text])

    return out
}
