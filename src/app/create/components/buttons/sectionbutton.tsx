import React from 'react'


interface SectionButtonProps {
  index: number
  onClick: () => void
  isCurrentSection: boolean
  disabled: boolean
}
const SectionButton: React.FC<SectionButtonProps> = ({ index, onClick, isCurrentSection, disabled }) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        key={index}
        className={`border w-6 h-6 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center ${disabled ? 'text-secondary bg-transparent  hover:bg-transparent' : isCurrentSection ? 'bg-secondary' : ''}`}
      >
        {index + 1}
      </button >
    </>
  )
}

export default SectionButton