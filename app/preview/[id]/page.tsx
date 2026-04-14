'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LPData } from '@/app/lib/types';
import LPTemplate from '@/components/lp/LPTemplate';
import { Copy, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const [lpData, setLpData] = useState<LPData | null>(null);
  const [copied, setCopied] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(`lp_${id}`);
    if (stored) {
      setLpData(JSON.parse(stored));
    }
  }, [id]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!lpData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">LPデータが見つかりません</p>
          <Link href="/create" className="text-orange-500 hover:underline">
            新しくLPを作成する
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Preview Banner */}
      {showBanner && (
        <div className="sticky top-0 z-50 bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/create" className="flex items-center gap-1 text-gray-300 hover:text-white transition text-sm">
              <ArrowLeft size={16} />
              編集に戻る
            </Link>
            <span className="text-gray-500">|</span>
            <span className="text-sm font-semibold">🎉 LPが完成しました！</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'コピーしました' : 'URLをコピー'}
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="ml-2 text-gray-400 hover:text-white transition text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* LP Content */}
      <LPTemplate data={lpData} />
    </div>
  );
}
