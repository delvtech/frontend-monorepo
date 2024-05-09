import toast from "react-hot-toast";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";

const TOAST_HASH = "tos-and-privacy-policy";
export function makeTOSAndPrivacyPolicyToast({
  onAgreeClick,
}: {
  onAgreeClick: () => void;
}): void {
  toast(
    <div className="flex w-full flex-col items-center justify-between gap-2">
      <div className="text-center">
        <h3 className="font-bold">Element.fi Terms of Service</h3>
        <span className="text-xs">Certify and accept terms</span>
      </div>
      <div className="flex gap-2">
        <AnchorButton
          variant={ButtonVariant.MINIMAL}
          className="text-center"
          href="https://example.s3.us-east-2.amazonaws.com/example-terms-of-service-02-03-2023.pdf"
        >
          Terms of Service
        </AnchorButton>
        <AnchorButton
          variant={ButtonVariant.MINIMAL}
          className="text-center"
          href="https://example.s3.us-east-2.amazonaws.com/example-privacy-policy-02-03-23.pdf"
        >
          Privacy Policy
        </AnchorButton>
      </div>
      <Button
        variant={ButtonVariant.GRADIENT}
        onClick={() => {
          onAgreeClick();
          toast.dismiss(TOAST_HASH);
        }}
      >
        I Agree
      </Button>
    </div>,
    {
      id: TOAST_HASH,
      // It might be useful to keep the etherscan link around to investigate the
      // error until explicitly dismissed.
      duration: Infinity,
      position: "bottom-center",
      style: { minWidth: "320px" },
    },
  );
}
