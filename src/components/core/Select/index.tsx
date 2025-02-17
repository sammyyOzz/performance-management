import React from "react";
import { cn } from "@/lib/utils";
import { RenderIf } from "@/components/core";
import { Description, Field, Label, Select } from "@headlessui/react";
import "./select.css";

interface SelectInputProps {
  /**
   * Label for select element
   */
  label?: string;
  /**
   * styles for select element
   */
  containerVariant?: string;
  /**
   * Help text for select element
   */
  help?: string;
  /**
   * Error message
   */
  error?: string | boolean;
  /**
   * Options for select
   */
  options: {
    label: string;
    value: string;
  }[];
  /**
   * Disabled props
   */
  disabled?: boolean;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

export const BaseSelectInput: React.FC<SelectInputProps> = ({ containerVariant, label, help, error, options, disabled = false, ...props }) => {
    return (
        <Field disabled={disabled} className={`${containerVariant} input--outer`}>
            <RenderIf condition={!!label}>
                <Label className="input--label">{label}</Label>
            </RenderIf>
            <RenderIf condition={!!help}>
                <Description className="input--help">{help}</Description>
            </RenderIf>
            <div className="relative">
                <Select
                    className={cn(
                    "input px-2", error ? "input--border-error" : "input--border",
                    // Make the text of each option black on Windows
                    "*:text-grey-70"
                    )} {...props}
                >

                    <option defaultValue=""></option>
                    {
                        options.map((option, idx) =>
                            <option key={idx} value={option.value}>{option.label}</option>
                        )
                    }
                </Select>
            </div>
            <RenderIf condition={!!error}>
                <span className='input--error'>{error}</span>
            </RenderIf>
        </Field>
    )
}