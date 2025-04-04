import { Loader2, Plus } from 'lucide-react'
import React from 'react'


interface AddSectionButtonProps {
  onClick: () => void
  loading: boolean
  disabled: boolean
}

const AddSectionButton: React.FC<AddSectionButtonProps> = ({ onClick, loading, disabled }) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={loading || disabled}
        className={`border w-6 h-6 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center ${loading ? "bg-muted" : ''}`}>
        {loading ? <Loader2 className="h-3 w-3 dark:text-white text-black animate-spin" /> : <Plus className={`h-4 w-4 ${disabled ? "text-secondary" : ""}`} />}
      </button>
    </>
  )
}

export default AddSectionButton