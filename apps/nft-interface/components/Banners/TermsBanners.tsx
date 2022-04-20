import { COLORS } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import Image from "next/image";
import Close from "public/assets/svg/close.svg";
import Logo from "public/assets/svg/element.svg";
import React, { useEffect, useState } from "react";
import { TOS_LOCAL_KEY } from "src/constants";
import { PRIVACY_POLICY_URL, TOS_URL } from "src/urls";
import styled from "styled-components";

export const TermsBanner: React.FC = () => {
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
    <Container>
      <LogoContainer>
        <Image src={Logo} height={100} width={100} alt="logo" />
      </LogoContainer>
      <ChildrenContainer>
        <SummaryContainer>
          <Rubik>
            Continued use of this service constitutes acceptance of our{" "}
            <InlineLink
              href={TOS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </InlineLink>{" "}
            and{" "}
            <InlineLink
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </InlineLink>
            .
          </Rubik>
        </SummaryContainer>
        <PrimaryButton
          onClick={() => {
            setAcceptedTOS();
            setOpen(false);
          }}
        >
          Accept Terms
        </PrimaryButton>
        <SecondaryButton onClick={() => setOpen(false)}>
          <InlineLink href={TOS_URL} target="_blank" rel="noopener noreferrer">
            Learn More
          </InlineLink>{" "}
        </SecondaryButton>
      </ChildrenContainer>
      <CloseContainer>
        <Image src={Close} height={16} width={16} alt="logo banner button" />
      </CloseContainer>
    </Container>
  );
};

const isTermsAccepted = () => {
  return localStorage?.getItem(TOS_LOCAL_KEY);
};

const setAcceptedTOS = () => {
  localStorage?.setItem(TOS_LOCAL_KEY, "true");
};

const Rubik = styled.text`
  font-family: Rubik;
  font-size: 14px;
`;

const InlineLink = styled.a`
  font-family: Rubik;
  font-size: 14px;
  display: inline;

  color: ${COLORS.greenLight};
`;

const PrimaryButton = styled.button`
  padding: 14px 18px;
  background-color: ${COLORS.white};
  color: ${COLORS.black};
  border-radius: 56px;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;

  margin-left: 20px;
  margin-right: 20px;
  @media ${devices.tabletM} {
    font-size: 12px;
  }

  @media ${devices.mobileL} {
    margin-left: 0;
    margin-bottom: 10px;
    margin-right: 0px;
  }

  &:hover {
    background-color: ${COLORS.greenLight};
  }
`;

const SecondaryButton = styled.button`
  padding: 14px 18px;
  background-color: ${COLORS.jade};
  color: ${COLORS.white};
  border-radius: 56px;
  font-size: 14px;
  white-space: nowrap;

  margin-right: 30px;

  @media ${devices.tabletM} {
    font-size: 12px;
  }

  @media ${devices.mobileL} {
    margin-right: 0;
  }

  &:hover {
    background-color: #e5aca3;
    opacity: .4
    color: ${COLORS.black};
  }
`;

const SummaryContainer = styled.div`
  max-width: 50%;
  margin-right: auto;

  @media ${devices.mobileL} {
    margin-right: 0;
    max-width: 80%;
    margin-bottom: 10px;
  }
`;

const LogoContainer = styled.div`
  margin-top: 25px;
  margin-left: -15px;
  min-width: fit-content;

  @media ${devices.tabletM} {
    display: none;
    margin-top: 25px;
    margin-left: -15px;
  }
`;

const CloseContainer = styled.button`
  position: absolute;
  top: 14px;
  right: 18px;

  background: none;
  padding: 0;
`;

const ChildrenContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  margin-left: 25px;
  margin-right: 20px;

  @media ${devices.tabletM} {
    padding: 30px;
    margin-right: 0px;
  }

  @media ${devices.mobileL} {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    padding: 15px;
    margin-left: 0;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  background-color: red;

  position: sticky;
  margin: auto;
  top: 84%;
  z-index: 2;

  max-width: 80%;
  min-width: 320px;

  border-radius: 20px;
  border-color: ${COLORS.grayLight};
  border-width: 1px;

  background-color: ${COLORS.black};

  @media ${devices.tabletM} {
    top: 84%;
    max-width: 100%;
    margin: 0px 20px;
  }

  @media ${devices.mobileL} {
    top: 76%;
    max-width: 100%;
  }
  animation: fadeIn ease-in 500ms;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
