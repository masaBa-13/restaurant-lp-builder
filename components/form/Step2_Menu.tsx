'use client';

import { useState } from 'react';
import { UseFormRegister, FieldErrors, useFormContext } from 'react-hook-form';
import { RestaurantData } from '@/app/lib/types';
import { X } from 'lucide-react';

interface Props {
  register: UseFormRegister<RestaurantData>;
  errors: FieldErrors<RestaurantData>;
}

export default function Step2_Menu({ register, errors }: Props) {
  const { setValue, watch } = useFormContext<RestaurantData>();
  const otherMenus = watch('menu.otherMenus') || [];
  const [menuInput, setMenuInput] = useState('');

  const addMenu = () => {
    const trimmed = menuInput.trim();
    if (trimmed && otherMenus.length < 5) {
      setValue('menu.otherMenus', [...otherMenus, trimmed]);
      setMenuInput('');
    }
  };

  const removeMenu = (index: number) => {
    setValue('menu.otherMenus', otherMenus.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">メニューを教えてください</h2>
        <p className="text-gray-500 text-sm">看板メニューを中心に入力します</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          看板メニュー名 <span className="text-red-500">*</span>
        </label>
        <input
          {...register('menu.signatureDish', { required: '看板メニューを入力してください' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          placeholder="例: 特選和牛のすき焼き"
        />
        {errors.menu?.signatureDish && (
          <p className="mt-1 text-xs text-red-500">{errors.menu.signatureDish.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          看板メニューの説明（任意）
        </label>
        <textarea
          {...register('menu.signatureDescription')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
          rows={3}
          placeholder="例: 厳選した国産牛を秘伝のタレで仕上げた一品。ほろほろと溶ける食感が絶品です。"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          その他のメニュー（最大5つ）
        </label>
        <div className="flex gap-2 mb-2">
          <input
            value={menuInput}
            onChange={(e) => setMenuInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMenu(); } }}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            placeholder="例: 天ぷら盛り合わせ"
            disabled={otherMenus.length >= 5}
          />
          <button
            type="button"
            onClick={addMenu}
            disabled={otherMenus.length >= 5}
            className="px-4 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-40 transition"
          >
            追加
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {otherMenus.map((menu, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
            >
              {menu}
              <button
                type="button"
                onClick={() => removeMenu(index)}
                className="ml-1 hover:text-orange-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            {...register('menu.drinkOption')}
            type="checkbox"
            className="w-5 h-5 accent-orange-500"
          />
          <span className="text-sm font-medium text-gray-700">🍺 ドリンクメニューあり</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            {...register('menu.courseOption')}
            type="checkbox"
            className="w-5 h-5 accent-orange-500"
          />
          <span className="text-sm font-medium text-gray-700">🍽️ コース料理あり</span>
        </label>
      </div>
    </div>
  );
}
