import { CircleCheck } from 'lucide-react'
import React from 'react'

interface SubmittedSectionProps {
  index: number
}

const SubmittedSection: React.FC<SubmittedSectionProps> = ({ index }) => {
  return (
    <>
      <div className="flex flex-col border-2 rounded-lg">
        <div className="flex border-2 border-b-primary bg-muted w-full h-auto  rounded-t-sm p-4 text-sm justify-between">
          <div className="flex flex-row items-center gap-2">
            <CircleCheck className='h-4 w-4 text-green-400' />
            Section {index}
          </div>
          <div className="flex text-green-400">
            Submitted
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmittedSection