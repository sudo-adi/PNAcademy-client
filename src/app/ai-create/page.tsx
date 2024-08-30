import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const AiCreate = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full py-10">
        <Card className='flex flex-col items-center justify-center w-[600px] border border-dashed h-full'>
          <CardHeader>
            <CardTitle>
              Ai Create
            </CardTitle>
          </CardHeader>
          <div className="flex">
            <Textarea />
          </div>
        </Card>
      </div>
    </>
  )
}

export default AiCreate