"use client";
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import useTestInstructionsStore from '@/lib/stores/test-instructions/test-instructions-strore';


const TestInstructions = () => {
  const { tab, title, description, rules, setRulesForThetest, setActiveTab } = useTestInstructionsStore();

  return (
    <main className='flex flex-col items-center justify-center w-full h-screen'>
      <Tabs value={tab.toString()} onValueChange={(value) => setActiveTab(parseInt(value))}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="0">Test Description</TabsTrigger>
          <TabsTrigger value="1">Rules For the Test</TabsTrigger>
        </TabsList>
        <TabsContent value="0" className='w-[1200px]'>
          <Card className='h-[40rem]'>
            <CardHeader>
              <CardTitle>{title ? title : "Title"}</CardTitle>
            </CardHeader>
            <CardContent className='border-t-2 pt-10'>
              <CardDescription>
                {description ? description : "Description"}
              </CardDescription>
            </CardContent>
          </Card>
          <div className="flex flex-row items-end justify-end my-2">
            <Button onClick={() => setActiveTab(1)}>Next</Button>
          </div>
        </TabsContent>
        <TabsContent value="1" className='w-[1200px]'>
          <Card className='h-[40rem]'>
            <CardHeader>
              <CardTitle>{title ? title : "Title"}</CardTitle>
            </CardHeader>
            <CardContent className='border-t-2 pt-10'>
              {rules.map((rule, index) => (
                <CardDescription key={index}>
                  <div>* {rule}</div>
                </CardDescription>
              ))}
            </CardContent>
          </Card>
          <div className="flex flex-row items-end justify-end my-2 gap-2">
            <Button variant="outline" onClick={() => setActiveTab(0)}>Previous</Button>
            <Button>Start test</Button>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default TestInstructions
