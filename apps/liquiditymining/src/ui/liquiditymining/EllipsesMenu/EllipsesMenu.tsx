/* This example requires Tailwind CSS v2.0+ */
import { ReactElement } from "react";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { t } from "ttag";

export default function EllipseMenu(): ReactElement {
  return (
    <Menu>
      <Menu.Items>
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <a
                href="https://www.element.fi/"
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm",
                )}
              >
                {t`Stake`}
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="https://www.element.fi/"
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "block px-4 py-2 text-sm",
                )}
              >
                {t`Unstake`}
              </a>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
