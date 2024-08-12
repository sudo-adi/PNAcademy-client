"use client"
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
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
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
    </>
  )
}

export default SubHeader