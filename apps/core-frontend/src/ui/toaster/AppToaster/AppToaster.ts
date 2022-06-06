import {
  ActionProps,
  Classes,
  Intent,
  IToastProps,
  LinkProps,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { IconName, IconNames } from "@blueprintjs/icons";

/**
 * Create toasts in response to interactions.
 *
 * In most cases, it's enough to simply create and forget (thanks to timeout).
 *
 * Example:
 *
 * import { AppToaster } from 'ui/app/AppToaster';
 *
 * AppToaster?.show({ message: "Toasted." });
 */
export const AppToaster =
  typeof document !== "undefined"
    ? Toaster.create({
        position: Position.TOP,

        // TODO: Figure out a way to change this dynamically via user pref. Might need
        // to contribute a Toaster.setClassName() method back to Blueprint for this,
        // or have multiple toasters.
        className: Classes.DARK,
      })
    : null;
export function makeToast(
  message: string,
  action?: ActionProps & LinkProps,
): IToastProps {
  return {
    message,
    action,
  };
}

export function makeSuccessToast(
  message: string,
  action?: ActionProps & LinkProps,
  timeoutMs?: number,
): IToastProps {
  return {
    message,
    action,
    icon: IconNames.TICK,
    intent: Intent.SUCCESS,
    timeout: timeoutMs,
  };
}

export function makeErrorToast(
  message: string,
  icon?: IconName,
  action?: ActionProps & LinkProps,
  timeoutMs?: number,
): IToastProps {
  return {
    message,
    action,
    icon: icon || IconNames.ERROR,
    intent: Intent.DANGER,
    timeout: timeoutMs,
  };
}
