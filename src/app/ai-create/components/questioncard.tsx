import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { RotateCw } from 'lucide-react'
import React from 'react'

const QuestionCard = () => {
  return (
    <div>
      <div className="flex flex-col w-full gap-1">
        <div className="flex flex-row justify-between items-center">
          <Badge className='text-[10px] bg-primary' variant="outline">
            Question 2
          </Badge>
          <button>
            <Badge className='text-[10px] hover:bg-secondary' variant="outline">
              Regenerate
              <RotateCw className='h-3 w-3 ml-2' />
            </Badge>
          </button>
        </div>
        <Card className='flex flex-col h-full border-dotted p-4 text-[12px] gap-1'>
          <Card className='flex w-full p-2 bg-secondary rounded-sm text-[10px]'>
            Question: Lorem ipsum dolor sit amet consectetur adipisicing elit. At architecto voluptas natus! Suscipit nostrum esse unde vel aperiam, asperiores ullam?
          </Card>
          <div className='h-2'>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex">
                <Badge className='text-[10px] border-red-800' variant="outline">
                  option 1
                </Badge>
              </div>
              <Card className='flex w-full p-2 rounded-sm border-dashed border-red-800 text-[10px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At architecto voluptas natus! Suscipit nostrum esse unde vel aperiam, asperiores ullam?
              </Card>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex">
                <Badge className='text-[10px] border-green-700 bg-green-700'>
                  option 1
                </Badge>
              </div>
              <Card className='flex w-full p-2 rounded-sm border-dashed border-green-700 text-[10px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At architecto voluptas natus! Suscipit nostrum esse unde vel aperiam, asperiores ullam?
              </Card>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex">
                <Badge className='text-[10px] border-red-800' variant="outline">
                  option 1
                </Badge>
              </div>
              <Card className='flex w-full p-2 rounded-sm border-dashed border-red-800 text-[10px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At architecto voluptas natus! Suscipit nostrum esse unde vel aperiam, asperiores ullam?
              </Card>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex">
                <Badge className='text-[10px] border-red-800' variant="outline">
                  option 1
                </Badge>
              </div>
              <Card className='flex w-full p-2 rounded-sm border-dashed border-red-800 text-[10px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At architecto voluptas natus! Suscipit nostrum esse unde vel aperiam, asperiores ullam?
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default QuestionCard