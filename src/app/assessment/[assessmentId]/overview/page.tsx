"use client";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CircleDot, Clock, LockKeyhole, MoveRight, Unlock } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React, { useMemo } from 'react'
import { Label, Pie, PieChart } from "recharts"

const chartData = [
  { stats: "attempted", questions: 275, fill: "var(--color-attempted)" },
  { stats: "un-visited", questions: 200, fill: "var(--color-notVisisted)" },
  { stats: "review for later", questions: 287, fill: "var(--color-review)" },
  { stats: "total un-attempted", questions: 173, fill: "var(--color-unAttemted)" },
]
const chartConfig = {
  questions: {
    label: "questions",
  },
  attempted: {
    label: "attempted",
    color: "hsl(var(--chart-2))",
  },
  notVisisted: {
    label: "Not Visisted",
    color: "hsl(var(--chart-1))",
  },
  review: {
    label: "Review For Later",
    color: "hsl(var(--chart-3))",
  },
  unAttemted: {
    label: "Total Un Attempted",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig


const AssessmentOverView = () => {

  const totalQustions = useMemo(() => {
    return "123"
  }, [])

  return (
    <main className='flex flex-col w-full'>
      <div className="flex h-[2rem] w-full items-center text-sm justify-between border border-b-1 px-10">
        <div className="flex">
          FullScreen: true
        </div>
        <div className="flex">
          Assessment Overview
        </div>
        <div className="flex">
          Duration: 30 minutes
        </div>
      </div>
      <div className="flex flex-row h-[calc(100vh-2rem)] w-full" >
        <div className="flex flex-col gap-4 w-full p-10 h-[calc(100vh-4rem)] overflow-hidden overflow-y-scroll scrollbar-none">
          {Array.from({ length: 1 }).map((_, index) => (
            <div className="flex flex-col border-2 rounded-lg">
              <div className="flex border-2 border-b-primary bg-muted w-full h-auto  rounded-t-sm p-4 text-sm justify-between">
                <div className="flex items-center gap-2">
                  Section {index + 1}
                  <p className='text-muted-foreground'>
                    | 5 marks/question
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <Badge className='bg-transparent border-primary' variant={'outline'}>
                      50
                    </Badge>
                  </div>
                  <Unlock className='h-4 w-4' />
                </div>
              </div>
              <div className="flex p-4 flex-col gap-4 items-center w-full">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div className="flex gap-2 w-full">
                    <div className="flex items-center justify-center">
                      <Badge variant={'outline'} className='text-xs'>
                        {index + 1}
                      </Badge>
                    </div>
                    <div className="flex flex-row items-center justify-between border-b p-1 w-full text-sm gap-4">
                      <p className='text-sm'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente iure, aliquid ratione
                      </p>
                      <div className="flex items-center">
                        <CircleDot className='h-4 w-4' />
                        <Button variant={'link'} className='text-xs'>
                          Solve Question →
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Button className='flex items-center gap-2'>
            Submit This Section
            <MoveRight />
          </Button>
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex flex-col border-2 rounded-lg">
              <div className="flex border-2 border-b-primary bg-muted w-full h-auto  rounded-t-sm p-4 text-sm justify-between">
                <div className="flex">
                  Section {index + 2}
                </div>
                <div className="flex">
                  <LockKeyhole className='h-4 w-4' />
                </div>
              </div>
              <div className="relative">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 backdrop-blur-sm flex-col font-bold gap-4 text-muted-foreground rounded-b-lg">
                  <LockKeyhole className='h-10 w-10' />
                  Section Locked
                </div>

                {/* Main Content */}
                <div className="flex p-4 flex-col gap-4 items-center w-full relative">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex gap-2 w-full">
                      <div className="flex items-center justify-center">
                        <div className="flex w-8 h-4 bg-secondary">
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-between border-b p-1 w-full text-sm gap-4">
                        <div className="flex h-4 max-w-[38rem] w-full bg-secondary">
                        </div>
                        <div className="flex h-4 max-w-[8rem] w-full bg-secondary">
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 border border-r-2 p-10 min-w-[19rem] w-[20rem]">
          <div className="flex bg-secondary/30 border-2  h-[6rem] w-full  rounded-full items-center text-4xl flex-col font-black justify-center">
            20:19
            <div className="flex flex-row items-center gap-1 text-xs text-foreground/50 font-light mt-1">
              <Clock className='h-3 w-3' /> Time Remaining
            </div>
          </div>
          <div className="flex">
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle className='text-lg text-center'>Assessment Stats</CardTitle>
                <CardDescription>Section 1 of 4</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="questions"
                      nameKey="stats"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {totalQustions.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Total Questions
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={'outline'} className='bg-[hsl(var(--chart-2))] text-black text-xs'>
                    </Badge>
                    <p className='text-muted-foreground text-xs'>
                      50%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={'outline'} className='bg-[hsl(var(--chart-1))] text-black text-xs'>
                    </Badge>
                    <p className='text-muted-foreground text-xs'>
                      20%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={'outline'} className='bg-[hsl(var(--chart-3))] text-black text-xs'>
                    </Badge>
                    <p className='text-muted-foreground text-xs'>
                      12%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={'outline'} className='bg-[hsl(var(--chart-4))] text-black text-xs'>
                    </Badge>
                    <p className='text-muted-foreground text-xs'>
                      24%
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main >
  )
}

export default AssessmentOverView