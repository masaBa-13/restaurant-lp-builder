'use client'

import { Block, FONTS, FontKey, HeroContent, TextContent, ImageContent, ImageTextContent, MenuContent, AppealContent, MapContent, AccessContent, CTAContent, GalleryContent } from '@/app/lib/builder-types'
import { MapPin, Clock, Phone } from 'lucide-react'

interface RendererProps {
  block: Block
  font: FontKey
  primaryColor: string
}

function HeroRenderer({ content: c, font, primaryColor }: { content: HeroContent; font: FontKey; primaryColor: string }) {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden" style={{ fontFamily: FONTS[font].family }}>
      {c.imageUrl ? (
        <img src={c.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${c.overlayOpacity / 100})` }} />
      <div className={`relative z-10 text-white px-8 py-16 w-full text-${c.textAlign}`}>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">{c.title}</h1>
        <p className="text-xl opacity-90 mb-8">{c.subtitle}</p>
        {c.ctaText && (
          <a href={c.ctaUrl || '#'} className="inline-block px-8 py-3 rounded-full font-bold text-white shadow-lg" style={{ backgroundColor: primaryColor }}>
            {c.ctaText}
          </a>
        )}
      </div>
    </div>
  )
}

function TextRenderer({ content: c, font }: { content: TextContent; font: FontKey }) {
  return (
    <div className={`py-16 px-8 text-${c.align}`} style={{ backgroundColor: c.bgColor, fontFamily: FONTS[font].family }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">{c.heading}</h2>
        <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-wrap">{c.body}</p>
      </div>
    </div>
  )
}

function ImageRenderer({ content: c }: { content: ImageContent }) {
  return (
    <div className={c.size === 'full' ? 'w-full' : 'max-w-3xl mx-auto py-8 px-8'}>
      {c.imageUrl ? (
        <img src={c.imageUrl} alt={c.caption} className="w-full object-cover" />
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          <span>📷 写真をアップロードしてください</span>
        </div>
      )}
      {c.caption && <p className="text-center text-sm text-gray-500 mt-2">{c.caption}</p>}
    </div>
  )
}

function ImageTextRenderer({ content: c, font, primaryColor }: { content: ImageTextContent; font: FontKey; primaryColor: string }) {
  const imgEl = c.imageUrl ? (
    <img src={c.imageUrl} alt="" className="w-full h-full object-cover min-h-64" />
  ) : (
    <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">📷</div>
  )
  const textEl = (
    <div className="flex flex-col justify-center p-10" style={{ fontFamily: FONTS[font].family }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>{c.heading}</h2>
      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{c.body}</p>
    </div>
  )
  return (
    <div className="grid sm:grid-cols-2 min-h-80">
      {c.imagePosition === 'left' ? <>{imgEl}{textEl}</> : <>{textEl}{imgEl}</>}
    </div>
  )
}

function MenuRenderer({ content: c, font, primaryColor }: { content: MenuContent; font: FontKey; primaryColor: string }) {
  return (
    <div className="py-16 px-8 bg-gray-50" style={{ fontFamily: FONTS[font].family }}>
      <h2 className="text-3xl font-bold text-center mb-10" style={{ color: primaryColor }}>{c.heading}</h2>
      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {c.items.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-300 text-4xl">🍽️</div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{item.description}</p>
              <p className="font-bold" style={{ color: primaryColor }}>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppealRenderer({ content: c, font, primaryColor }: { content: AppealContent; font: FontKey; primaryColor: string }) {
  return (
    <div className="py-16 px-8" style={{ fontFamily: FONTS[font].family }}>
      <h2 className="text-3xl font-bold text-center mb-12" style={{ color: primaryColor }}>{c.heading}</h2>
      <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {c.points.map((p, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl mb-4">{p.icon}</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">{p.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MapRenderer({ content: c, font, primaryColor }: { content: MapContent; font: FontKey; primaryColor: string }) {
  return (
    <div className="py-12 px-8" style={{ fontFamily: FONTS[font].family }}>
      {c.heading && <h2 className="text-3xl font-bold text-center mb-8" style={{ color: primaryColor }}>{c.heading}</h2>}
      {c.embedUrl ? (
        <iframe
          src={c.embedUrl}
          width="100%"
          height={c.height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
        />
      ) : (
        <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400" style={{ height: c.height }}>
          <div className="text-center">
            <div className="text-4xl mb-2">📍</div>
            <p className="text-sm">左パネルからGoogle Maps埋め込みURLを設定してください</p>
          </div>
        </div>
      )}
    </div>
  )
}

function AccessRenderer({ content: c, font, primaryColor }: { content: AccessContent; font: FontKey; primaryColor: string }) {
  return (
    <div className="py-16 px-8 bg-gray-50" style={{ fontFamily: FONTS[font].family }}>
      <h2 className="text-3xl font-bold text-center mb-10" style={{ color: primaryColor }}>{c.heading}</h2>
      <div className="max-w-md mx-auto space-y-4">
        {c.address && <div className="flex items-start gap-3"><MapPin size={20} style={{ color: primaryColor }} className="mt-0.5 flex-shrink-0" /><p className="text-gray-700">{c.address}<br /><span className="text-sm text-gray-500">{c.nearest}</span></p></div>}
        {c.hours && <div className="flex items-center gap-3"><Clock size={20} style={{ color: primaryColor }} className="flex-shrink-0" /><p className="text-gray-700">{c.hours}<br /><span className="text-sm text-gray-500">定休日: {c.closed}</span></p></div>}
        {c.phone && <div className="flex items-center gap-3"><Phone size={20} style={{ color: primaryColor }} className="flex-shrink-0" /><p className="text-gray-700">{c.phone}</p></div>}
      </div>
    </div>
  )
}

function CTARenderer({ content: c, font }: { content: CTAContent; font: FontKey }) {
  return (
    <div className="py-20 px-8 text-center text-white" style={{ backgroundColor: c.bgColor, fontFamily: FONTS[font].family }}>
      <h2 className="text-3xl font-bold mb-4">{c.heading}</h2>
      <p className="text-lg opacity-80 mb-8">{c.body}</p>
      {c.buttonText && (
        <a href={c.buttonUrl || '#'} className="inline-block px-10 py-4 bg-white rounded-full font-bold text-lg shadow-lg transition hover:opacity-90" style={{ color: c.bgColor }}>
          {c.buttonText}
        </a>
      )}
    </div>
  )
}

function GalleryRenderer({ content: c, font, primaryColor }: { content: GalleryContent; font: FontKey; primaryColor: string }) {
  const colClass = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[c.columns]
  return (
    <div className="py-16 px-8" style={{ fontFamily: FONTS[font].family }}>
      {c.heading && <h2 className="text-3xl font-bold text-center mb-10" style={{ color: primaryColor }}>{c.heading}</h2>}
      <div className={`grid ${colClass} gap-3 max-w-4xl mx-auto`}>
        {c.images.map((img, i) =>
          img ? (
            <img key={i} src={img} alt="" className="w-full aspect-square object-cover rounded-xl" />
          ) : (
            <div key={i} className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-3xl">📷</div>
          )
        )}
      </div>
    </div>
  )
}

export default function BlockRenderer({ block, font, primaryColor }: RendererProps) {
  const c = block.content
  switch (c.type) {
    case 'hero':       return <HeroRenderer content={c} font={font} primaryColor={primaryColor} />
    case 'text':       return <TextRenderer content={c} font={font} />
    case 'image':      return <ImageRenderer content={c} />
    case 'image-text': return <ImageTextRenderer content={c} font={font} primaryColor={primaryColor} />
    case 'menu':       return <MenuRenderer content={c} font={font} primaryColor={primaryColor} />
    case 'appeal':     return <AppealRenderer content={c} font={font} primaryColor={primaryColor} />
    case 'map':        return <MapRenderer content={c} font={font} primaryColor={primaryColor} />
    case 'access':     return <AccessRenderer content={c} font={font} primaryColor={primaryColor} />
    case 'cta':        return <CTARenderer content={c} font={font} />
    case 'gallery':    return <GalleryRenderer content={c} font={font} primaryColor={primaryColor} />
  }
}
