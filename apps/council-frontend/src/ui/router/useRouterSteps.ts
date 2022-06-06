import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useParams } from "src/ui/router/useParams";

export enum StepStatus {
  COMPLETE,
  CURRENT,
  PENDING,
}

interface UseRouterStepsOptions<Step> {
  paramName?: string;
  steps?: Step[];
  initialCompleted?: number;
}

// Step numbers are 1-indexed. They do not start at 0.
export default function useRouterSteps<Step = number>(
  options?: UseRouterStepsOptions<Step>,
): {
  canViewStep: (step: number | Step) => boolean;
  completedSteps: number;
  completeStep: (step: number | Step) => void;
  currentStep: Step;
  getStepNumber: (step: number | Step) => number;
  getStepPath: (step: number | Step) => string;
  getStepStatus: (step: number | Step) => StepStatus;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number | Step) => void;
  setCompletedSteps: Dispatch<SetStateAction<number>>;
} {
  // using useRef to ensure these value never trigger rerenders when changed
  const {
    paramName = "step",
    initialCompleted = 0,
    steps,
  } = useRef<UseRouterStepsOptions<Step>>(options || {}).current;

  const { pathname, push, replace } = useRouter();
  const { [paramName]: paramStep } = useParams();

  // use these methods in dependency arrays
  const staticRouterMethods = useRef({ safePush: push, safeReplace: replace });
  const { safePush, safeReplace } = staticRouterMethods.current;

  const [completedSteps, setCompletedSteps] = useState(initialCompleted);

  const currentStep = useMemo(() => {
    if (steps) {
      return (paramStep as unknown as Step) || steps[0];
    }
    return (paramStep ? parseInt(paramStep) : 1) as unknown as Step;
  }, [paramStep, steps]);

  const getStepNumber = useCallback(
    (step: number | Step) => {
      if (typeof step === "number") {
        return step;
      }
      if (steps) {
        return steps.indexOf(step) + 1;
      }
      return 0;
    },
    [steps],
  );

  const getStepPath = useCallback(
    (step: number | Step) => {
      const pathStart = `${pathname}?${paramName}=`;
      if (steps) {
        return `${pathStart}${
          typeof step === "number" ? steps[step - 1] : step
        }`;
      }
      return `${pathname}?${paramName}=${step}`;
    },
    [pathname, paramName, steps],
  );

  const getStepStatus = useCallback(
    (step: number | Step) => {
      if (getStepNumber(step) < getStepNumber(currentStep)) {
        return StepStatus.COMPLETE;
      }
      if (getStepNumber(step) > getStepNumber(currentStep)) {
        return StepStatus.PENDING;
      }
      return StepStatus.CURRENT;
    },
    [getStepNumber, currentStep],
  );

  // returns false if the step is one of the following:
  //   - 0 or less
  //   - greater than the step after the last completed one
  //   - isn't a number or in steps
  const canViewStep = useCallback(
    (step: number | Step) => {
      const stepNumber = getStepNumber(step);
      return stepNumber > 0 && stepNumber <= completedSteps + 1;
    },
    [getStepNumber, completedSteps],
  );

  const completeStep = useCallback(
    (step: number | Step) => {
      setCompletedSteps((completedSteps) =>
        Math.max(completedSteps, getStepNumber(step)),
      );
    },
    [getStepNumber],
  );

  const goToStep = useCallback(
    (step: number | Step) => {
      completeStep(getStepNumber(step) - 1);
      safePush(getStepPath(step));
    },
    [safePush, getStepPath, completeStep, getStepNumber],
  );

  const goToPreviousStep = useCallback(() => {
    goToStep(getStepNumber(currentStep) - 1);
  }, [goToStep, getStepNumber, currentStep]);

  const goToNextStep = useCallback(() => {
    goToStep(getStepNumber(currentStep) + 1);
  }, [goToStep, getStepNumber, currentStep]);

  useEffect(() => {
    if (!canViewStep(currentStep)) {
      // TODO: error notification?
      safeReplace(getStepPath(completedSteps + 1), undefined, {
        shallow: true,
      });
    }
  }, [
    paramStep,
    canViewStep,
    currentStep,
    safeReplace,
    getStepPath,
    completedSteps,
  ]);

  return {
    canViewStep,
    completedSteps,
    completeStep,
    currentStep,
    getStepNumber,
    getStepPath,
    getStepStatus,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    setCompletedSteps,
  };
}
