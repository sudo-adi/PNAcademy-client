import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useAttemptAssessmentsStore from '@/lib/stores/attempt-assessment/attempt-assessment.store'
import { AssignedAssessmentQuestion } from '@/lib/types/attemptionTypes'
import { CircleDot, Unlock } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface ActiveSectionProps {
  questions: AssignedAssessmentQuestion[]
  sectionNumber: number
  solveQuestion: (index: number) => void
}


const ActiveSection: React.FC<ActiveSectionProps> = ({ questions, sectionNumber, solveQuestion }) => {
  // Get currentSectionId from global store
  const { currentSectionId } = useAttemptAssessmentsStore()

  // Local state to track the actual section number
  const [activeSectionNumber, setActiveSectionNumber] = useState(sectionNumber)

  // Update local state when props or global state changes
  useEffect(() => {
    setActiveSectionNumber(currentSectionId || sectionNumber)
  }, [currentSectionId, sectionNumber])

  // Early return if no questions
  if (!questions || questions.length === 0) {
    console.log("Current section number:", activeSectionNumber)
    return (
      <div className="flex flex-col border-2 rounded-lg p-4">
        <p className="text-muted-foreground">No questions available for this section.</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col border-2 rounded-lg">
        <div className="flex border-2 border-b-primary bg-muted w-full h-auto rounded-t-sm p-4 text-sm justify-between">
          <div className="flex items-center gap-2">
            Section {activeSectionNumber}
            <p className='text-muted-foreground'>
              | {`${questions[0].marks}` || 'N/A'} Marks/Q
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              <Badge className='bg-transparent border-primary' variant={'outline'}>
                {questions[0].marks * questions.length || 'N/A'} Marks
              </Badge>
            </div>
            <Unlock className='h-4 w-4' />
          </div>
        </div>
        <div className="flex p-4 flex-col gap-4 items-center w-full">
          <div className="relative w-full">
            <div className="flex p-4 flex-col gap-4 items-center w-full relative">
              {questions.map((question, index) => (
                <SingleQuestionRow
                  key={question.id}
                  index={index}
                  solveQuestion={solveQuestion}
                  question={question}
                  attempted={question.selectedOptionId != null} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface SingleQuestionRowProps {
  index: number
  question: AssignedAssessmentQuestion
  attempted: boolean
  solveQuestion: (index: number) => void
}

const SingleQuestionRow: React.FC<SingleQuestionRowProps> = ({ index, solveQuestion, question, attempted }) => {
  return (
    <div className="flex gap-2 w-full">
      <div className="flex items-center justify-center">
        <Badge variant={'outline'} className='text-xs'>
          {index + 1}
        </Badge>
      </div>
      <div className="flex flex-row items-center justify-between border-b p-1 w-full text-sm gap-4">
        <p className='text-sm'>
          {question.description}
        </p>
        <div className="flex items-center">
          <CircleDot className={`h-4 w-4 ${attempted && "text-green-500"}`} />
          <Button variant={'link'} className='text-xs' onClick={() => solveQuestion(index)}>
            Solve Question →
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActiveSection