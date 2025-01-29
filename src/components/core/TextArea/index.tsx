import React, { Fragment } from "react";
import { cn } from "@/lib/utils";
import { RenderIf } from "../RenderIf";
import { Description, Field, Textarea, Label } from "@headlessui/react"
import "./../Input/input.css";

interface TextareaProps extends Omit<React.AllHTMLAttributes<HTMLTextAreaElement>, "size"> {
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
  help?: string;
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
   * Other unknown attributes
   */
  [x: string]: unknown;
}

/**
 * Input component for entering user data
 */
export const TextArea: React.FC<TextareaProps> = ({ label, error, optional, required, className, help, disabled, passive, ...props }) => {
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
                <Textarea as={Fragment}>
                    {() => <textarea className={cn("input peer p-4", error ? "input--border-error" : "input--border", className)} {...props}></textarea> }
                </Textarea>
            </div>
            <RenderIf condition={!!help}>
                <Description className="text-xs text-gray-500">{help}</Description>
            </RenderIf>
            <RenderIf condition={!!error}>
                <span className="input--error">{error}</span>
            </RenderIf>
        </Field>
    );
};