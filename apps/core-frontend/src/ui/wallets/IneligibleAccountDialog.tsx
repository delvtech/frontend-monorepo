import { Callout, Dialog } from "@blueprintjs/core";
import classNames from "classnames";
import { CSSProperties, ReactElement } from "react";
import { useMedia } from "react-use";
import { jt, t } from "ttag";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";

const smallScreenStyle: CSSProperties = {
  margin: 0,
  height: "100vh",
  width: "100vw",
};

interface IneligibleWalletDialogProps {
  isOpen: boolean;
}

const elementFinanceDiscordSupportChannelLink = (
  <a
    key="discord-support-channel-link"
    href="https://discord.gg/tmn6h3XFV8"
  >{t`Element Finance’s Discord #support channel`}</a>
);
export default function IneligibleAccountDialog({
  isOpen,
}: IneligibleWalletDialogProps): ReactElement {
  const { darkModeClassName } = useDarkMode();
  const isSmallScreen = useMedia("(max-width: 639px)");
  return (
    <Dialog
      isCloseButtonShown={false}
      style={isSmallScreen ? smallScreenStyle : undefined}
      className={classNames(darkModeClassName, "pb-0", "overflow-auto")}
      isOpen={isOpen}
      title={
        <span className="py-6 text-center text-base">{t`Ineligible Account`}</span>
      }
    >
      <div className="p-5">
        <Callout intent="danger">
          <p>{t`This account is not eligible to use this website.`}</p>
          <p>{t` In many cases, our compliance
          filters prohibit certain wallet addresses, individuals, or jurisdictions from using this
          UI.`}</p>
          <p>{t`Please note that Element Finance, Inc. does not control access to the Element
          Protocol, and does not hold or maintain custody of user funds. In some instances, the
          filter may be temporary pending further review.`}</p>
          <p>{jt`For further information or questions,
          please contact ${elementFinanceDiscordSupportChannelLink}, and provide the relevant
          transaction date/time and wallet address.`}</p>
        </Callout>
      </div>
    </Dialog>
  );
}
