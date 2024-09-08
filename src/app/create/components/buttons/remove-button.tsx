import { Loader2, Trash2 } from 'lucide-react'
import React from 'react'

interface RemoveButtonProps {
  onClick: () => void
  loading: boolean
  disabled: boolean
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick, disabled, loading }) => {
  return (
    <button
      onClick={onClick}
      className="pr-1"
      disabled={disabled}
    >
      {
        loading ? <div className="animate-spin h-4 w-4 text-red-500"><Loader2 className="h-4 w-4 text-red-500" /></div> : <Trash2 className={`h-4 w-4 text-red-500 ${disabled ? "text-red-800" : 'text-red-500'}`} />
      }
    </button>
  )
}

export default RemoveButton