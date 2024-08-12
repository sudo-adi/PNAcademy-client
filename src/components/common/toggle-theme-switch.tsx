"use client"

import React, { useState, useEffect } from 'react'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from "next-themes"



// ToggleThemeSwitch component
const ToggleThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  const [checked, setChecked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setChecked(theme == "dark")

    }
  }, [theme, mounted])

  const themeIcon =
    theme === "light" ?
      <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />

  // toggleTheme function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    setChecked(!checked)
  }

  if (!mounted) return null

  return (
    <div className="flex gap-2 flex-row items-center justify-center">
      <Switch id="airplane-mode"
        onCheckedChange={toggleTheme}
        checked={checked}
      />
      <Label htmlFor="airplane-mode">
        {themeIcon}
      </Label>
    </div>
  )
}

export default ToggleThemeSwitch
