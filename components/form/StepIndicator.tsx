'use client';

interface Step {
  number: number;
  label: string;
}

const steps: Step[] = [
  { number: 1, label: '基本情報' },
  { number: 2, label: 'メニュー' },
  { number: 3, label: 'こだわり' },
  { number: 4, label: 'アクセス' },
  { number: 5, label: 'デザイン' },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step.number < currentStep
                  ? 'bg-orange-500 text-white'
                  : step.number === currentStep
                  ? 'bg-orange-600 text-white ring-4 ring-orange-200'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {step.number < currentStep ? '✓' : step.number}
            </div>
            <span
              className={`mt-1 text-xs hidden sm:block ${
                step.number === currentStep ? 'text-orange-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-8 sm:w-16 mx-1 transition-all duration-300 ${
                step.number < currentStep ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
