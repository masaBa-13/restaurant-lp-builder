'use client'

import { LPConfig } from '@/app/lib/builder-types'
import BlockWrapper from '@/components/builder/BlockWrapper'
import BlockRenderer from '@/components/builder/BlockRenderer'

interface Props {
  config: LPConfig
  selectedId: string | null
  onSelectBlock: (id: string) => void
  onRemoveBlock: (id: string) => void
  onMoveBlock: (id: string, direction: 'up' | 'down') => void
}

export default function RightPanel({ config, selectedId, onSelectBlock, onRemoveBlock, onMoveBlock }: Props) {
  return (
    <main className="flex-1 h-full overflow-y-auto bg-gray-200">
      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <p className="text-xs text-gray-400">クリックでブロックを選択・編集</p>
      </div>

      {/* LP Canvas */}
      <div className="max-w-4xl mx-auto my-6 bg-white shadow-xl min-h-[80vh]">
        {config.blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-lg font-medium mb-1">左パネルからブロックを追加してください</p>
            <p className="text-sm">ヒーロー、テキスト、写真など10種類から選べます</p>
          </div>
        ) : (
          config.blocks.map((block, idx) => (
            <BlockWrapper
              key={block.id}
              id={block.id}
              isSelected={block.id === selectedId}
              isFirst={idx === 0}
              isLast={idx === config.blocks.length - 1}
              onSelect={() => onSelectBlock(block.id)}
              onRemove={() => onRemoveBlock(block.id)}
              onMove={dir => onMoveBlock(block.id, dir)}
            >
              <BlockRenderer block={block} font={config.font} primaryColor={config.primaryColor} />
            </BlockWrapper>
          ))
        )}
      </div>
    </main>
  )
}
