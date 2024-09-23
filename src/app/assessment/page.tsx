"use client";
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const Assessment = () => {

  const [isAssessmentIdValid, setIsAssessmentIdValid] = useState(false)
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen w-full'>
      <p className='font-xl font-bold'>
        Attempt Assessment
      </p>
      <Card className='lg:w-[calc(100vw-20rem)] w-[calc(100vw-10rem)] min-w-[20rem]'>
        <div className='flex flex-col gap-2 p-4'>
          <p>
            Attemt Assessment using Assessment Id or Link
          </p>
          <Input placeholder='Paste Assessment Id or Assessment Link...' />

          <Button className='text-white rounded-md p-2' disabled={!isAssessmentIdValid}>
            Start Assessment
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Assessment