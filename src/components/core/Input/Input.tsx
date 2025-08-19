import { cn } from "@/lib/utils";
import { RenderIf } from "../RenderIf";
import { Icon, IconifyIcon } from "@iconify-icon/react"
import { Description, Field, Input, Label } from "@headlessui/react";
import React, { type AllHTMLAttributes, forwardRef, Fragment, ReactNode } from "react";
import "./input.css";

interface InputProps extends AllHTMLAttributes<HTMLInputElement> {
  /**
   * Label for input element
   */
  label?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Helper text
   */
  help?: string | ReactNode;
  /**
   * Optional input
   */
  optional?: boolean;
  /**
   * Required input
   */
  required?: boolean;
  /**
   * Whether or not the field is disabled.
   */
  disabled?: boolean;
  /**
   * When true, clicking the label won't focus the associated form control.
   */
  passive?: boolean;
  /**
   * Right icon to render
   */
  iconRight?: IconifyIcon | string;
  /**
   * Left icon to render
   */
  iconLeft?: IconifyIcon | string;
  /**
   * Other unknown attributes
   */
//   [key: PropertyKey]: any;
}

/**
 * Input component for entering user data
 */
export const BaseInput: React.FC<InputProps> = forwardRef(({ label, error, optional, required, iconLeft, iconRight, className, help, disabled, passive, ...props }, ref: React.Ref<HTMLInputElement>) => {
    return (
        <Field disabled={disabled} className="input--outer">
            <RenderIf condition={!!label}>
                <div className="text-sm tracking-custom flex gap-px items-center">
                    <Label passive={passive} className="input--label">
                        {label}
                    </Label>
                    {!!optional && (
                        <span className="font-normal text-gray-500 text-sm">(Optional)</span>
                    )}
                    {!!required && (
                        <div className="font-medium text-error-500 text-sm">*</div>
                    )}
                </div>
            </RenderIf>
            <div className="input--inner">
                <Input as={Fragment}>
                    {
                        () =>
                            <input
                                ref={ref}
                                className={cn("input peer", iconLeft ? "pl-9" : "pl-4", iconRight ? "pr-12" : "pr-4", error ? "input--border-error" : "input--border", className)}
                                {...props}
                            />
                    }
                </Input>
                <RenderIf condition={!!iconLeft}>
                    <Icon icon={iconLeft as IconifyIcon} className="size-5 left-2.5 text-grey-30 peer-disabled:text-gray-300 peer-focus:text-grey-40 transition-colors duration-500 ease-out mr-auto my-auto inset-0 absolute" width={20} height={20} />
                </RenderIf>
                <RenderIf condition={!!iconRight}>
                    <Icon icon={iconRight as IconifyIcon} className="size-5 right-4 text-grey-30 peer-disabled:text-gray-300 peer-focus:text-grey-40 transition-colors duration-500 ease-out ml-auto my-auto inset-0 absolute" width={20} height={20} />
                </RenderIf>
            </div>
            <RenderIf condition={!!error}>
                <span className="input--error">{error}</span>
            </RenderIf>
            <RenderIf condition={!!help}>
                <Description className="flex items-start gap-1 text-xs text-gray-500">{help}</Description>
            </RenderIf>
        </Field>
    );
});