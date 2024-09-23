"use client"
import React, { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const Assessment = () => {
  const [fontSize, setFontSize] = useState(16)
  const handleSliderChange = (value: number[]) => {
    setFontSize(value[0])
  }
  return (
    <>
      <main className='overflow-hidden hidden lg:block'>
        <div className="flex w-full h-[4rem] border-b justify-between">
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold text-muted-foreground">#Assessment 1 | 5 Marks/Q</span>
          </div>
          <div className="flex items-center justify-center p-6">
            <Badge variant={'outline'}>
              Section 1
            </Badge>
          </div>
          <div className="flex">
            <div className="flex items-center justify-center p-4 border-dashed-2 border rounded-md border-primary/40 my-2 mx-4">
              <span className="font-semibold">50</span>
            </div>
            <div className="flex items-center justify-center p-6 border-dashed-2 border-l">
              <span className="font-semibold">20:19</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row h-[calc(100vh-8rem)]">
          <div className="flex">
            <div className="flex flex-col w-[5rem] border-b">
              <div className="flex flex-col items-center justify-start p-6 gap-4  h-[calc(100vh-4rem)] overflow-y-scroll oveflow-hidden scrollbar-none">
                {Array.from({ length: 22 }).map((_, index) => (
                  <div className="flex min-h-[40px] min-w-[40px] border-2 items-center justify-center rounded-md">
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full w-full border"
          >
            <ResizablePanel defaultSize={50}>
              <div className="flex p-8 flex-col gap-4">
                <div className="flex">
                  <Badge>
                    Question 1
                  </Badge>
                </div>
                <div className="flex" style={{ fontSize: `${1 * fontSize}px` }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quam alias saepe autem nostrum minus debitis ipsam inventore, velit maxime?
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex flex-col w-full h-full overflow-hidden overflow-y-scroll p-8 gap-8">
                <div className="flex">
                  <Badge>
                    Options
                  </Badge>
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row rounded-xl hover:bg-secondary items-center border hover:scale-105 hover:duration-800 hover:transition-all transition-all duration-800">
                      <div className="flex w-1/7 p-8 h-full items-center justify-center">
                        <Checkbox />
                      </div>
                      <div className="flex h-full w-6/7 p-5 border-l bg-background scrollbar-thin rounded-r-sm" style={{ fontSize: `${1 * fontSize}px` }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo quidem voluptate minima voluptatem aperiam repellat sequi voluptatum autem id consequuntur.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="flex h-[4rem] flex-row items-center px-8 justify-between">
          <div className="flex gap-2">
            Powered By
            <Badge variant={'outline'}>
              PNAcademy
            </Badge>
          </div>
          <Slider
            defaultValue={[16]}
            max={32}
            min={12}
            step={1}
            onValueChange={handleSliderChange}
            className={cn("w-[10%] ml-12",)} />
          <div className="flex h-full items-center justify-center gap-2">
            <Button variant={'outline'}>
              Previous
            </Button>
            <Button>
              Next
            </Button>
          </div>
        </div>
      </main >
      {/* mobile view */}
      <main className='overflow-hidden lg:hidden'>
        <div className="flex w-full h-[4rem] border-b justify-between">
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold text-muted-foreground">#Assessment 1 | 5 Marks/Q</span>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center p-4 border-dashed-2 border rounded-md border-primary/40 my-2 mx-4">
              <span className="font-semibold">50</span>
            </div>
            <div className="flex items-center justify-center p-6 border-dashed-2 border-l">
              <span className="font-semibold">20:19</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          <div className="flex">
            <div className="flex flex-row w-full border border-b">
              <div className="flex flex-row w-full items-start justify-start p-6 gap-4 overflow-x-scroll oveflow-hidden scrollbar-thin">
                {Array.from({ length: 22 }).map((_, index) => (
                  <div className="flex min-h-[40px] min-w-[40px] border-2 items-center justify-center rounded-md">
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ResizablePanelGroup
            direction="vertical"
            className="h-full w-full border"
          >
            <ResizablePanel defaultSize={20}>
              <div className="flex p-8 flex-col gap-4">
                <div className="flex">
                  <Badge>
                    Question 1
                  </Badge>
                </div>
                <div className="flex text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quam alias saepe autem nostrum minus debitis ipsam inventore, velit maxime?
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={80}>
              <div className="flex flex-col w-full h-full overflow-hidden overflow-y-scroll p-8 gap-8">
                <div className="flex">
                  <Badge>
                    Options
                  </Badge>
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row rounded-xl hover:bg-secondary items-center border hover:scale-105 hover:duration-800 hover:transition-all transition-all duration-800">
                      <div className="flex w-1/7 p-8 h-full items-center justify-center">
                        <Checkbox />
                      </div>
                      <div className="flex h-full w-6/7 p-5 border-l bg-background scrollbar-thin rounded-r-sm text-sm">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo quidem voluptate minima voluptatem aperiam repellat sequi voluptatum autem id consequuntur.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="flex h-[4rem] flex-row items-center px-8 justify-between">
          <Badge variant={'outline'}>
            PNAcademy
          </Badge>
          <div className="flex items-center justify-center p-6">
            <Badge variant={'outline'}>
              Section 1
            </Badge>
          </div>
          <div className="flex h-full items-center justify-center gap-2">
            <Button variant={'outline'} className='text-xs'>
              Back
            </Button>
            <Button className='text-xs'>
              Next
            </Button>
          </div>
        </div>
      </main >
    </>
  )
}

export default Assessment