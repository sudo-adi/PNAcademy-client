"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Archive, ArrowUpLeftSquare, Search } from 'lucide-react';
import React, { useState } from 'react'
import AllTabContent from './components/tab-content/all-tab-content';
import OnGoingTabContent from './components/tab-content/ongoing-tab-content';
import ScheduledTabContent from './components/tab-content/scheduled-tab-content';
import PreviousTabContent from './components/tab-content/previous-tab-content';

const Assessments = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <div className='flex flex-col gap-2'>
        <Card className='flex flex-row w-full p-2 justify-between items-center border-dashed gap-2'>
          <div className="flex flex-row gap-2">
            <div className='text-3xl'>
              Hey Aditya, Good Morning!
            </div>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Join with assessment Id..." />
            <Button type="submit" className='flex items-center justify-center  gap-1'>
              Join
            </Button>
          </div>
        </Card>
        <Tabs defaultValue={activeTabIndex.toString()} className="flex flex-col w-full items-center">
          <div className="flex items-center justify-between flex-row w-full ">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="0" onClick={() => setActiveTabIndex(0)}>All</TabsTrigger>
              <TabsTrigger value="1" onClick={() => setActiveTabIndex(1)}>OnGoing</TabsTrigger>
              <TabsTrigger value="2" onClick={() => setActiveTabIndex(2)}>Scheduled</TabsTrigger>
              <TabsTrigger value="3" onClick={() => setActiveTabIndex(3)}>Previous</TabsTrigger>
            </TabsList>
            <div className="flex flex-row gap-2">
              <Input type="email" placeholder="Join with assessment Id..." />
              <Button type="submit" className='flex items-center justify-center  gap-1'>
                Search
              </Button>
            </div>
          </div>
          <div className="w-full">
            <TabsContent value="0">
              <AllTabContent />
            </TabsContent>
            <TabsContent value="1">
              <OnGoingTabContent />
            </TabsContent>
            <TabsContent value="2" >
              <ScheduledTabContent />
            </TabsContent>
            <TabsContent value="3" >
              <PreviousTabContent />
            </TabsContent>
          </div>
        </Tabs >
      </div>
    </>

  )
}

export default Assessments