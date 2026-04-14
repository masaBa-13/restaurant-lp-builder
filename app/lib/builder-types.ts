export type FontKey =
  | 'noto-serif-jp'
  | 'noto-sans-jp'
  | 'm-plus-rounded'
  | 'sawarabi-mincho'
  | 'sawarabi-gothic'
  | 'shippori-mincho'
  | 'zen-kaku-gothic'
  | 'zen-old-mincho'
  | 'yuji-syuku'
  | 'dela-gothic-one'

export const FONTS: Record<FontKey, { name: string; family: string; sample: string }> = {
  'noto-serif-jp':   { name: 'Noto Serif JP',   family: "'Noto Serif JP', serif",          sample: '明朝体の美しさ' },
  'noto-sans-jp':    { name: 'Noto Sans JP',     family: "'Noto Sans JP', sans-serif",      sample: 'シンプルで読みやすい' },
  'm-plus-rounded':  { name: 'M PLUS Rounded',   family: "'M PLUS Rounded 1c', sans-serif", sample: '丸みのある優しいフォント' },
  'sawarabi-mincho': { name: 'さわらび明朝',     family: "'Sawarabi Mincho', serif",        sample: '和の趣を感じる明朝体' },
  'sawarabi-gothic': { name: 'さわらびゴシック', family: "'Sawarabi Gothic', sans-serif",   sample: '清潔感あるゴシック' },
  'shippori-mincho': { name: 'しっぽり明朝',     family: "'Shippori Mincho', serif",        sample: '上質な印象の明朝体' },
  'zen-kaku-gothic': { name: 'Zen角ゴシック',    family: "'Zen Kaku Gothic New', sans-serif", sample: 'モダンな角ゴシック' },
  'zen-old-mincho':  { name: 'Zen旧字体明朝',    family: "'Zen Old Mincho', serif",         sample: '格調ある旧字体' },
  'yuji-syuku':      { name: '游字宿',            family: "'Yuji Syuku', serif",             sample: '風雅な毛筆体' },
  'dela-gothic-one': { name: 'Dela Gothic',      family: "'Dela Gothic One', sans-serif",   sample: 'インパクト大の太字体' },
}

export type BlockType =
  | 'hero'
  | 'text'
  | 'image'
  | 'image-text'
  | 'menu'
  | 'appeal'
  | 'map'
  | 'access'
  | 'cta'
  | 'gallery'

export interface BlockMeta {
  type: BlockType
  label: string
  icon: string
  description: string
}

export const BLOCK_META: BlockMeta[] = [
  { type: 'hero',       label: 'ヒーロー',     icon: '🖼️',  description: '全面写真+大見出し' },
  { type: 'text',       label: 'テキスト',     icon: '📝',  description: '見出し+本文' },
  { type: 'image',      label: '写真',         icon: '📷',  description: '写真1枚' },
  { type: 'image-text', label: '写真+テキスト', icon: '🗂️', description: '写真と文章を横並び' },
  { type: 'menu',       label: 'メニュー',     icon: '🍽️',  description: 'メニューカード' },
  { type: 'appeal',     label: 'アピール',     icon: '⭐',  description: '3つの強みを紹介' },
  { type: 'map',        label: 'Google Map',   icon: '📍',  description: 'Google Maps埋め込み' },
  { type: 'access',     label: 'アクセス',     icon: '🚶',  description: '住所・営業時間など' },
  { type: 'cta',        label: 'CTAボタン',    icon: '👆',  description: '予約ボタンなど' },
  { type: 'gallery',    label: 'ギャラリー',   icon: '🎞️',  description: '写真グリッド' },
]

// ── Block content interfaces ──────────────────────────────────────

export interface HeroContent {
  type: 'hero'
  imageUrl: string
  title: string
  subtitle: string
  ctaText: string
  ctaUrl: string
  overlayOpacity: number
  textAlign: 'left' | 'center' | 'right'
}

export interface TextContent {
  type: 'text'
  heading: string
  body: string
  align: 'left' | 'center' | 'right'
  bgColor: string
}

