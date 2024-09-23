"use client"
import PnaLoader from "@/components/common/custom-loading-animation"
import { checkAuth } from "@/lib/services/auth-service"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Home = () => {

  const [loading, setLoading] = useState(true);

  const Router = useRouter()
  useEffect(() => {
    checkAuth(setLoading, Router)
  })
  return (
    <div className="flex items-center justify-center h-screen">
      <PnaLoader />
    </div>
  )
}
export default Home