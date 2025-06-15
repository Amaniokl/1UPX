import React from 'react';

type OnboardingStepperProps = {
  currentStep: number; // 1 to 4
};

function OnboardingStepper({ currentStep }: OnboardingStepperProps) {
  const totalSteps = 4;

  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <React.Fragment key={step}>
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                transition-all duration-300
                ${isCompleted
                  ? 'bg-green-500 text-white shadow-md'
                  : isActive
                  ? 'bg-indigo-600 text-white shadow-md scale-110'
                  : 'bg-gray-200 text-gray-500'}
              `}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div className="flex-1 h-1 bg-gray-300 rounded-md max-w-[40px] sm:max-w-[60px]" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default OnboardingStepper;
