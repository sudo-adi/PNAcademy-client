import { Button } from '@/components/ui/button'
import React from 'react'
import { useUserInfo } from './hooks/useUsersInfo'

const Settings = () => {


  const { userInfo, loading, fetchUserInfo } = useUserInfo()

  const getUserInfo = async () => {
    await fetchUserInfo()
  }



  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
    >
      <Button onClick={getUserInfo}>
        Fetch Data
      </Button>
    </div>
  )
}

export default Settings