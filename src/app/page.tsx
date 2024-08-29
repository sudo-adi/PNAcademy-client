"use client"
import PnaLoader from "@/components/common/custom-loading-animation"
import { isLoggedIn } from "@/lib/services/auth-service"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Home = () => {
  const Router = useRouter()
  useEffect(() => {
    if (isLoggedIn()) {
      Router.push("/dashboard")
    } else {
      Router.push("/login")
    }
  })
  return (
    <div className="flex items-center justify-center h-screen">
      <PnaLoader />
    </div>
  )
}



export default Home