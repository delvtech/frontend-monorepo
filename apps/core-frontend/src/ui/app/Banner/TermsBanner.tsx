import React, { ReactElement, useEffect, useState } from "react";
import { ElementMinLogo } from "ui/base/ElementMinLogo";
import { jt, t } from "ttag";
import { useIsTailwindSmallScreen } from "ui/base/mediaBreakpoints";

export const TOS_LOCAL_KEY = "Element-TOS-Acceptance";

const isTermsAccepted = () => {
  return localStorage?.getItem(TOS_LOCAL_KEY);
};

const setAcceptedTOS = () => {
  localStorage?.setItem(TOS_LOCAL_KEY, "true");
};

export const TOS_URL =
  "https://elementfi.s3.us-east-2.amazonaws.com/element-finance-terms-of-service.pdf";

const elementFinanceDiscordSupportChannelLink = (
  <a
    key="discord-support-channel-link"
    href="https://discord.gg/tmn6h3XFV8"
  >{t`here`}</a>
);
export const TermsBanner = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const isSm = useIsTailwindSmallScreen();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOpen(!isTermsAccepted());
    }
  }, []);

  if (!open) {
    return <> </>;
  }

  return (
    <div
      className="fixed bottom-0 z-10 mb-48 h-24 w-full"
      style={{
        // tailwind breakpoints in current version stop at 256px (mb-64) :(
        // this is a quick hackjob
        marginBottom: isSm ? 400 : 320,
      }}
    >
      <div
        className="sm:min-w-min m-auto mx-4 mb-4 flex max-w-3xl flex-col items-center justify-center 
      rounded-lg border-2 border-white bg-gray-700 p-2 sm:m-auto sm:flex-row sm:p-10"
      >
        <ElementMinLogo
          className="mt-6 -ml-12 hidden sm:block"
          height={110}
          width={110}
        />
        <div className="mr-4 max-w-lg text-xs">
          <p>
            {t`Element Finance, Inc. is committed to building an open, compliant, responsible system. 
          We believe in building products for a healthy ecosystem. Although we don’t control the 
          Protocol, which is open source, this UI employs a series of compliance filters and
           internal controls. Element Finance maintains no control or custody of user funds.`}
          </p>

          <p>{t`Because of regulatory events and guidance, some wallets and users may be permanently
           or temporarily restricted from use of this UI, consistent with our Terms of Service and
            relevant rules and laws. In some instances, the restriction will depend upon further
             review and analysis, which we will attempt to resolve as quickly as possible. 
             We've worked with our service providers to ensure that users who should not be 
             restricted are free to use our UI.`}</p>
          <p>{jt`If you think that you have been improperly restricted, please contact our 
          Discord Support channel ${elementFinanceDiscordSupportChannelLink}.`}</p>
          <p>{t`Continued use of this service constitutes acceptance of our Terms of Service
           and Privacy Policy.`}</p>
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
