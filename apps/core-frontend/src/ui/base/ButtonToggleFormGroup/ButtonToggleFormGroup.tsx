import React, { ReactElement } from "react";

import { Alignment, Button, FormGroup, Intent } from "@blueprintjs/core";

import tw from "efi-tailwindcss-classnames";
import { FormGroupLabel } from "ui/base/FormGroupLabel/FormGroupLabel";

interface ButtonToggleFormGroupProps {
  label: string;
  tooltipContent: string | JSX.Element;
  buttons: ButtonToggleFormGroupButton[];
  selectedButtonId: string;

  onSelect: (buttonId: string) => void;
}
interface ButtonToggleFormGroupButton {
  id: string;
  text: string;
}

export function ButtonToggleFormGroup({
  label,
  tooltipContent,
  buttons,
  selectedButtonId,
  onSelect,
}: ButtonToggleFormGroupProps): ReactElement {
  return (
    <FormGroup
      className={tw("space-y-2")}
      contentClassName={tw("space-x-4")}
      label={
        <FormGroupLabel
          large
          alignIndicator={Alignment.RIGHT}
          label={label}
          tooltipContent={tooltipContent}
        />
      }
    >
      {buttons.map(({ id, text }) => (
        <Button
          key={id}
          large
          outlined
          intent={id === selectedButtonId ? Intent.PRIMARY : Intent.NONE}
          active={id === selectedButtonId}
          onClick={() => {
            onSelect(id);
          }}
        >
          {text}
        </Button>
      ))}
    </FormGroup>
  );
}
