import { Button } from "@elementfi/component-library";
import React, { ReactElement } from "react";
import { t } from "ttag";
import { useAccount, useEnsName } from "wagmi";

import { TermCard } from "src/ui/overview/TermCard";
import { useFilteredTermsQuery } from "src/graphql/generated";

export function OverviewPage(): ReactElement {
  const { address: userAddress } = useAccount();
  const { data: ensName } = useEnsName({ address: userAddress });

  const { data } = useFilteredTermsQuery({
    variables: {
      holders: "",
    },
  });
  console.log("data", data);

  return (
    <div className="mx-16 flex w-full flex-1 gap-16">
      {/* Welcome and filters */}
      <div className="max-w-xs space-y-8">
        {/* TODO: Make H1 component */}
        <h1 className="text-xl font-bold">{t`Welcome ${ensName}`}</h1>
        <p>{t`Filtering through the following preferences to determine what yield rate products you’d like to see.`}</p>
        <div className="space-y-2">
          {/* TODO: Make H3 component */}
          <h3 className={"font-bold"}>{t`Filter Terms`}</h3>
          <div className="space-x-4">
            <Button onClick={() => {}} outline>{t`Marketplace`}</Button>
            <Button onClick={() => {}} outline>{t`My Portfolio`}</Button>
          </div>
        </div>
        <div className="space-y-2">
          {/* TODO: Make H3 component */}
          <h3 className={"font-bold"}>{t`Filter Asset`}</h3>
          {/* TODO: Make TextInput component */}
          <input placeholder="Search Asset"></input>
        </div>
        <div className="space-y-2">
          {/* TODO: Make H3 component */}
          <h3 className={"font-bold"}>{t`Filter Term Duration`}</h3>
          {/* TODO: Make TextInput component */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="small"
              outline
              onClick={() => {}}
            >{t`less than 3 months`}</Button>
            <Button
              size="small"
              outline
              onClick={() => {}}
            >{t`3 to 6 months`}</Button>
            <Button
              size="small"
              outline
              onClick={() => {}}
            >{t`6 to 12 months`}</Button>
            <Button
              size="small"
              outline
              onClick={() => {}}
            >{t`12 to 24 months`}</Button>
            <Button
              size="small"
              outline
              onClick={() => {}}
            >{t`24 to 36 months`}</Button>
          </div>
        </div>
        <div className="space-y-2">
          {/* TODO: Make H3 component */}
          <h3 className={"font-bold"}>{t`Filter Yield Source`}</h3>
          {/* TODO: Make TextInput component */}
          <div className="flex flex-wrap gap-2">
            <Button size="small" outline onClick={() => {}}>{t`Curve`}</Button>
            <Button
              size="small"
              outline
              onClick={() => {}}
            >{t`Compound`}</Button>
            <Button size="small" outline onClick={() => {}}>{t`Aave`}</Button>
            <Button size="small" outline onClick={() => {}}>{t`Yearn`}</Button>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="flex-[2]">
        <div className="mb-4 flex justify-between">
          {/* TODO: Make H2 component */}
          <h2 className="text-xl font-bold">{t`Most Popular Terms`}</h2>
          <Button outline onClick={() => {}}>{t`Rates low to high`}</Button>
        </div>

        <div className="flex flex-wrap gap-8">
          <TermCard />
          <TermCard />
          <TermCard />
          <TermCard />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
