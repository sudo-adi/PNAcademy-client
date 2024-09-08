import React from 'react'

interface QuestionButonProps {
  index: number
  onClick: () => void
  isCurrentSection: boolean
  disabled: boolean
}

const QuestionButon: React.FC<QuestionButonProps> = ({ index, onClick, isCurrentSection, disabled }) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
      >
        <div
          className={`text-[8px] flex rounded-full h-6 w-6 p-2 border items-center justify-center ${disabled ? 'text-secondary bg-transparent  hover:bg-transparent' : isCurrentSection ? 'bg-secondary' : ''}`}>
          {index + 1}
        </div>
      </button>
    </>
  )
}

export default QuestionButon