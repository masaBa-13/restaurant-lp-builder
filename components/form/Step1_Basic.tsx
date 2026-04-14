'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { RestaurantData } from '@/app/lib/types';

const genres = ['和食', 'イタリアン', 'フレンチ', '中華', '居酒屋', 'カフェ', 'ラーメン', '焼肉', '寿司', 'その他'];
const priceRanges = ['〜1,000円', '1,000〜3,000円', '3,000〜6,000円', '6,000円〜'];
const targets = ['20代の若者', '30〜40代のカップル', '30〜50代のファミリー', 'ビジネスパーソン', 'シニア層', '幅広い年代'];

interface Props {
  register: UseFormRegister<RestaurantData>;
  errors: FieldErrors<RestaurantData>;
}

export default function Step1_Basic({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">基本情報を教えてください</h2>
        <p className="text-gray-500 text-sm">店舗の基本的な情報を入力します</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          店名 <span className="text-red-500">*</span>
        </label>
        <input
          {...register('basic.name', { required: '店名を入力してください' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          placeholder="例: 和食処 さくら"
        />
        {errors.basic?.name && (
          <p className="mt-1 text-xs text-red-500">{errors.basic.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          ジャンル <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {genres.map((genre) => (
            <label key={genre} className="cursor-pointer">
              <input
                {...register('basic.genre', { required: 'ジャンルを選択してください' })}
                type="radio"
                value={genre}
                className="sr-only peer"
              />
              <div className="text-center px-2 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-600 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-700 peer-checked:font-semibold transition cursor-pointer hover:border-orange-300">
                {genre}
              </div>
            </label>
          ))}
        </div>
        {errors.basic?.genre && (
          <p className="mt-1 text-xs text-red-500">{errors.basic.genre.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          コンセプト一言 <span className="text-red-500">*</span>
        </label>
        <input
          {...register('basic.concept', { required: 'コンセプトを入力してください' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          placeholder="例: 地元の素材にこだわった本格和食"
        />
        {errors.basic?.concept && (
          <p className="mt-1 text-xs text-red-500">{errors.basic.concept.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          メインターゲット <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {targets.map((target) => (
            <label key={target} className="cursor-pointer">
              <input
                {...register('basic.targetCustomer', { required: 'ターゲットを選択してください' })}
                type="radio"
                value={target}
                className="sr-only peer"
              />
              <div className="text-center px-2 py-2 border-2 border-gray-200 rounded-lg text-sm text-gray-600 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-700 peer-checked:font-semibold transition cursor-pointer hover:border-orange-300">
                {target}
              </div>
            </label>
          ))}
        </div>
        {errors.basic?.targetCustomer && (
          <p className="mt-1 text-xs text-red-500">{errors.basic.targetCustomer.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          価格帯（お一人様） <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {priceRanges.map((range) => (
            <label key={range} className="cursor-pointer">
              <input
                {...register('basic.priceRange', { required: '価格帯を選択してください' })}
                type="radio"
                value={range}
                className="sr-only peer"
              />
              <div className="text-center px-2 py-3 border-2 border-gray-200 rounded-lg text-sm text-gray-600 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:text-orange-700 peer-checked:font-semibold transition cursor-pointer hover:border-orange-300">
                {range}
              </div>
            </label>
          ))}
        </div>
        {errors.basic?.priceRange && (
          <p className="mt-1 text-xs text-red-500">{errors.basic.priceRange.message}</p>
        )}
      </div>
    </div>
  );
}
