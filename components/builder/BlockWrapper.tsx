'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react'

interface Props {
  id: string
  isSelected: boolean
  isFirst: boolean
  isLast: boolean
  onSelect: () => void
  onRemove: () => void
  onMove: (direction: 'up' | 'down') => void
  children: React.ReactNode
}

export default function BlockWrapper({ id: _id, isSelected, isFirst, isLast, onSelect, onRemove, onMove, children }: Props) {
  const [hovered, setHovered] = useState(false)
  const show = hovered || isSelected

  return (
    <div
      className={`relative cursor-pointer transition-all ${isSelected ? 'outline outline-2 outline-orange-400 outline-offset-0' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      {/* Toolbar */}
      {show && (
        <div
          className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-white border border-gray-200 rounded-lg shadow-lg px-1 py-1"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => onMove('up')}
            disabled={isFirst}
            className="p-1.5 text-gray-500 hover:text-gray-800 disabled:opacity-30 transition rounded hover:bg-gray-100"
            title="上へ"
          >
            <ChevronUp size={14} />
          </button>
          <button
            onClick={() => onMove('down')}
            disabled={isLast}
            className="p-1.5 text-gray-500 hover:text-gray-800 disabled:opacity-30 transition rounded hover:bg-gray-100"
            title="下へ"
          >
            <ChevronDown size={14} />
          </button>
          <div className="w-px h-4 bg-gray-200" />
          <button
            onClick={onRemove}
            className="p-1.5 text-red-400 hover:text-red-600 transition rounded hover:bg-red-50"
            title="削除"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Hover overlay border */}
      {show && !isSelected && (
        <div className="absolute inset-0 border-2 border-orange-300 pointer-events-none z-10" />
      )}

      {children}
    </div>
  )
}
