"use client"
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react'

import Link from "next/link"

import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";

const Navbar = () => {
    const [mounted, setMounted] = useState<boolean>(false)
    const { theme, setTheme } = useTheme();

    //useEffect runs on client
    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) {
        return null
    }

    return (
        <div className="items-center header flex justify-between py-8">
            <div className="logo">
                Test api
            </div>
            <ul className="navbar flex">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                {theme === "dark" ? (
                    <FiMoon size={25} cursor="pointer" onClick={() => setTheme("light")} />
                    ) : (
                    <BsSun size={25} cursor="pointer" onClick={() => setTheme("dark")} />
                )}
                </li>
            </ul>
        </div>
    )
    
}


export default Navbar