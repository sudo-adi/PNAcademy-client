import { Loader2, Plus } from 'lucide-react'
import React from 'react'


interface AddQuestionButtonProps {
  onClick: () => void
  loading: boolean
  disabled: boolean
}

const AddQuestionButton: React.FC<AddQuestionButtonProps> = ({ onClick, loading, disabled }) => {
  return (
    <>
      <button className="text-[8px]"
        onClick={onClick}
        disabled={loading || disabled}
      >
        <div className="flex rounded-full h-6 w-6 p-1 border items-center justify-center hover:bg-secondary">
          {loading ? <Loader2 className="h-3 w-3 dark:text-white text-black animate-spin" /> : <Plus className={`h-4 w-4 ${disabled ? "text-secondary" : ""}`} />}
        </div>
      </button>

    </>
  )
}

export default AddQuestionButton