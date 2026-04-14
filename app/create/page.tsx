'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import StepIndicator from '@/components/form/StepIndicator';
import Step1_Basic from '@/components/form/Step1_Basic';
import Step2_Menu from '@/components/form/Step2_Menu';
import Step3_Appeal from '@/components/form/Step3_Appeal';
import Step4_Access from '@/components/form/Step4_Access';
import Step5_Design from '@/components/form/Step5_Design';
import { RestaurantData, LPData } from '@/app/lib/types';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const defaultValues: RestaurantData = {
  basic: { name: '', genre: '', concept: '', targetCustomer: '', priceRange: '' },
  menu: { signatureDish: '', signatureDescription: '', otherMenus: [], drinkOption: false, courseOption: false },
  appeal: { strengths: [], atmosphere: '', uniquePoint: '' },
  access: { address: '', nearestStation: '', businessHours: '', closedDay: '', phone: '', reservationUrl: '', instagramUrl: '', googleMapUrl: '' },
  design: { themeColor: 'warm' },
};

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const methods = useForm<RestaurantData>({
    defaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit, trigger, register, formState: { errors } } = methods;

  const stepFields: Record<number, (keyof RestaurantData)[]> = {
    1: ['basic'],
    2: ['menu'],
    3: ['appeal'],
    4: ['access'],
    5: ['design'],
  };

  const handleNext = async () => {
    const fields = stepFields[currentStep];
    const valid = await trigger(fields);
    if (valid) setCurrentStep((s) => s + 1);
  };

  const onSubmit = async (data: RestaurantData) => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      const lpData: LPData = {
        id: nanoid(10),
        restaurant: data,
        content: result.content,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(`lp_${lpData.id}`, JSON.stringify(lpData));
      router.push(`/preview/${lpData.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-orange-200 animate-ping opacity-50" />
            <div className="relative w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center">
              <Sparkles className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">LPを生成しています...</h2>
          <p className="text-gray-500">AIがお店の魅力を言葉にしています。しばらくお待ちください。</p>
          <div className="mt-6 flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-bold text-gray-800">LP Builder for 飲食店</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 1 && <Step1_Basic register={register} errors={errors} />}
              {currentStep === 2 && <Step2_Menu register={register} errors={errors} />}
              {currentStep === 3 && <Step3_Appeal register={register} errors={errors} />}
              {currentStep === 4 && <Step4_Access register={register} errors={errors} />}
              {currentStep === 5 && <Step5_Design register={register} />}

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:border-orange-300 hover:text-orange-600 transition"
                  >
                    <ChevronLeft size={18} />
                    戻る
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition shadow-md hover:shadow-lg"
                  >
                    次へ
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition shadow-md hover:shadow-lg"
                  >
                    <Sparkles size={18} />
                    LPを生成する
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          ステップ {currentStep} / 5 — 残り約{Math.max(1, (5 - currentStep) * 2)}分
        </p>
      </main>
    </div>
  );
}