export interface ImageContent {
  type: 'image'
  imageUrl: string
  caption: string
  size: 'full' | 'contained'
}

export interface ImageTextContent {
  type: 'image-text'
  imageUrl: string
  imagePosition: 'left' | 'right'
  heading: string
  body: string
}

export interface MenuItem {
  name: string
  description: string
  price: string
  imageUrl: string
}

export interface MenuContent {
  type: 'menu'
  heading: string
  items: MenuItem[]
}

export interface AppealPoint {
  icon: string
  title: string
  description: string
}

export interface AppealContent {
  type: 'appeal'
  heading: string
  points: AppealPoint[]
}

export interface MapContent {
  type: 'map'
  embedUrl: string
  heading: string
  height: number
}

export interface AccessContent {
  type: 'access'
  heading: string
  address: string
  nearest: string
  hours: string
  closed: string
  phone: string
}

export interface CTAContent {
  type: 'cta'
  heading: string
  body: string
  buttonText: string
  buttonUrl: string
  bgColor: string
}

export interface GalleryContent {
  type: 'gallery'
  heading: string
  images: string[]
  columns: 2 | 3 | 4
}

export type BlockContent =
  | HeroContent
  | TextContent
  | ImageContent
  | ImageTextContent
  | MenuContent
  | AppealContent
  | MapContent
  | AccessContent
  | CTAContent
  | GalleryContent

export interface Block {
  id: string
  content: BlockContent
}

export interface LPConfig {
  font: FontKey
  primaryColor: string
  blocks: Block[]
}

export function createDefaultBlock(type: BlockType): BlockContent {
  switch (type) {
    case 'hero':
      return { type: 'hero', imageUrl: '', title: 'お店のキャッチコピーをここに', subtitle: '心を込めたおもてなしで皆様をお迎えします', ctaText: 'ご予約はこちら', ctaUrl: '', overlayOpacity: 50, textAlign: 'center' }
    case 'text':
      return { type: 'text', heading: '見出しをここに入力', body: '本文をここに入力してください。お店のコンセプトや魅力を伝えましょう。', align: 'center', bgColor: '#ffffff' }
    case 'image':
      return { type: 'image', imageUrl: '', caption: '', size: 'full' }
    case 'image-text':
      return { type: 'image-text', imageUrl: '', imagePosition: 'left', heading: '見出しをここに入力', body: '写真の横にテキストを配置できます。こだわりや特徴を伝えましょう。' }
    case 'menu':
      return { type: 'menu', heading: 'おすすめメニュー', items: [{ name: 'メニュー名', description: 'メニューの説明を入力', price: '¥0,000', imageUrl: '' }, { name: 'メニュー名', description: 'メニューの説明を入力', price: '¥0,000', imageUrl: '' }, { name: 'メニュー名', description: 'メニューの説明を入力', price: '¥0,000', imageUrl: '' }] }
    case 'appeal':
      return { type: 'appeal', heading: 'こだわりと強み', points: [{ icon: '🍳', title: 'こだわりの素材', description: '厳選した地元食材を使用しています' }, { icon: '👨‍🍳', title: '職人の技', description: '経験豊富なシェフが腕を振るいます' }, { icon: '🏠', title: '居心地の良さ', description: '落ち着いた空間でゆったりと' }] }
    case 'map':
      return { type: 'map', embedUrl: '', heading: 'アクセス', height: 400 }
    case 'access':
      return { type: 'access', heading: 'アクセス・営業情報', address: '住所を入力', nearest: '最寄り駅を入力', hours: '営業時間を入力', closed: '定休日を入力', phone: '電話番号を入力' }
    case 'cta':
      return { type: 'cta', heading: 'ご予約・お問い合わせ', body: 'ご予約はお電話またはオンラインで承っております', buttonText: '今すぐ予約する', buttonUrl: '', bgColor: '#C0392B' }
    case 'gallery':
      return { type: 'gallery', heading: 'フォトギャラリー', images: ['', '', '', ''], columns: 2 }
  }
}
