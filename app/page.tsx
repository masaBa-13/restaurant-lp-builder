import Link from 'next/link';
import { ChevronRight, Clock, Sparkles, Smartphone } from 'lucide-react';

const features = [
  {
    icon: '⏱️',
    title: '10分で完成',
    desc: '5ステップのシンプルな入力だけで、プロ品質のLPが完成します',
  },
  {
    icon: '✨',
    title: 'AI自動生成',
    desc: 'Claude AIがお店の情報からキャッチコピー・コンセプト文を自動作成',
  },
  {
    icon: '📱',
    title: 'スマホ対応',
    desc: 'PC・スマートフォン両対応のレスポンシブデザイン',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="font-bold text-gray-800 text-lg">飲食店LP Builder</span>
          </div>
          <Link
            href="/create"
            className="px-5 py-2 bg-orange-500 text-white rounded-full font-semibold text-sm hover:bg-orange-600 transition shadow"
          >
            無料で作成
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
            <Sparkles size={14} />
            AI搭載・飲食店専用
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
            飲食店のLPを
            <br />
            <span className="text-orange-500">10分で作成</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            お店の情報を入力するだけ。AIが魅力的なコピーを自動生成し、
            プロ品質のランディングページを作ります。
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-xl hover:bg-orange-600 transition shadow-xl"
          >
            今すぐ無料で作成
            <ChevronRight size={20} />
          </Link>
          <p className="mt-4 text-sm text-gray-400">クレジットカード不要・登録不要</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">選ばれる理由</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-orange-50 transition">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">3ステップで完成</h2>
          <div className="space-y-6">
            {[
              { step: '01', title: '基本情報・メニューを入力', desc: '店名、ジャンル、看板メニューなどをフォームに入力' },
              { step: '02', title: 'AIが自動でコピーを生成', desc: 'Claude AIがお店の魅力を引き出すキャッチコピーとコンセプト文を作成' },
              { step: '03', title: 'LPが完成・シェア', desc: 'プレビューを確認してURLをシェアするだけ' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm">
                <span className="text-3xl font-black text-orange-200">{item.step}</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-500 to-amber-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">今すぐLPを作成しましょう</h2>
        <p className="text-lg opacity-80 mb-8">無料・登録不要・10分で完成</p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-10 py-4 bg-white text-orange-600 rounded-full font-bold text-xl hover:shadow-xl transition"
        >
          無料でLPを作成する
          <ChevronRight size={20} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-gray-100">
        <p className="text-sm text-gray-400">© 2025 飲食店LP Builder. Powered by Claude AI.</p>
      </footer>
    </div>
  );
}
