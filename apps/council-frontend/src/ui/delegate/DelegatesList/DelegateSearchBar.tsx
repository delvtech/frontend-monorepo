import { ChangeEventHandler, ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import TextInput from "src/ui/base/Input/TextInput";
import { t } from "ttag";

interface DelegateSearchBarProps {
  onInputChange: (value: string) => void;
  value: string;
}

function DelegateSearchBar({
  onInputChange,
  value,
}: DelegateSearchBarProps): ReactElement {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onInputChange(event.target.value);
  };

  const handleClearInput = () => {
    onInputChange("");
  };

  return (
    <Card
      variant={CardVariant.WHITE}
      className="mb-6 flex flex-col justify-center"
    >
      <H2 className="mb-2 text-principalRoyalBlue">{t`Search delegates`}</H2>

      <div className="relative">
        <TextInput
          screenReaderLabel={t`Search delegate address`}
          id="delegate-search-address"
          name={t`Search delegate address`}
          placeholder={t`Enter ENS or address`}
          value={value}
          onChange={handleInputChange}
          spellCheck={false}
          autoComplete="off"
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-principalRoyalBlue px-2 py-1 text-xs uppercase text-white hover:bg-brandDarkBlue-dark focus:outline-none focus:ring-2 focus:ring-brandDarkBlue focus:ring-offset-2"
          onClick={handleClearInput}
        >
          {t`clear`}
        </button>
      </div>
    </Card>
  );
}

export default DelegateSearchBar;
