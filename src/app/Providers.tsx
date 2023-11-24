"use client"
import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import LoadingPage from "./components/Loading"

const Providers = ({ children }: { children: React.ReactNode }) => {

    const [mounted, setMounted] = useState<boolean>(false)

    //useEffect runs on the client
    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) {
        return (<ThemeProvider attribute="class">
                <LoadingPage />
        </ThemeProvider>
    )}
    return (
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
    )

}

export default Providers