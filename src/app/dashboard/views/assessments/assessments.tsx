"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { use, useEffect, useState } from 'react'
import AllTabContent from './components/tab-content/all-tab-content';
import OnGoingTabContent from './components/tab-content/ongoing-tab-content';
import ScheduledTabContent from './components/tab-content/scheduled-tab-content';
import PreviousTabContent from './components/tab-content/previous-tab-content';
import { useAssignedAssessments } from './hooks/useAssignedAssessments';
import { Assessment } from '@/lib/types/assessmentTypes';
import { Label } from '@/components/ui/label';

const Assessments = () => {

  // all hooks here
  const {
    fetchAssignedAssessments
  } = useAssignedAssessments();

  // all state here
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  // all functions here
  const getAssignedAssessments = async () => {
    try {
      const assessments = await fetchAssignedAssessments({
        page: 1,
        pageSize: 999,
        sortBy: 'id',
        order: 'ASC'
      });
      setAssessments(assessments);
    } catch (err) {
    }
  }

  // all useEffects here
  useEffect(() => {
    getAssignedAssessments();
  }, []);

  return (
    <>
      <div className='flex flex-col gap-2 overflow-y-hidden'>
        <Card className='flex flex-col lg:flex-row w-full  justify-between items-center border-dashed gap-4 p-4 lg:p-2 overflow-hidden'>
          <div className="flex flex-row gap-2">
            <div className='text-3xl'>
              Hii! Aditya Good Morning
            </div>
          </div>
          <div className="flex w-full h-full lg:w-auto items-center space-x-2">
            <Input type="email" placeholder="Join with assessment Id..." />
            <Button type="submit" className='flex items-center justify-center gap-1 active:shadow-2xl active:shadow-white'>
              Join
            </Button>
          </div>
        </Card>
        <Tabs defaultValue={activeTabIndex.toString()} className="flex flex-col items-center">
          <div className="flex items-center lg:justify-between flex-col-reverse lg:flex-row px-2 lg:px-0 lg:w-full w-full gap-2">
            <TabsList className="grid grid-cols-4 w-full lg:w-auto">
              <TabsTrigger value="0" onClick={() => setActiveTabIndex(0)}>All</TabsTrigger>
              <TabsTrigger value="1" onClick={() => setActiveTabIndex(1)}>OnGoing</TabsTrigger>
              <TabsTrigger value="2" onClick={() => setActiveTabIndex(2)}>Scheduled</TabsTrigger>
              <TabsTrigger value="3" onClick={() => setActiveTabIndex(3)}>Previous</TabsTrigger>
            </TabsList>
            <div className="flex flex-row w-full  lg:w-auto gap-2">
              <Input type="email"
                className='min-w-[18rem] w-full'
                placeholder="Search Assessment By Id or Name..." />
              <Button type="submit" className='flex items-center justify-center  gap-1'>
                Search
              </Button>
            </div>
          </div>
          <div className="w-full">
            <TabsContent value="0">
              <AllTabContent assessments={assessments} />
            </TabsContent>
            <TabsContent value="1">
              <OnGoingTabContent assessments={assessments} />
            </TabsContent>
            <TabsContent value="2" >
              <ScheduledTabContent assessments={assessments} />
            </TabsContent>
            <TabsContent value="3" >
              <PreviousTabContent assessments={assessments} />
            </TabsContent>
          </div>
        </Tabs >
      </div>
    </>

  )
}

export default Assessments