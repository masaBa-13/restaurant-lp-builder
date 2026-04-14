import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "飲食店LP Builder — 10分でLPを作成",
  description: "飲食店専用のランディングページ作成ツール。AIが自動でキャッチコピーを生成。無料・登録不要・10分で完成。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=M+PLUS+Rounded+1c:wght@400;700&family=Sawarabi+Mincho&family=Sawarabi+Gothic&family=Shippori+Mincho:wght@400;700&family=Zen+Kaku+Gothic+New:wght@400;700&family=Zen+Old+Mincho&family=Yuji+Syuku&family=Dela+Gothic+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
