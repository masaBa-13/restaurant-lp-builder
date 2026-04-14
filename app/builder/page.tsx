'use client'

import { useState, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { Block, BlockType, BlockContent, LPConfig, FontKey, createDefaultBlock } from '@/app/lib/builder-types'
import LeftPanel from '@/components/builder/LeftPanel'
import RightPanel from '@/components/builder/RightPanel'

const DEFAULT_CONFIG: LPConfig = {
  font: 'noto-serif-jp',
  primaryColor: '#C0392B',
  blocks: [],
}

export default function BuilderPage() {
  const [config, setConfig] = useState<LPConfig>(DEFAULT_CONFIG)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: Block = { id: nanoid(), content: createDefaultBlock(type) }
    setConfig(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }))
    setSelectedId(newBlock.id)
  }, [])

  const updateBlock = useCallback((id: string, patch: Partial<BlockContent>) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(b =>
        b.id === id ? { ...b, content: { ...b.content, ...patch } as Block['content'] } : b
      ),
    }))
  }, [])

  const removeBlock = useCallback((id: string) => {
    setConfig(prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== id) }))
    setSelectedId(prev => (prev === id ? null : prev))
  }, [])

  const moveBlock = useCallback((id: string, direction: 'up' | 'down') => {
    setConfig(prev => {
      const arr = [...prev.blocks]
      const idx = arr.findIndex(b => b.id === id)
      const target = direction === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= arr.length) return prev
      ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
      return { ...prev, blocks: arr }
    })
  }, [])

  const selectedBlock = config.blocks.find(b => b.id === selectedId) ?? null

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <LeftPanel
        config={config}
        selectedBlock={selectedBlock}
        onAddBlock={addBlock}
        onUpdateBlock={updateBlock}
        onFontChange={(font: FontKey) => setConfig(prev => ({ ...prev, font }))}
        onColorChange={(color: string) => setConfig(prev => ({ ...prev, primaryColor: color }))}
        onDeselect={() => setSelectedId(null)}
      />
      <RightPanel
        config={config}
        selectedId={selectedId}
        onSelectBlock={setSelectedId}
        onRemoveBlock={removeBlock}
        onMoveBlock={moveBlock}
      />
    </div>
  )
}
