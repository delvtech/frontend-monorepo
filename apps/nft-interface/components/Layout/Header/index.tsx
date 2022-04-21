import { SectionContainer } from "common/Container";
import { Flex, HeaderWrapper } from "common/Container/styles";
import { ExternalLink } from "common/ExternalLink";
import { InternalLink } from "common/InternalLink";
import { Spacer } from "common/Spacer";
import { BurgerMenu } from "components/Layout/Header/BurgerMenu";
import {
  FixedHeader,
  MenuItemContainer,
  MenuItemWrapper,
  MobileMenuContainer,
  SVGContainer,
} from "components/Layout/Header/styles";
import { ConnectWalletNavButton } from "components/Wallet/ConnectWalletNavButton";
import { COLOR_WHITE } from "helpers/colorPalette";
import React, { useState } from "react";
import { ReactElement } from "react";
import { isFeatureEnabled } from "src/features";
import { DISCORD_URL, TWITTER_URL } from "src/urls";

export const MenuItem: React.FC<{
  onClose?: () => void;
}> = ({ onClose }) => {
  return (
    <MenuItemWrapper onClick={onClose}>
      <InternalLink href="/home">Home</InternalLink>
      <InternalLink href="/formation">Formation</InternalLink>
      <InternalLink href="/mint">Minting</InternalLink>
      <InternalLink href="/rollout-release">The Rollout Release</InternalLink>
      {!isFeatureEnabled("preLaunch") && (
        <InternalLink href="/collection">The Collection</InternalLink>
      )}
    </MenuItemWrapper>
  );
};

