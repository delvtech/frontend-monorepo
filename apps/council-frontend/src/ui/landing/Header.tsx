import {
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  MouseEvent,
} from "react";
import ElementUrl from "src/urls";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { t } from "ttag";
import { Popover } from "@headlessui/react";
import classNames from "classnames";
import usePopperWithRefs from "src/ui/base/usePopperWithRefs";

export default function Header(): ReactElement {
  const {
    setReferenceElement,
    setPopperElement,
    styles: { popper: menuPopperStyles },
    attributes: { popper: menuPopperProps },
  } = usePopperWithRefs({
    placement: "bottom-end",
  });
  return (
    <header className="relative z-10 mb-2 flex items-center justify-end py-6 lg:pt-16 xl:py-16">
      <Popover className="flex items-center gap-5">
        {({ open }) => (
          <>
            {/*
              Set to invisible and aria-hidden true rather than display
              none or unmounting to prevent the header height from
              collapsing.
            */}
            <LinkButton
              variant={ButtonVariant.REWARD}
              link="/"
              className={open ? "invisible" : undefined}
              aria-hidden={open}
            >{t`Open Governance App`}</LinkButton>
            <div>
              <div ref={setReferenceElement}></div>
              <Popover.Button
                title={t`open menu`}
                className={classNames(
                  "rounded-lg p-2 hover:bg-white/10",
                  open && "invisible",
                )}
                aria-hidden={open}
              >
                <MenuIcon className="h-8 w-8" />
              </Popover.Button>
            </div>
            {/* full screen menu for smaller screens */}
            <PopoverNavPanel
              ref={setPopperElement}
              className="bg-principalRoyalBlue !fixed !left-0 !bottom-[72px] flex !transform-none flex-col justify-center p-[10vw] text-center shadow-[0_4px_4px_#fff] lg:hidden"
              style={menuPopperStyles}
              popperProps={menuPopperProps}
              open={open}
            />
            {/* small menu */}
            <PopoverNavPanel
              ref={setPopperElement}
              className="bg-principalRoyalBlue -mt-2 -mr-2 hidden flex-col rounded-2xl px-9 pt-2 pb-9 shadow-[0_4px_4px_#fff] lg:flex"
              style={menuPopperStyles}
              popperProps={menuPopperProps}
              open={open}
            />
          </>
        )}
      </Popover>
    </header>
  );
}

interface PopoverNavPanelProps {
  className?: string;
  style: CSSProperties;
  popperProps: { [key: string]: string } | undefined;
  open: boolean;
}

const PopoverNavPanel = forwardRef<HTMLDivElement, PopoverNavPanelProps>(
  function Nav(
    { className, style, popperProps, open }: PopoverNavPanelProps,
    ref,
  ) {
    return (
      <Popover.Panel
        ref={ref}
        as="nav"
        className={className}
        style={style}
        {...popperProps}
        onMouseDown={(evt: MouseEvent) => {
          evt.preventDefault();
          evt.stopPropagation();
        }}
      >
        <Popover.Button
          title="close menu"
          className="fixed top-6 right-[4vw] rounded-lg p-3 hover:bg-white/10 lg:static lg:-mr-7 lg:ml-auto"
        >
          <XIcon className="h-6 w-6" />
        </Popover.Button>
        <ul className="mb-5 w-0 min-w-full lg:mb-0">
          <MenuLink href={ElementUrl.CORE_APP}>{t`Main App`}</MenuLink>
          <MenuLink href={ElementUrl.DOCS}>{t`Docs and Guides`}</MenuLink>
        </ul>
        <LinkButton
          variant={ButtonVariant.REWARD}
          link="/"
          className="my-3 justify-center lg:justify-start"
          aria-hidden={open}
        >{t`Open Governance App`}</LinkButton>
      </Popover.Panel>
    );
  },
);

function MenuLink({
  href,
  children,
}: PropsWithChildren<{
  href: string;
}>) {
  return (
    <li>
      <a
        href={href}
        className="hover:text-principalBlue focus:text-principalBlue block py-4 text-xl leading-6 lg:py-2"
      >
        {children}
      </a>
    </li>
  );
}
