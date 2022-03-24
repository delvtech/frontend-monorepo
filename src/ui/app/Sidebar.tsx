import React, { Fragment, ReactElement, useCallback, useState } from "react";
import {
  MenuAlt4Icon,
  ExternalLinkIcon,
  XIcon,
  HomeIcon,
  PencilAltIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { t } from "ttag";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import ElementIcon from "src/ui/base/svg/ElementIcon/ElementIcon";
import { ButtonVariant } from "src/ui/base/Button/styles";
import ExternalUrls from "src/elf/urls";
import PoweredByCouncil from "src/ui/base/svg/PoweredByCouncil";

interface SidebarProps {
  account: string | null | undefined;
}

export default function Sidebar(props: SidebarProps): ReactElement {
  const { account } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Fragment>
      <button
        className="fixed top-0 left-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md p-0 hover:shadow md:hidden"
        onClick={onOpen}
      >
        <MenuAlt4Icon className="h-6 w-6" />
      </button>
      <div
        className={classNames(
          { "-translate-x-full": !isOpen },
          "fixed top-0 left-0 z-10 flex h-full w-full transform-gpu flex-col items-center justify-between bg-white py-14 transition-all duration-300 ease-in-out md:w-60 md:translate-x-0",
        )}
      >
        <div className="w-full">
          <div className="mt-1 flex justify-around py-3">
            <ElementIcon className="h-24 w-24" title="Element Finance" />
            <button
              onClick={onClose}
              className="absolute top-0 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md p-0 hover:shadow md:hidden"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-16 space-y-6">
            <SidebarLinkExternal
              link={ExternalUrls.GOVERNANCE_OVERVIEW}
              label={t`Overview`}
              icon={
                <HomeIcon className="h-4 w-4 flex-shrink-0 text-principalRoyalBlue" />
              }
            />
            <SidebarLinkExternal
              link={ExternalUrls.GOVERNANCE_PROPOSALS}
              label={t`Proposals`}
              icon={
                <PencilAltIcon className="h-4 w-4 flex-shrink-0 text-principalRoyalBlue" />
              }
            />
            <SidebarLinkExternal
              link={ExternalUrls.GOVERNANCE_DELEGATE}
              label={t`Delegate`}
              icon={
                <UserGroupIcon className="h-4 w-4 flex-shrink-0 text-principalRoyalBlue" />
              }
            />
            <SidebarLinkExternal link={ExternalUrls.FORUM} label={t`Forum`} />
            <SidebarLinkExternal
              link={ExternalUrls.DOCS}
              label={t`Resources`}
            />
          </div>
        </div>
        <PoweredByCouncil className="h-24 w-24" />
      </div>
    </Fragment>
  );
}

interface SidebarLinkExternalProps {
  link: string;
  label: string;
  icon?: ReactElement;
}

interface AirdropLinkProps {
  link: string;
}
function AirdropLink(props: AirdropLinkProps): ReactElement {
  const { link } = props;

  return (
    <div className="text-center">
      <Link href={link} passHref>
        <AnchorButton variant={ButtonVariant.GRADIENT}>
          {t`Claim ELFI`}
        </AnchorButton>
      </Link>
    </div>
  );
}

function SidebarLinkExternal(props: SidebarLinkExternalProps): ReactElement {
  const { link, label, icon } = props;
  return (
    <div className="flex justify-center ">
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center px-2  hover:bg-blue-50 md:w-[55%]"
      >
        {icon || (
          <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-principalRoyalBlue" />
        )}
        <div className="flex cursor-pointer justify-center p-3 text-brandDarkBlue-dark">
          <p>{label}</p>
        </div>
      </a>
    </div>
  );
}
