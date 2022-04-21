import { Dialog } from "common/Dialog";
import { DialogTitle } from "common/Dialog/styles";
import useAddressScreening from "hooks/useAddressScreening";
import useWeb3 from "hooks/useWeb3";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

export const IneligibleAccountDialog: React.FC = () => {
  const { account } = useWeb3();
  const { pass } = useAddressScreening(account);
  const router = useRouter();
  useEffect(() => {
    if (pass === false && router.route !== "/void") {
      router.replace("/void");
    }
  }, [pass, router]);
  return (
    <Dialog isOpen={pass === false}>
      <StyledContainer>
        <DialogTitle>Ineligible Account</DialogTitle>
        <p>This account is not eligible to use this website.</p>
      </StyledContainer>
    </Dialog>
  );
};

const StyledContainer = styled.div`
  padding: 0 20px 10px;
  text-align: center;
`;
