"use client"
import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"

const Providers = ({ children }: { children: React.ReactNode }) => {

    const [mounted, setMounted] = useState<boolean>(false)

    //useEffect runs on the client
    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) {
        return <>{children}</>
    }
    return (
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
    )

}

export default Providers