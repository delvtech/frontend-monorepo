import React, { ChangeEvent, ReactElement, useCallback } from "react";

import { Alignment, FormGroup, Icon, InputGroup } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import tw from "efi-tailwindcss-classnames";
import { FormGroupLabel } from "ui/base/FormGroupLabel/FormGroupLabel";

interface SearchFormGroupProps {
  label: string;
  placeholder?: string;
  tooltipContent?: string | JSX.Element;
  value: string;
  onChange: (value: string) => void;
}

export function SearchFormGroup({
  label,
  tooltipContent,
  value,
  onChange,
  placeholder,
}: SearchFormGroupProps): ReactElement {
  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );
  return (
    <FormGroup
      className={tw("space-y-2")}
      contentClassName={tw("space-x-4")}
      label={
        <FormGroupLabel
          large
          fill
          alignIndicator={Alignment.RIGHT}
          label={label}
          tooltipContent={tooltipContent}
        />
      }
    >
      <InputGroup
        large
        leftIcon={<Icon icon={IconNames.SEARCH} />}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      ></InputGroup>
    </FormGroup>
  );
}
