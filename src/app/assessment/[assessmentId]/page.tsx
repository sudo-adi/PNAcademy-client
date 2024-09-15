import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import React from 'react'

const Assessment = () => {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex items-center justify-center w-full h-[40px] border-b p-2">
          Assessment Name
        </div>
        <div className="flex flex-row h-full w-full p-6">
          <div className="w-full flex flex-col gap-5 md:w-2/3">
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <Badge className='text-[10px]'>
                    Question 1
                  </Badge>
                  <Badge variant={'outline'}>
                    5
                  </Badge>
                </div>
                <Card className='w-full flex bg-muted flex-col max-h-[40rem] p-5 border gap-2'>
                  <h1 className='text-[10px]'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, eos expedita quam recusandae ea animi aspernatur nemo doloribus voluptates repellat est dignissimos optio nesciunt, rerum dolor enim eveniet cumque ratione minima natus. Ea voluptatibus ex eaque laboriosam, quae delectus mollitia! Debitis ab consectetur voluptatibus ipsa voluptates quo cum vitae dolor?                </h1>
                </Card>
              </div>
            </div>
            <div className="flex flex-col min-h-[calc(100vh-18rem)]">
              <div className="flex-grow overflow-auto">
                <div className="flex min-h-[5rem] max-h-[calc(100vh-18rem)] overflow-auto flex-col gap-4 border rounded-2xl p-2 scrollbar-none">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div className="flex flex-col gap-2" key={i}>
                      <div className="flex">
                        <Badge className='text-[10px]'>
                          Option 1
                        </Badge>
                      </div>
                      <Card className='w-full flex flex-col max-h-[40rem] p-5 border-dashed gap-2'>
                        <h1 className='text-[10px]'>
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit repellat dicta amet id ab enim debitis illum aspernatur culpa! Totam corrupti modi ducimus ad voluptatem, perspiciatis tempore, sit pariatur dolore aliquam vero illum ex incidunt obcaecati iure. Voluptatibus consectetur quibusdam eos in numquam inventore consequuntur eum mollitia odit illum nulla amet animi alias nihil harum minima, maiores enim quos aliquid nobis omnis soluta ducimus aperiam? Praesentium, quia molestiae aut veniam dolor numquam recusandae nesciunt voluptates nulla eveniet magni laudantium sit explicabo officiis ut exercitationem pariatur suscipit quos error similique? Enim omnis laborum asperiores molestias ipsum animi. Nostrum qui sint illum!
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, eos expedita quam recusandae ea animi aspernatur nemo doloribus voluptates repellat est dignissimos optio nesciunt, rerum dolor enim eveniet cumque ratione minima natus. Ea voluptatibus ex eaque laboriosam, quae delectus mollitia! Debitis ab consectetur voluptatibus ipsa voluptates quo cum vitae dolor?
                        </h1>
                      </Card>
                    </div>))}
                </div>
              </div>
              <div className="mt-auto py-4">
                <div className="flex text-sm gap-2">
                  Powered By <Badge variant='outline'>PNAcademy</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-6 items-center justify-start md:w-1/3 pl-6">
            <Card className='w-full h-[10rem] text-7xl flex items-center justify-center shadow-sm border-dashed'>
              20:20
            </Card>
            <Card className='w-full h-[10rem] flex flex-col items-start justify-start shadow-sm px-3 py-2'>
              Sections
            </Card>
            <Card className='w-full h-[10rem] flex flex-col items-start justify-start shadow-sm px-3 py-2'>
              Questions
            </Card>
            <Card className='w-full h-[10rem] flex flex-col items-start justify-start shadow-sm px-3 py-2'>
              Stats
            </Card>
          </div>
        </div>
      </div >
    </>
  )
}

export default Assessment