import React, { createContext, useContext, useState, useEffect } from "react";

type OnboardingData = {
  // Step 1 - Company/Individual Info
  isCompany?: boolean | null;
  companyName?: string;
  linkedIn?: string;
  website?: string;
  twitter?: string;
  name?: string;
  portfolio?: string;
  
  // Step 2 - Fields/Industries
  selectedFields?: string[];
  fieldsSubmitted?: boolean;
  
  // Step 3 - Workflow Steps
  fieldSteps?: Record<string, string[]>;
  workflowSubmitted?: boolean;
  
  // Step 4 - AI Agent Testing
//   agentType?: string;
//   testPrompt?: string;
//   testResult?: string;
//   testCompleted?: boolean;
};

type OnboardingContextType = {
  data: OnboardingData;
  setData: (data: Partial<OnboardingData>) => void;
  clearData: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = "onboardingData";

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setDataState] = useState<OnboardingData>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        setDataState(parsedData);
        console.log("Loaded data from localStorage:", parsedData);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("Saved data to localStorage:", data);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [data]);

  const setData = (newData: Partial<OnboardingData>) => {
    setDataState((prev) => {
      const updated = { ...prev, ...newData };
      return updated;
    });
  };

  const clearData = () => {
    setDataState({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <OnboardingContext.Provider value={{ data, setData, clearData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
