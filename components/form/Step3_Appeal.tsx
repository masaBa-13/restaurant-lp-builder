'use client';

import { UseFormRegister, FieldErrors, useFormContext } from 'react-hook-form';
import { RestaurantData } from '@/app/lib/types';

const strengthOptions = [
  '素材・食材へのこだわり',
  '職人の技・手作り',
  'リーズナブルな価格',
  '個室・半個室あり',
  'お子様連れOK',
  'ペットOK（テラス）',
  'テイクアウトあり',
  '深夜まで営業',
  '完全予約制',
  '記念日・特別演出',
  '地元食材を使用',
  '健康・ヘルシー志向',
];

const atmospheres = ['落ち着いた', '賑やか', 'おしゃれ', 'アットホーム', '高級感'];

interface Props {
  register: UseFormRegister<RestaurantData>;
  errors: FieldErrors<RestaurantData>;
}

export default function Step3_Appeal({ register, errors }: Props) {
  const { watch } = useFormContext<RestaurantData>();
  const selected = watch('appeal.strengths') || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">こだわり・強みを選んでください</h2>
        <p className="text-gray-500 text-sm">当てはまるものをすべて選択できます</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          強み・こだわり（複数選択可）
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {strengthOptions.map((strength) => (
            <label key={strength} className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('appeal.strengths')}
                type="checkbox"
                value={strength}
                className="w-4 h-4 accent-orange-500"
              />
              <span className={`text-sm transition ${selected.includes(strength) ? 'text-orange-700 font-semibold' : 'text-gray-600'}`}>
                {strength}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          お店の雰囲気 <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {atmospheres.map((atm) => (
            <label key={atm} className="cursor-pointer">
              <input
                {...register('appeal.atmosphere', { required: '雰囲気を選択してください' })}
                type="radio"
                value={atm}
                className="sr-only peer"
              />
              <div className="text-center px-2 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-600 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-700 peer-checked:font-semibold transition cursor-pointer hover:border-orange-300">
                {atm}
              </div>
            </label>
          ))}
        </div>
        {errors.appeal?.atmosphere && (
          <p className="mt-1 text-xs text-red-500">{errors.appeal.atmosphere.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          独自のアピール一言（任意）
        </label>
        <input
          {...register('appeal.uniquePoint')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          placeholder="例: 店主が直接産地に赴いて選ぶ朝どれ食材"
        />
      </div>
    </div>
  );
}
