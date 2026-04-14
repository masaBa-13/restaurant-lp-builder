'use client'

import { useRef, useState } from 'react'
import { Block, BlockContent, BlockType, BLOCK_META, FONTS, FontKey, LPConfig, MenuItem, AppealPoint, HeroContent, TextContent, ImageContent, ImageTextContent, MenuContent, AppealContent, MapContent, AccessContent, CTAContent, GalleryContent } from '@/app/lib/builder-types'
import { ChevronLeft, Sparkles, X } from 'lucide-react'
import Link from 'next/link'

interface Props {
  config: LPConfig
  selectedBlock: Block | null
  onAddBlock: (type: BlockType) => void
  onUpdateBlock: (id: string, patch: Partial<BlockContent>) => void
  onFontChange: (font: FontKey) => void
  onColorChange: (color: string) => void
  onDeselect: () => void
}

// ── Utility ──────────────────────────────────────────────────────

function readImageFile(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target!.result as string)
    reader.readAsDataURL(file)
  })
}

function extractMapUrl(input: string): string {
  const m = input.match(/src="([^"]+)"/)
  return m ? m[1] : input
}

// ── AI Assist ────────────────────────────────────────────────────

function AiButton({ prompt, onResult }: { prompt: string; onResult: (text: string) => void }) {
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (data.text) onResult(data.text)
    } finally {
      setLoading(false)
    }
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 disabled:opacity-50 transition mt-1"
    >
      <Sparkles size={12} />
      {loading ? 'AIが考え中...' : 'AIに提案してもらう'}
    </button>
  )
}

// ── Image upload button ───────────────────────────────────────────

function ImageUpload({ imageUrl, onUpload, label = '写真をアップロード' }: { imageUrl: string; onUpload: (url: string) => void; label?: string }) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={async e => {
          const file = e.target.files?.[0]
          if (file) onUpload(await readImageFile(file))
        }}
      />
      {imageUrl ? (
        <div className="relative">
          <img src={imageUrl} alt="" className="w-full h-32 object-cover rounded-lg" />
          <button
            type="button"
            onClick={() => onUpload('')}
            className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-orange-400 hover:text-orange-500 transition"
        >
          📷 {label}
        </button>
      )}
      {imageUrl && (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="mt-1 text-xs text-gray-500 hover:text-gray-700"
        >
          写真を変更
        </button>
      )}
    </div>
  )
}

// ── Field ────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition'
const textareaCls = `${inputCls} resize-none`

// ── Block Editors ─────────────────────────────────────────────────

function HeroEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as HeroContent
  return (
    <div>
      <Field label="背景画像">
        <ImageUpload imageUrl={c.imageUrl} onUpload={url => onUpdate({ imageUrl: url })} />
      </Field>
      <Field label="オーバーレイ濃度">
        <input type="range" min={0} max={80} value={c.overlayOpacity} onChange={e => onUpdate({ overlayOpacity: Number(e.target.value) })} className="w-full accent-orange-500" />
        <span className="text-xs text-gray-400">{c.overlayOpacity}%</span>
      </Field>
      <Field label="タイトル">
        <input value={c.title} onChange={e => onUpdate({ title: e.target.value })} className={inputCls} />
        <AiButton prompt={`飲食店のヒーローセクション用キャッチコピーを1文（20文字以内）で提案してください。テキストのみ返してください。`} onResult={text => onUpdate({ title: text })} />
      </Field>
      <Field label="サブタイトル">
        <textarea value={c.subtitle} onChange={e => onUpdate({ subtitle: e.target.value })} rows={2} className={textareaCls} />
        <AiButton prompt={`飲食店のヒーローサブタイトルを1文（40文字以内）で提案してください。テキストのみ返してください。`} onResult={text => onUpdate({ subtitle: text })} />
      </Field>
      <Field label="CTAボタンテキスト">
        <input value={c.ctaText} onChange={e => onUpdate({ ctaText: e.target.value })} className={inputCls} />
      </Field>
      <Field label="CTAリンクURL">
        <input value={c.ctaUrl} onChange={e => onUpdate({ ctaUrl: e.target.value })} className={inputCls} placeholder="https://..." />
      </Field>
      <Field label="テキスト配置">
        <div className="flex gap-2">
          {(['left', 'center', 'right'] as const).map(a => (
            <button key={a} type="button" onClick={() => onUpdate({ textAlign: a })}
              className={`flex-1 py-1.5 text-xs border rounded-lg transition ${c.textAlign === a ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
              {a === 'left' ? '左' : a === 'center' ? '中央' : '右'}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )
}

function TextEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as TextContent
  return (
    <div>
      <Field label="見出し">
        <input value={c.heading} onChange={e => onUpdate({ heading: e.target.value })} className={inputCls} />
        <AiButton prompt="飲食店のセクション見出しを1文（20文字以内）で提案してください。テキストのみ返してください。" onResult={t => onUpdate({ heading: t })} />
      </Field>
      <Field label="本文">
        <textarea value={c.body} onChange={e => onUpdate({ body: e.target.value })} rows={5} className={textareaCls} />
        <AiButton prompt="飲食店のコンセプトや魅力を伝える本文を150文字程度で提案してください。テキストのみ返してください。" onResult={t => onUpdate({ body: t })} />
      </Field>
      <Field label="テキスト配置">
        <div className="flex gap-2">
          {(['left', 'center', 'right'] as const).map(a => (
            <button key={a} type="button" onClick={() => onUpdate({ align: a })}
              className={`flex-1 py-1.5 text-xs border rounded-lg transition ${c.align === a ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
              {a === 'left' ? '左' : a === 'center' ? '中央' : '右'}
            </button>
          ))}
        </div>
      </Field>
      <Field label="背景色">
        <div className="flex items-center gap-2">
          <input type="color" value={c.bgColor} onChange={e => onUpdate({ bgColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
          <span className="text-xs text-gray-500">{c.bgColor}</span>
        </div>
      </Field>
    </div>
  )
}

function ImageEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as ImageContent
  return (
    <div>
      <Field label="写真">
        <ImageUpload imageUrl={c.imageUrl} onUpload={url => onUpdate({ imageUrl: url })} />
      </Field>
      <Field label="キャプション">
        <input value={c.caption} onChange={e => onUpdate({ caption: e.target.value })} className={inputCls} placeholder="写真の説明（任意）" />
      </Field>
      <Field label="表示サイズ">
        <div className="flex gap-2">
          {(['full', 'contained'] as const).map(s => (
            <button key={s} type="button" onClick={() => onUpdate({ size: s })}
              className={`flex-1 py-1.5 text-xs border rounded-lg transition ${c.size === s ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
              {s === 'full' ? '全幅' : '中央寄せ'}
            </button>
          ))}
        </div>
      </Field>
    </div>
  )
}

function ImageTextEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as ImageTextContent
  return (
    <div>
      <Field label="写真">
        <ImageUpload imageUrl={c.imageUrl} onUpload={url => onUpdate({ imageUrl: url })} />
      </Field>
      <Field label="写真の位置">
        <div className="flex gap-2">
          {(['left', 'right'] as const).map(p => (
            <button key={p} type="button" onClick={() => onUpdate({ imagePosition: p })}
              className={`flex-1 py-1.5 text-xs border rounded-lg transition ${c.imagePosition === p ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
              {p === 'left' ? '左' : '右'}
            </button>
          ))}
        </div>
      </Field>
      <Field label="見出し">
        <input value={c.heading} onChange={e => onUpdate({ heading: e.target.value })} className={inputCls} />
        <AiButton prompt="飲食店の写真+テキストセクションの見出しを20文字以内で提案してください。テキストのみ返してください。" onResult={t => onUpdate({ heading: t })} />
      </Field>
      <Field label="本文">
        <textarea value={c.body} onChange={e => onUpdate({ body: e.target.value })} rows={4} className={textareaCls} />
        <AiButton prompt="飲食店のこだわりや魅力を伝える本文を100文字程度で提案してください。テキストのみ返してください。" onResult={t => onUpdate({ body: t })} />
      </Field>
    </div>
  )
}

function MenuEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as MenuContent
  const updateItem = (idx: number, patch: Partial<MenuItem>) => {
    const items = c.items.map((item, i) => i === idx ? { ...item, ...patch } : item)
    onUpdate({ items })
  }
  return (
    <div>
      <Field label="セクション見出し">
        <input value={c.heading} onChange={e => onUpdate({ heading: e.target.value })} className={inputCls} />
      </Field>
      {c.items.map((item, idx) => (
        <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-500 mb-2">メニュー {idx + 1}</p>
          <Field label="写真">
            <ImageUpload imageUrl={item.imageUrl} onUpload={url => updateItem(idx, { imageUrl: url })} label="メニュー写真" />
          </Field>
          <Field label="名前">
            <input value={item.name} onChange={e => updateItem(idx, { name: e.target.value })} className={inputCls} />
          </Field>
          <Field label="説明">
            <textarea value={item.description} onChange={e => updateItem(idx, { description: e.target.value })} rows={2} className={textareaCls} />
          </Field>
          <Field label="価格">
            <input value={item.price} onChange={e => updateItem(idx, { price: e.target.value })} className={inputCls} placeholder="¥1,000" />
          </Field>
        </div>
      ))}
    </div>
  )
}

function AppealEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as AppealContent
  const updatePoint = (idx: number, patch: Partial<AppealPoint>) => {
    const points = c.points.map((p, i) => i === idx ? { ...p, ...patch } : p)
    onUpdate({ points })
  }
  return (
    <div>
      <Field label="セクション見出し">
        <input value={c.heading} onChange={e => onUpdate({ heading: e.target.value })} className={inputCls} />
      </Field>
      {c.points.map((point, idx) => (
        <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-500 mb-2">アピール {idx + 1}</p>
          <Field label="アイコン（絵文字）">
            <input value={point.icon} onChange={e => updatePoint(idx, { icon: e.target.value })} className={inputCls} />
          </Field>
          <Field label="タイトル">
            <input value={point.title} onChange={e => updatePoint(idx, { title: e.target.value })} className={inputCls} />
          </Field>
          <Field label="説明">
            <textarea value={point.description} onChange={e => updatePoint(idx, { description: e.target.value })} rows={2} className={textareaCls} />
          </Field>
        </div>
      ))}
    </div>
  )
}

function MapEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as MapContent
  return (
    <div>
      <Field label="セクション見出し">
        <input value={c.heading} onChange={e => onUpdate({ heading: e.target.value })} className={inputCls} />
      </Field>
      <Field label="Google Maps 埋め込みURL">
        <textarea
          value={c.embedUrl}
          onChange={e => onUpdate({ embedUrl: extractMapUrl(e.target.value) })}
          rows={4}
          className={textareaCls}
          placeholder={'Google Maps → 共有 → 地図を埋め込む\nで表示されるiframeのHTMLまたはsrc URLを貼り付け'}
        />
        <p className="text-xs text-gray-400 mt-1">iframeタグをそのまま貼り付けてもOKです</p>
      </Field>
      <Field label="地図の高さ (px)">
        <input type="number" value={c.height} onChange={e => onUpdate({ height: Number(e.target.value) })} className={inputCls} />
      </Field>
    </div>
  )
}

function AccessEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as AccessContent
  return (
    <div>
      <Field label="セクション見出し">
        <input value={c.heading} onChange={e => onUpdate({ heading: e.target.value })} className={inputCls} />
      </Field>
      <Field label="住所">
        <input value={c.address} onChange={e => onUpdate({ address: e.target.value })} className={inputCls} />
      </Field>
      <Field label="最寄り駅">
        <input value={c.nearest} onChange={e => onUpdate({ nearest: e.target.value })} className={inputCls} />
      </Field>
      <Field label="営業時間">
        <input value={c.hours} onChange={e => onUpdate({ hours: e.target.value })} className={inputCls} />
      </Field>
      <Field label="定休日">
        <input value={c.closed} onChange={e => onUpdate({ closed: e.target.value })} className={inputCls} />
      </Field>
      <Field label="電話番号">
        <input value={c.phone} onChange={e => onUpdate({ phone: e.target.value })} className={inputCls} />
      </Field>
    </div>
  )
}

function CTAEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as CTAContent
  return (
    <div>
      <Field label="見出し">
        <input value={c.heading} onChange={e => onUpdate({ heading: e.target.value })} className={inputCls} />
        <AiButton prompt="飲食店の予約を促すCTAセクションの見出しを20文字以内で提案してください。テキストのみ返してください。" onResult={t => onUpdate({ heading: t })} />
      </Field>
      <Field label="本文">
        <textarea value={c.body} onChange={e => onUpdate({ body: e.target.value })} rows={3} className={textareaCls} />
        <AiButton prompt="飲食店の予約を促す一言メッセージを60文字以内で提案してください。テキストのみ返してください。" onResult={t => onUpdate({ body: t })} />
      </Field>
      <Field label="ボタンテキスト">
        <input value={c.buttonText} onChange={e => onUpdate({ buttonText: e.target.value })} className={inputCls} />
      </Field>
      <Field label="ボタンURL">
        <input value={c.buttonUrl} onChange={e => onUpdate({ buttonUrl: e.target.value })} className={inputCls} placeholder="https://..." />
      </Field>
      <Field label="背景色">
        <div className="flex items-center gap-2">
          <input type="color" value={c.bgColor} onChange={e => onUpdate({ bgColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
          <span className="text-xs text-gray-500">{c.bgColor}</span>
        </div>
      </Field>
    </div>
  )
}

function GalleryEditor({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<BlockContent>) => void }) {
  const c = block.content as GalleryContent
  const updateImage = (idx: number, url: string) => {
    const images = [...c.images]
    images[idx] = url
    onUpdate({ images })
  }
  return (
    <div>
      <Field label="セクション見出し">
        <input value={c.heading} onChange={e => onUpdate({ heading: e.target.value })} className={inputCls} />
      </Field>
      <Field label="カラム数">
        <div className="flex gap-2">
          {([2, 3, 4] as const).map(n => (
            <button key={n} type="button" onClick={() => onUpdate({ columns: n })}
              className={`flex-1 py-1.5 text-xs border rounded-lg transition ${c.columns === n ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-200 text-gray-600 hover:border-orange-300'}`}>
              {n}列
            </button>
          ))}
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-2">
        {c.images.map((img, idx) => (
          <ImageUpload key={idx} imageUrl={img} onUpload={url => updateImage(idx, url)} label={`写真 ${idx + 1}`} />
        ))}
      </div>
    </div>
  )
}

function BlockEditor({ block, onUpdate }: { block: Block; onUpdate: (id: string, patch: Partial<BlockContent>) => void }) {
  const update = (patch: Partial<BlockContent>) => onUpdate(block.id, patch)
  switch (block.content.type) {
    case 'hero':       return <HeroEditor block={block} onUpdate={update} />
    case 'text':       return <TextEditor block={block} onUpdate={update} />
    case 'image':      return <ImageEditor block={block} onUpdate={update} />
    case 'image-text': return <ImageTextEditor block={block} onUpdate={update} />
    case 'menu':       return <MenuEditor block={block} onUpdate={update} />
    case 'appeal':     return <AppealEditor block={block} onUpdate={update} />
    case 'map':        return <MapEditor block={block} onUpdate={update} />
    case 'access':     return <AccessEditor block={block} onUpdate={update} />
    case 'cta':        return <CTAEditor block={block} onUpdate={update} />
    case 'gallery':    return <GalleryEditor block={block} onUpdate={update} />
  }
}

// ── Main LeftPanel ────────────────────────────────────────────────

export default function LeftPanel({ config, selectedBlock, onAddBlock, onUpdateBlock, onFontChange, onColorChange, onDeselect }: Props) {
  const [tab, setTab] = useState<'blocks' | 'style'>('blocks')
  const meta = selectedBlock ? BLOCK_META.find(m => m.type === selectedBlock.content.type) : null

  return (
    <aside className="w-80 flex-shrink-0 h-full flex flex-col bg-white border-r border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition text-sm">
          <ChevronLeft size={16} /> ホーム
        </Link>
        <span className="font-bold text-gray-800 text-sm">LP Builder</span>
        <div className="w-16" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {(['blocks', 'style'] as const).map(t => (
          <button key={t} onClick={() => { setTab(t); onDeselect() }}
            className={`flex-1 py-2.5 text-sm font-semibold transition ${tab === t ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-400 hover:text-gray-600'}`}>
            {t === 'blocks' ? 'ブロック' : 'スタイル'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'style' ? (
          <div className="p-4 space-y-6">
            {/* Font */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">フォント</p>
              <div className="space-y-2">
                {(Object.entries(FONTS) as [FontKey, typeof FONTS[FontKey]][]).map(([key, font]) => (
                  <label key={key} className="cursor-pointer">
                    <input type="radio" name="font" value={key} checked={config.font === key} onChange={() => onFontChange(key)} className="sr-only" />
                    <div className={`flex items-center justify-between px-3 py-2.5 border-2 rounded-lg transition ${config.font === key ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-gray-300'}`}>
                      <span className="text-xs font-medium text-gray-600">{font.name}</span>
                      <span className="text-sm" style={{ fontFamily: font.family }}>{font.sample}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Primary color */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">メインカラー</p>
              <div className="flex items-center gap-3">
                <input type="color" value={config.primaryColor} onChange={e => onColorChange(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{config.primaryColor}</p>
                  <p className="text-xs text-gray-400">ボタンやアクセントに使用</p>
                </div>
              </div>
            </div>
          </div>
        ) : selectedBlock ? (
          /* Block editor */
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">{meta?.icon}</span>
                <span className="font-semibold text-gray-800 text-sm">{meta?.label}を編集</span>
              </div>
              <button onClick={onDeselect} className="text-gray-400 hover:text-gray-600 transition">
                <X size={16} />
              </button>
            </div>
            <BlockEditor block={selectedBlock} onUpdate={onUpdateBlock} />
          </div>
        ) : (
          /* Block palette */
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">ブロックを追加</p>
            <div className="space-y-2">
              {BLOCK_META.map(m => (
                <button
                  key={m.type}
                  type="button"
                  onClick={() => onAddBlock(m.type)}
                  className="w-full flex items-center gap-3 px-3 py-3 border border-gray-100 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition text-left group"
                >
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-orange-700">{m.label}</p>
                    <p className="text-xs text-gray-400">{m.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
