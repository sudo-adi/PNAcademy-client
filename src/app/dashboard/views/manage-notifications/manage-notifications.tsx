"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Search } from 'lucide-react'
import useTabStore from '@/lib/stores/manage-notification-store/tab-store'
import AllTabContent from '../notifications/components/tab-content/all-tab-content'

const ManageNotifications = () => {
  const { activeTabIndex, setActiveTabIndex } = useTabStore()
  return (
    <>
      <Tabs defaultValue={activeTabIndex.toString()} className="w-full ">
        <div className="flex justify-between items-center flex-row w-full">
          <TabsList className="grid grid-cols-1">
            <TabsTrigger value="0" onClick={() => setActiveTabIndex(0)}>All Notification</TabsTrigger>
            {/* <TabsTrigger value="1" onClick={() => setActiveTabIndex(1)}>
              <div className="flex flex-row gap-2 items-center justify-center">
                Scheduled <Lock className='h-4 w-4' />
              </div>
            </TabsTrigger> */}
          </TabsList>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Search Notification with id or name..." />
            <Button type="submit" className='flex items-center justify-center  gap-1'>
              <Search className='h-4 w-4' />
              Search
            </Button>
          </div>
        </div>
        <TabsContent value="0">
          <AllTabContent />
        </TabsContent>
      </Tabs >
    </>
  )
}

export default ManageNotifications