export const SocialLinks = (): ReactElement => (
  <SVGContainer>
    <ExternalLink noUnderline href={TWITTER_URL}>
      <svg
        width="25"
        height="21"
        viewBox="0 0 25 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.263 2.84428C24.1397 2.87851 24.0165 2.91039 23.8933 2.94008C23.1399 3.12097 23.0706 2.88227 23.6161 2.35565C23.8603 2.11966 24.0762 1.863 24.2636 1.58578C24.6838 0.964139 24.3193 0.693043 23.6045 0.983422C23.3496 1.08701 23.0904 1.18093 22.8276 1.26466C22.0911 1.49986 21.0459 1.14507 20.3896 0.749274C19.5611 0.249671 18.6195 0 17.5646 0C16.0868 0 14.8272 0.495581 13.7851 1.48596C12.7434 2.47685 12.2222 3.67492 12.2222 5.07977C12.2222 5.2719 12.2337 5.46695 12.2565 5.66472C12.294 5.98663 11.7238 6.21999 10.9544 6.11667C9.29014 5.89323 7.70888 5.4137 6.21035 4.67859C4.72418 3.94965 3.41252 3.03234 2.2756 1.92662C1.73213 1.39815 0.997094 1.44367 0.794172 2.15705C0.672593 2.58468 0.612126 3.02941 0.612126 3.49132C0.612126 4.3618 0.827095 5.16914 1.25713 5.91334C1.47099 6.2837 1.72146 6.61898 2.00908 6.91898C2.49287 7.42396 2.41884 7.71696 1.74542 7.53743C1.07228 7.35789 0.578972 7.09134 0.578972 7.10874C0.578972 7.12615 0.578972 7.14031 0.578972 7.14031C0.578972 8.36672 0.983943 9.44432 1.79439 10.3721C2.29362 10.9437 2.87361 11.3852 3.5341 11.6962C4.2306 12.0242 4.55506 12.2072 4.16558 12.2551C3.93061 12.284 3.69421 12.2985 3.45644 12.2985C3.2955 12.2985 3.12665 12.2915 2.95049 12.2774C2.67188 12.2549 2.6218 12.8069 3.0442 13.4272C3.37992 13.9202 3.80963 14.3539 4.3331 14.7286C4.86553 15.1099 5.43935 15.3836 6.05364 15.5504C6.80109 15.7529 6.95108 16.122 6.28466 16.502C4.63557 17.4429 2.81061 17.9133 0.810036 17.9133C0.584628 17.9133 0.369612 17.9085 0.164207 17.8991C-0.192343 17.8828 0.0468591 18.1814 0.735176 18.5242C2.88602 19.5954 5.21528 20.1306 7.72327 20.1306C9.61947 20.1306 11.4002 19.8451 13.0654 19.2737C14.7299 18.7024 16.1525 17.9368 17.3322 16.9775C18.5118 16.0181 19.5292 14.9148 20.3838 13.667C21.2382 12.4192 21.8748 11.1165 22.2941 9.75901C22.7128 8.40122 22.9225 7.04075 22.9225 5.67762C22.9225 5.5548 22.9214 5.44452 22.9194 5.34741C22.9154 5.1649 23.4231 4.67089 23.9899 4.16543C24.2457 3.93719 24.4897 3.69766 24.7227 3.44642C25.2367 2.89163 25.0091 2.63741 24.263 2.84428Z"
          fill={COLOR_WHITE}
        />
      </svg>
    </ExternalLink>
    <ExternalLink noUnderline href={DISCORD_URL}>
      <svg
        width="29"
        height="21"
        viewBox="0 0 29 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.3373 1.74267C22.4776 0.928557 20.489 0.336897 18.41 0C18.1547 0.43189 17.8564 1.01279 17.6508 1.4749C15.4408 1.16394 13.2511 1.16394 11.0817 1.4749C10.8761 1.01279 10.571 0.43189 10.3134 0C8.23221 0.336897 6.24138 0.930731 4.38161 1.74698C0.630443 7.05048 -0.386437 12.2222 0.122004 17.3206C2.60997 19.0589 5.02112 20.1149 7.39157 20.8059C7.97685 20.0522 8.49884 19.2511 8.94852 18.4068C8.09208 18.1023 7.2718 17.7266 6.49674 17.2904C6.70236 17.1478 6.90349 16.9988 7.09781 16.8455C11.8252 18.9142 16.9616 18.9142 21.6324 16.8455C21.829 16.9988 22.0301 17.1478 22.2335 17.2904C21.4562 17.7287 20.6336 18.1044 19.7772 18.4089C20.2269 19.2511 20.7466 20.0544 21.3341 20.808C23.7069 20.117 26.1203 19.0611 28.6082 17.3206C29.2048 11.4103 27.5891 6.28604 24.3373 1.74267ZM9.59256 14.1852C8.17345 14.1852 7.00967 12.9456 7.00967 11.4362C7.00967 9.9268 8.1486 8.68514 9.59256 8.68514C11.0366 8.68514 12.2003 9.92462 12.1754 11.4362C12.1777 12.9456 11.0366 14.1852 9.59256 14.1852ZM19.1377 14.1852C17.7186 14.1852 16.5548 12.9456 16.5548 11.4362C16.5548 9.9268 17.6937 8.68514 19.1377 8.68514C20.5816 8.68514 21.7454 9.92462 21.7206 11.4362C21.7206 12.9456 20.5816 14.1852 19.1377 14.1852Z"
          fill={COLOR_WHITE}
        />
      </svg>
    </ExternalLink>
  </SVGContainer>
);

export const Header: React.FC = () => {
  const [sidebarVisibility, setSidebarVisibility] = useState<boolean>(false);

  const ConnectWallet = React.memo(ConnectWalletNavButton);

  return (
    <FixedHeader>
      <SectionContainer>
        <HeaderWrapper>
          <Flex>
            <MenuItemContainer>
              <MenuItem />
            </MenuItemContainer>
            <MenuItemContainer>
              <ConnectWallet />
              <Spacer size="20px" />
              <SocialLinks />
            </MenuItemContainer>
            <MobileMenuContainer>
              <div />
              <BurgerMenu
                sidebarVisibility={sidebarVisibility}
                setSidebarVisibility={setSidebarVisibility}
                changeSidebarVisibility={() =>
                  setSidebarVisibility(!sidebarVisibility)
                }
              />
              <ConnectWallet />
            </MobileMenuContainer>
          </Flex>
        </HeaderWrapper>
      </SectionContainer>
    </FixedHeader>
  );
};
