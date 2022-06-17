import React, { ReactElement, useEffect, useState } from "react";
import { ElementMinLogo } from "ui/base/ElementMinLogo";
import { t } from "ttag";

export const TOS_LOCAL_KEY = "Element-TOS-Acceptance";

const isTermsAccepted = () => {
  return localStorage?.getItem(TOS_LOCAL_KEY);
};

const setAcceptedTOS = () => {
  localStorage?.setItem(TOS_LOCAL_KEY, "true");
};

export const TOS_URL =
  "https://elementfi.s3.us-east-2.amazonaws.com/element-finance-terms-of-service.pdf";

export const TermsBanner = (): ReactElement => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOpen(!isTermsAccepted());
    }
  }, []);

  if (!open) {
    return <> </>;
  }

  return (
    <div className="fixed bottom-0 z-10 mb-48 h-24 w-full sm:mb-24">
      <div className="m-auto mb-4 mx-4 flex max-w-3xl flex-col items-center justify-center rounded-lg border-2 border-white bg-gray-700 p-2 sm:m-auto sm:h-12 sm:min-w-min sm:flex-row sm:p-10">
        <ElementMinLogo
          className="mt-6 -ml-12 hidden sm:block"
          height={110}
          width={110}
        />
        <div className="mr-4 max-w-lg text-center text-xs leading-5">
          {t`Continued use of this service constitutes acceptance of our Terms of Service and Privacy Policy.`}
        </div>
        <button
          onClick={() => {
            setAcceptedTOS();
            setOpen(false);
          }}
          className="whitespace-no-wrap my-2 cursor-pointer rounded-3xl bg-blue-500 p-3 text-xs font-bold text-white hover:bg-blue-600 sm:my-0 sm:mr-4"
        >
          {t`Accept Terms`}
        </button>
        <a
          target="_blank"
          rel="noreferrer"
          href={TOS_URL}
          className="hover:no-underline"
        >
          <div className="whitespace-no-wrap cursor-pointer rounded-3xl bg-white p-3 text-xs font-bold text-blue-500 hover:bg-gray-300">
            {t`Learn More`}
          </div>
        </a>
      </div>
    </div>
  );
};
