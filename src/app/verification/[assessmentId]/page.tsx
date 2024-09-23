"use client"

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Verification = () => {
  const [pageIndex, setPageIndex] = useState("0");
  const router = useRouter();
  const params = useParams();
  const assessmentId = params.assessmentId as string;

  const handleTabChange = (value: string) => {
    setPageIndex(value);
  };

  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <Tabs value={pageIndex} onValueChange={handleTabChange} className="lg:w-[calc(100vw-20rem)] w-[calc(100vw-10rem)] min-w-[20rem]">
        <TabsList className="grid w-[20rem] grid-cols-2">
          <TabsTrigger value="0">Rules for the Test</TabsTrigger>
          <TabsTrigger value="1">Test Description</TabsTrigger>
        </TabsList>
        <TabsContent value="0">
          <Card>
            <CardHeader>
              <CardTitle>Rules for this test</CardTitle>
              <CardDescription>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum tenetur nostrum impedit deleniti natus libero dicta magni cupiditate omnis laboriosam.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex dark:bg-black p-10 rounded-lg border-2 border-dashed">
                <div className="flex flex-col gap-2">
                  <p>hello world</p>
                  <p>hello world</p>
                  <p>hello world</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="1">
          <Card>
            <CardHeader>
              <CardTitle>Description for this Assessment</CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque laborum, ducimus iure officiis fuga repellat ipsa suscipit repellendus est quas!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex dark:bg-black p-10 rounded-lg border-2 border-dashed">
                <div className="flex flex-col gap-2">
                  <p>hello world</p>
                  <p>hello world</p>
                  <p>hello world</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <div className="flex flex-row items-center justify-end gap-2 my-2">
          <Button
            variant={'outline'}
            className={pageIndex === "0" ? 'hidden' : "block"}
            onClick={() => handleTabChange("0")}
          >
            Previous
          </Button>
          <Button
            onClick={() => handleTabChange("1")}
            className={pageIndex === "1" ? 'hidden' : "block"}
          >
            Next
          </Button>
          <Button
            className={pageIndex === "1" ? 'block' : "hidden"}
            onClick={() => router.push(`/assessment/${assessmentId}/overview`)}
          >
            Start Assessment
          </Button>
        </div>
      </Tabs>
    </main>
  )
}

export default Verification