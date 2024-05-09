import React, { ReactElement, useEffect, useState } from "react";
import { t } from "ttag";
import { AnchorButton, Button, Dialog, Intent } from "@blueprintjs/core";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import classNames from "classnames";
import { IconNames } from "@blueprintjs/icons";

export const TOS_LOCAL_KEY = "Element-TOS-Acceptance";

const isTermsAccepted = () => {
  return localStorage?.getItem(TOS_LOCAL_KEY);
};

const setAcceptedTOS = () => {
  localStorage?.setItem(TOS_LOCAL_KEY, "true");
};

export const TOS_URL =
  "https://example.s3.us-east-2.amazonaws.com/example-terms-of-service.pdf";

export const TermsBanner = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const { darkModeClassName } = useDarkMode();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOpen(!isTermsAccepted());
    }
  }, []);

  if (!open) {
    return <> </>;
  }

  return (
    <Dialog
      className={classNames(darkModeClassName, "space-y-4")}
      isOpen
      isCloseButtonShown={false}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      title={t`Element.fi Terms and Conditions`}
    >
      <div className="space-y-4 px-4">
        <p>
          {t`Element Finance, Inc. is committed to building an open, compliant,
          responsible system. We believe in building products for a healthy
          ecosystem. Although we don't control the Protocol, which is open
          source, this UI employs a series of compliance filters and internal
          controls. Element Finance maintains no control or custody of user
          funds.`}
        </p>
        <p>
          {t`By clicking "Certify and Accept Terms", you represent and warrant that you (and any person on behalf of whom you are using Element’s platform/services) are:`}
        </p>
        <ol className="list-inside list-decimal space-y-4">
          <li>{t`NOT identified on any list of sanctioned parties such as, for example, the lists maintained by the United Nations Security Council, the U.S. government (including the U.S. Treasury Department's Specially Designated Nationals (SDN) list, Foreign Sanctions Evaders list, the Sectoral Sanctions Identification List, the Non-SDN Menu Based Sanctions List), the European Union (EU) or its member states, and the government of your or such person’s home country if you or any such person is located outside the U.S. and EU;`}</li>
          <li>{t`NOT located, ordinarily resident, organized, established, or domiciled in Cuba, Iran, North Korea, Syria, the Crimea region (including Sevastopol), or the self-proclaimed Donetsk People’s Republic or Luhansk People’s Republic regions;`}</li>
          <li>{t`NOT owned or controlled by, or acting on behalf of, a person, an entity or the government of a country/territory identified in (2) or (3) above or the Government of Venezuela (including any of its agencies, instrumentalities or entities owned or controlled by it); and`}</li>
          <li>{t`NOT directly or indirectly using any funds derived from, or otherwise representing the proceeds of, any illegal activities, to conduct activities on Element’s platform or use Element’s services.`}</li>
        </ol>
        <p>{t`Continued use of this service constitutes acceptance of our Terms of Service
       and Privacy Policy.`}</p>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          intent={Intent.PRIMARY}
          onClick={() => {
            setAcceptedTOS();
            setOpen(false);
          }}
        >
          {t`Certify and Accept Terms`}
        </Button>

        <AnchorButton
          target="_blank"
          icon={IconNames.SHARE}
          rel="noreferrer"
          href={TOS_URL}
          className="hover:no-underline"
        >
          {t`Terms of Service`}
        </AnchorButton>
      </div>
    </Dialog>
  );
};
