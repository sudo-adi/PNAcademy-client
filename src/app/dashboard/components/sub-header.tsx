"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes"

const SubHeader = () => {
  const { theme } = useTheme();
  const [logo, setLogo] = useState<string>("");

  useEffect(() => {
    if (theme === "dark") {
      setLogo("/logo-dark.png");
    } else {
      setLogo("/logo.png");
    }
  }, [theme]);

  return (
    <>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img src={logo} className="h-5" />
          <span className="">PNAcademy</span>
        </Link>
      </div>
    </>
  )
}

export default SubHeader