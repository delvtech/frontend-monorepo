import React, { ReactElement } from "react";
import Head from "next/head";

export const documentTitlePrefix: string =
  process.env.NODE_ENV === "development" ? "(D)" : "";

interface TitleProps {
  text?: string;
}

export function Title({ text }: TitleProps): ReactElement {
  return (
    <Head>
      <title>
        {documentTitlePrefix}
        {text ?? "Element.fi"}
      </title>
    </Head>
  );
}
