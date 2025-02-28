import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const StepProgress = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const totalSteps = 10; // will use total number of pages from backend

  // Function to generate step numbers with ellipses
  const getDisplayedSteps = () => {
    if (totalSteps <= 5) {
      return Array.from({ length: totalSteps }, (_, i) => i + 1);
    }
    if (currentStep <= 3) {
      return [1, 2, 3, 4, 5, "...", totalSteps];
    }
    if (currentStep >= totalSteps - 2) {
      return [
        1,
        "...",
        totalSteps - 4,
        totalSteps - 3,
        totalSteps - 2,
        totalSteps - 1,
        totalSteps,
      ];
    }
    return [
      1,
      "...",
      currentStep - 1,
      currentStep,
      currentStep + 1,
      "...",
      totalSteps,
    ];
  };

  return (
    <div className="flex items-center justify-center  p-4">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={currentStep === 1}
        className="rounded-md text-rgtpurpleaccent2 font-bold cursor-pointer"
      >
        <ChevronLeft />
      </button>

      {/* Step Indicators */}
      <div className="flex items-center">
        {getDisplayedSteps().map((step, index) => (
          <div key={index} className="flex items-center">
            {step === "..." ? (
              <span className="text-gray-500 ">...</span>
            ) : (
              <button
                onClick={() => setCurrentStep(step as number)}
                className={`w-6 h-6 flex text-sm items-center justify-center rounded-md transition-all 
                  ${
                    currentStep === step
                      ? "bg-rgtpurpleaccent2 text-white font-bold"
                      : "text-gray-700"
                  }`}
              >
                {step}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={currentStep === totalSteps}
        className="text-rgtpurpleaccent2 font-bold cursor-pointer"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default StepProgress;
