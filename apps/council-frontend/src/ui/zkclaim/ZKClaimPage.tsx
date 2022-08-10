import React, { ReactElement, useEffect, useState } from "react";
import { Signer } from "ethers";
import Head from "next/head";
import { useAccount, useSigner } from "wagmi";
import { t } from "ttag";

import LookupCard from "./LookupCard";
import EligibleCard from "./EligibleCard";
import AlreadyClaimedCard from "./AlreadyClaimedCard";
import NoPassCard from "./NoPassCard";
import NotEligibleCard from "./NotEligibleCard";
import DelegateInfoCard from "./DelegateInfoCard";
import ChooseDelegateCard from "./ChooseDelegateCard";
import TransactionCard from "./TransactionCard";
import ShareCard from "./ShareCard";
import useAddressScreening from "./useAddressScreening";
import useZKProof from "./useZKProof";
import useRouterSteps, { StepStatus } from "src/ui/router/useRouterSteps";
import { ElementLogo } from "src/ui/base/svg/ElementLogo/ElementLogo";
import {
  StepItem,
  StepStatus as StepItemStatus,
} from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import Steps from "src/ui/base/Steps/Steps";
import useAlreadyClaimed from "./useAlreadyClaimed";
import { defaultProvider } from "src/providers/providers";

export enum Step {
  LOOKUP = "lookup",
  ELIGIBILITY = "eligibility",
  DELEGATE_INFO = "info",
  DELEGATE = "delegate",
  TRANSACTION = "transaction",
  SHARE = "share",
}

const provider = defaultProvider;

export default function ZKClaimPage(): ReactElement {
  const { address } = useAccount();
  const { data } = useSigner();
  const signer = data as Signer | undefined;

  const [keySecretPair, setKeySecretPair] = useState<[string, string]>();
  const key = keySecretPair?.[0];
  const secret = keySecretPair?.[1];
  const [delegateAddress, setDelegateAddress] = useState<string>();
  const {
    generate: generateProof,
    isEligible,
    isReady,
    contract,
  } = useZKProof({
    key,
    secret,
    account: address || undefined,
  });
  const alreadyClaimed = useAlreadyClaimed(key, contract);
  const { pass } = useAddressScreening(address);

  const {
    canViewStep,
    currentStep,
    getStepNumber,
    getStepPath,
    getStepStatus,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  } = useRouterSteps({
    steps: [
      Step.LOOKUP,
      Step.ELIGIBILITY,
      Step.DELEGATE_INFO,
      Step.DELEGATE,
      Step.TRANSACTION,
      Step.SHARE,
    ],
  });

  // TODO: transition styles
  const getStepClassName = (step: Step) => {
    switch (getStepStatus(step)) {
      case StepStatus.CURRENT:
        return "block";
      default:
        return "hidden";
    }
  };

  const getStepItemStatus = (steps: Step[]): StepItemStatus => {
    const statuses = steps.map((step) => getStepStatus(step));
    if (statuses.includes(StepStatus.CURRENT)) {
      return StepItemStatus.CURRENT;
    }
    if (statuses.includes(StepStatus.PENDING)) {
      return StepItemStatus.PENDING;
    }
    return StepItemStatus.COMPLETE;
  };

  // return to the eligibility step after screening the address if they're on
  // a later step
  useEffect(() => {
    const isPastEligibility =
      getStepNumber(currentStep) > getStepNumber(Step.ELIGIBILITY);
    if (pass === false && isPastEligibility) {
      goToStep(Step.ELIGIBILITY);
    }
  }, [pass, getStepNumber, currentStep, goToStep]);

  return (
    <div className="flex max-w-4xl flex-1 flex-col items-center gap-6">
      <Head>
        <title>{t`ZK Airdrop Claim | Element Council Protocol`}</title>
      </Head>

      <div style={{ width: 600, maxWidth: "100%" }}>
        <Steps className="w-full">
          <StepItem
            stepLabel="1"
            status={getStepItemStatus([Step.LOOKUP, Step.ELIGIBILITY])}
            href={getStepPath(Step.LOOKUP)}
          >{t`View Airdrop`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="2"
            status={getStepItemStatus([Step.DELEGATE_INFO, Step.DELEGATE])}
            href={
              canViewStep(Step.DELEGATE_INFO)
                ? getStepPath(Step.DELEGATE_INFO)
                : undefined
            }
          >{t`Choose Delegate`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="3"
            status={getStepItemStatus([Step.TRANSACTION])}
            href={
              canViewStep(Step.TRANSACTION)
                ? getStepPath(Step.TRANSACTION)
                : undefined
            }
          >{t`Review Transaction`}</StepItem>
        </Steps>
      </div>

      {/* Lookup */}
      <LookupCard
        className={getStepClassName(Step.LOOKUP)}
        onChange={setKeySecretPair}
        onNextStep={goToNextStep}
      />

      {/* Eligibility */}
      {pass === false ? (
        <NoPassCard
          className={getStepClassName(Step.ELIGIBILITY)}
          onPreviousStep={goToPreviousStep}
        />
      ) : !isEligible ? (
        <NotEligibleCard
          className={getStepClassName(Step.ELIGIBILITY)}
          onTryAgain={goToPreviousStep}
        />
      ) : alreadyClaimed ? (
        <AlreadyClaimedCard
          className={getStepClassName(Step.ELIGIBILITY)}
          contract={contract}
        />
      ) : (
        <EligibleCard
          className={getStepClassName(Step.ELIGIBILITY)}
          onPreviousStep={goToPreviousStep}
          onNextStep={goToNextStep}
          contract={contract}
        />
      )}

      {/* Delegation Information */}
      <DelegateInfoCard
        className={getStepClassName(Step.DELEGATE_INFO)}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
      />

      {/* Delegate */}
      <ChooseDelegateCard
        account={address as string}
        provider={provider}
        className={getStepClassName(Step.DELEGATE)}
        onChooseDelegate={setDelegateAddress}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
      />

      {/* Review & Initiate Transaction */}
      {delegateAddress && (
        <TransactionCard
          className={getStepClassName(Step.TRANSACTION)}
          provider={provider}
          account={address}
          signer={signer}
          isReady={isReady}
          contract={contract}
          generateProof={generateProof}
          nullifier={key}
          delegateAddress={delegateAddress}
          onPreviousStep={goToPreviousStep}
          onSuccess={goToNextStep}
          onNextStep={goToNextStep}
        />
      )}

      {/* Share */}
      <ShareCard className={getStepClassName(Step.SHARE)} />

      <div className="mt-auto flex flex-1 flex-col items-center text-principalRoyalBlue">
        <span className="text-sm">{t`Powered by`}</span>
        <ElementLogo height={"40"} />
      </div>
    </div>
  );
}
