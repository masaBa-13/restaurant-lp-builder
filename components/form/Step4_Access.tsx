'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { RestaurantData } from '@/app/lib/types';

interface Props {
  register: UseFormRegister<RestaurantData>;
  errors: FieldErrors<RestaurantData>;
}

export default function Step4_Access({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">アクセス・営業情報</h2>
        <p className="text-gray-500 text-sm">お客様が来店しやすい情報を入力します</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          住所 <span className="text-red-500">*</span>
        </label>
        <input
          {...register('access.address', { required: '住所を入力してください' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          placeholder="例: 東京都渋谷区道玄坂1-2-3"
        />
        {errors.access?.address && (
          <p className="mt-1 text-xs text-red-500">{errors.access.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          最寄り駅
        </label>
        <input
          {...register('access.nearestStation')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          placeholder="例: 渋谷駅より徒歩5分"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            営業時間
          </label>
          <input
            {...register('access.businessHours')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            placeholder="例: 11:30〜14:00 / 17:00〜22:00"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            定休日
          </label>
          <input
            {...register('access.closedDay')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            placeholder="例: 月曜日"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          電話番号
        </label>
        <input
          {...register('access.phone')}
          type="tel"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          placeholder="例: 03-1234-5678"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          予約URL（食べログ・ホットペッパー等）
        </label>
        <input
          {...register('access.reservationUrl')}
          type="url"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Instagram URL（任意）
          </label>
          <input
            {...register('access.instagramUrl')}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            placeholder="https://instagram.com/..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Google Maps URL（任意）
          </label>
          <input
            {...register('access.googleMapUrl')}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            placeholder="https://maps.app.goo.gl/..."
          />
        </div>
      </div>
    </div>
  );
}
