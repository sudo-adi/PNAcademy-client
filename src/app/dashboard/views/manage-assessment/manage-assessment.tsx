import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useTabStore from '@/lib/stores/manage-assessment-store/tab-store'
import { Archive, PlusSquare, Search, Sparkles } from 'lucide-react'
import React from 'react'
import AllTabContent from './components/tab-content/all-tab-content'
import OnGoingTabContent from './components/tab-content/ongoing-tab-content'
import ScheduledTabContent from './components/tab-content/scheduled-tab-content'
import PreviousTabContent from './components/tab-content/previous-tab-content'
import CreateAssessmentDialog from './components/dialog-box/create-assessment-dialog'
import DraftsTabContent from './components/tab-content/drafts-tab-content'

const ManageAssessments = () => {
  const { activeTabIndex, setActiveTabIndex } = useTabStore()
  return (
    <div className='flex flex-col gap-2'>
      <Card className='flex flex-row w-full p-2 justify-between items-center border-dashed gap-2'>
        <div className="flex flex-row gap-2">
          <CreateAssessmentDialog />
          <Button variant="link" className='hover:no-underline border-primary border'>
            <Sparkles className='h-4 w-4 mr-2' />
            Create With Ai
          </Button>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Search User with email, id or name..." />
          <Button type="submit" className='flex items-center justify-center  gap-1'>
            <Search className='h-4 w-4' />
            Search
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
          <TabsList className="grid grid-cols-1">
            <TabsTrigger value='4' onClick={() => setActiveTabIndex(4)}>
              <Archive className='h-4 w-4 mr-2' />
              Drafts
            </TabsTrigger>
          </TabsList>
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
          <TabsContent value="4" >
            <DraftsTabContent />
          </TabsContent>
        </div>
      </Tabs >
    </div>

  )
}

export default ManageAssessments