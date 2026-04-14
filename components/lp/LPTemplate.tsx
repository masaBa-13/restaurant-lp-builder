'use client';

import { LPData } from '@/app/lib/types';
import { themes } from '@/app/lib/themes';
import { MapPin, Clock, Phone, ExternalLink, ChevronDown } from 'lucide-react';

interface Props {
  data: LPData;
}

export default function LPTemplate({ data }: Props) {
  const { restaurant, content } = data;
  const theme = themes[restaurant.design.themeColor];
  const isLuxury = restaurant.design.themeColor === 'luxury';

  return (
    <div style={{ fontFamily: "'Noto Serif JP', serif", color: theme.text, backgroundColor: theme.bg }}>
      {/* Hero Section */}
      <section className={`relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${theme.heroGradient} text-white`}>
        <div className="text-center px-6 max-w-3xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase opacity-80 mb-6">{restaurant.basic.genre}</p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            {content.catchCopy}
          </h1>
          <p className="text-lg sm:text-2xl opacity-90 mb-8 font-light">
            {content.subCopy}
          </p>
          <p className="text-2xl sm:text-3xl font-bold tracking-widest mb-10 opacity-90">
            {restaurant.basic.name}
          </p>
          {restaurant.access.reservationUrl && (
            <a
              href={restaurant.access.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 rounded-full font-bold text-lg transition hover:scale-105 shadow-xl"
              style={{ backgroundColor: theme.accent, color: isLuxury ? '#000' : '#fff' }}
            >
              ご予約はこちら
            </a>
          )}
        </div>
        <div className="absolute bottom-8 animate-bounce opacity-60">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-50">Concept</p>
          <div className="w-16 h-0.5 mx-auto mb-8" style={{ backgroundColor: theme.primary }} />
          <h2 className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
            {restaurant.basic.name}について
          </h2>
          <p className="text-lg leading-relaxed opacity-80">{content.conceptText}</p>
        </div>
      </section>

      {/* Signature Dish Section */}
      <section className="py-24 px-6" style={{ backgroundColor: isLuxury ? '#111' : `${theme.primary}11` }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-50">Signature</p>
          <div className="w-16 h-0.5 mx-auto mb-8" style={{ backgroundColor: theme.primary }} />
          <h2 className="text-3xl font-bold mb-4">{restaurant.menu.signatureDish}</h2>
          <p className="text-lg leading-relaxed opacity-80 mb-8">{content.signatureDishDescription}</p>

          {restaurant.menu.otherMenus.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {restaurant.menu.otherMenus.map((menu, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-medium border"
                  style={{ borderColor: theme.primary, color: theme.primary }}
                >
                  {menu}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-6 mt-6 text-sm opacity-60">
            {restaurant.menu.drinkOption && <span>🍺 ドリンクメニューあり</span>}
            {restaurant.menu.courseOption && <span>🍽️ コース料理あり</span>}
          </div>
        </div>
      </section>

      {/* Appeal Points Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-50">Our Promise</p>
            <div className="w-16 h-0.5 mx-auto mb-8" style={{ backgroundColor: theme.primary }} />
            <h2 className="text-3xl font-bold" style={{ color: theme.primary }}>
              こだわりと強み
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {content.appealPoints.map((point, i) => (
              <div key={i} className="text-center p-6 rounded-2xl" style={{ backgroundColor: isLuxury ? '#111' : `${theme.primary}0a` }}>
                <div className="text-5xl mb-4">{point.icon}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: theme.primary }}>{point.title}</h3>
                <p className="text-sm leading-relaxed opacity-70">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section className="py-24 px-6" style={{ backgroundColor: isLuxury ? '#111' : `${theme.primary}11` }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-50">Access</p>
            <div className="w-16 h-0.5 mx-auto mb-8" style={{ backgroundColor: theme.primary }} />
            <h2 className="text-3xl font-bold" style={{ color: theme.primary }}>アクセス</h2>
          </div>
          <div className="space-y-5 text-center">
            {restaurant.access.address && (
              <div className="flex items-start justify-center gap-3">
                <MapPin size={20} style={{ color: theme.primary }} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{restaurant.access.address}</p>
                  {restaurant.access.nearestStation && (
                    <p className="text-sm opacity-60 mt-1">{restaurant.access.nearestStation}</p>
                  )}
                </div>
              </div>
            )}
            {restaurant.access.businessHours && (
              <div className="flex items-center justify-center gap-3">
                <Clock size={20} style={{ color: theme.primary }} className="flex-shrink-0" />
                <div>
                  <p className="font-medium">{restaurant.access.businessHours}</p>
                  {restaurant.access.closedDay && (
                    <p className="text-sm opacity-60 mt-1">定休日: {restaurant.access.closedDay}</p>
                  )}
                </div>
              </div>
            )}
            {restaurant.access.phone && (
              <div className="flex items-center justify-center gap-3">
                <Phone size={20} style={{ color: theme.primary }} className="flex-shrink-0" />
                <a href={`tel:${restaurant.access.phone}`} className="font-medium hover:opacity-70 transition">
                  {restaurant.access.phone}
                </a>
              </div>
            )}
            {restaurant.access.googleMapUrl && (
              <a
                href={restaurant.access.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full border-2 text-sm font-semibold transition hover:opacity-70"
                style={{ borderColor: theme.primary, color: theme.primary }}
              >
                <MapPin size={16} />
                Google Maps で見る
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className={`py-24 px-6 bg-gradient-to-br ${theme.heroGradient} text-white text-center`}>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg opacity-80 mb-4">{content.closingMessage}</p>
          <h2 className="text-3xl font-bold mb-10">{restaurant.basic.name}</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {restaurant.access.reservationUrl && (
              <a
                href={restaurant.access.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition hover:scale-105 shadow-xl"
                style={{ backgroundColor: theme.accent, color: isLuxury ? '#000' : '#fff' }}
              >
                <ExternalLink size={18} />
                ご予約はこちら
              </a>
            )}
            {restaurant.access.phone && (
              <a
                href={`tel:${restaurant.access.phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-white/20 backdrop-blur hover:bg-white/30 transition"
              >
                <Phone size={18} />
                {restaurant.access.phone}
              </a>
            )}
          </div>

          {restaurant.access.instagramUrl && (
            <a
              href={restaurant.access.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 opacity-70 hover:opacity-100 transition text-sm"
            >
              📸 Instagram をフォロー
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ backgroundColor: isLuxury ? '#000' : theme.text, color: isLuxury ? theme.text : theme.bg }}>
        <p className="text-sm opacity-60">© {new Date().getFullYear()} {restaurant.basic.name}. All rights reserved.</p>
        <p className="text-xs opacity-40 mt-2">Powered by Restaurant LP Builder</p>
      </footer>
    </div>
  );
}
