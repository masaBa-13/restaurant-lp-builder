'use client';

import { UseFormRegister, useFormContext } from 'react-hook-form';
import { RestaurantData, ThemeColor } from '@/app/lib/types';
import { themes } from '@/app/lib/themes';

interface Props {
  register: UseFormRegister<RestaurantData>;
}

export default function Step5_Design({ register }: Props) {
  const { watch } = useFormContext<RestaurantData>();
  const selectedTheme = watch('design.themeColor');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">デザインテーマを選んでください</h2>
        <p className="text-gray-500 text-sm">お店のイメージに合ったテーマを選択します</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {(Object.entries(themes) as [ThemeColor, typeof themes[ThemeColor]][]).map(([key, theme]) => (
          <label key={key} className="cursor-pointer">
            <input
              {...register('design.themeColor')}
              type="radio"
              value={key}
              className="sr-only peer"
            />
            <div className={`flex items-center gap-4 p-4 border-2 rounded-xl transition ${
              selectedTheme === key
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300'
            }`}>
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${theme.heroGradient} flex-shrink-0`} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{theme.emoji}</span>
                  <span className="font-semibold text-gray-800">{theme.label}</span>
                </div>
                <div className="flex gap-2 mt-1">
                  {[theme.primary, theme.secondary, theme.accent].map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              {selectedTheme === key && (
                <div className="ml-auto text-orange-500 font-bold text-lg">✓</div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
