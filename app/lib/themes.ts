import { ThemeColor } from './types';

export interface Theme {
  primary: string;
  secondary: string;
  bg: string;
  text: string;
  accent: string;
  heroGradient: string;
  label: string;
  emoji: string;
}

export const themes: Record<ThemeColor, Theme> = {
  warm: {
    primary: '#C0392B',
    secondary: '#E67E22',
    bg: '#FFF8F0',
    text: '#2C1810',
    accent: '#F39C12',
    heroGradient: 'from-red-800 via-orange-700 to-amber-600',
    label: '温かみ・情熱',
    emoji: '🔥',
  },
  natural: {
    primary: '#27AE60',
    secondary: '#8B6914',
    bg: '#F5F5F0',
    text: '#2C2416',
    accent: '#A8D5A2',
    heroGradient: 'from-green-800 via-emerald-700 to-lime-600',
    label: '自然・ナチュラル',
    emoji: '🌿',
  },
  luxury: {
    primary: '#C9A84C',
    secondary: '#1A1A2E',
    bg: '#0D0D0D',
    text: '#F0F0E8',
    accent: '#C9A84C',
    heroGradient: 'from-gray-900 via-yellow-900 to-gray-800',
    label: '高級・上質',
    emoji: '✨',
  },
  cool: {
    primary: '#2980B9',
    secondary: '#16A085',
    bg: '#F0F4F8',
    text: '#1A2332',
    accent: '#74B9FF',
    heroGradient: 'from-blue-900 via-cyan-800 to-teal-700',
    label: 'クール・スタイリッシュ',
    emoji: '💎',
  },
  casual: {
    primary: '#E84393',
    secondary: '#FF6B35',
    bg: '#FFFACD',
    text: '#2D2D2D',
    accent: '#FFE135',
    heroGradient: 'from-pink-600 via-orange-500 to-yellow-400',
    label: 'カジュアル・ポップ',
    emoji: '🎉',
  },
};
