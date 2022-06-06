import React, { ReactElement } from "react";

import { t } from "ttag";

import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";

interface ChangeDelegateButtonProps {
  onDelegationClick: () => void;
  account: string | null | undefined;
  isLoading: boolean;
  isCurrentDelegate: boolean;
  disabled?: boolean;
}

export function ChangeDelegateButton({
  onDelegationClick,
  account,
  isLoading,
  isCurrentDelegate,
  disabled,
}: ChangeDelegateButtonProps): ReactElement {
  if (isCurrentDelegate) {
    // !font-bold because Tag has font-medium which has cascade priority over font-bold
    return (
      <Tag
        intent={Intent.SUCCESS}
        className="block w-full text-center !font-bold shadow"
      >
        {t`Delegated`}
      </Tag>
    );
  }

  return (
    <Button
      onClick={onDelegationClick}
      variant={ButtonVariant.GRADIENT}
      disabled={!account || isLoading || disabled}
      className="w-full justify-center"
      loading={isLoading}
    >
      {t`Delegate`}
    </Button>
  );
}
