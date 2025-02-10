import React, { type ReactNode, type ElementType } from "react"
import { Icon } from "@iconify-icon/react"
import riCheckLine from "@iconify-icons/ri/check-line"
import riSubtractLine from "@iconify-icons/ri/subtract-line"
import { RenderIf } from "../RenderIf"
import { Checkbox, Field, Label } from "@headlessui/react"

interface BaseCheckboxProps {
  /**
   * Label for input element
   */
  label?: string | ReactNode;
  /**
   * The element or component the checkbox should render as.
   */
  as?: ElementType;
  /**
   * Whether or not the checkbox is checked.
   */
  checked?: boolean;
  /**
   * The default checked value when using as an uncontrolled component.
   */
  defaultChecked?: any;
  /**
   * Whether or not the checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * When true, clicking the label won't focus the associated form control.
   */
  passive?: boolean;
  /**
   * The name used when using the checkbox inside a form.
   */
  name?: string;
  /**
   * The id of the form that the checkbox belongs to. If name is provided but form is not, the checkbox will add its state to the nearest ancestor form element.
   */
  form?: string;
  /**
   * The function to call when the checkbox is toggled.
   */
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: boolean) => void;
  /**
   * Whether or not the checkbox is indeterminate.
   */
  indeterminate?: boolean;
  /**
   * The value used when using this component inside a form, if it is checked.
   */
  value?: string;
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}

/**
 * Checkbox component for entering user data
 */
export const BaseCheckbox: React.FC<BaseCheckboxProps> = ({ as, disabled, passive = false, label, ...props }) => {
    return (
        <Field as={as} disabled={disabled} className="flex items-start lg:items-center gap-2">
            <Checkbox as={as} disabled={disabled} {...props} className="p-0.5 group grid transition duration-500 ease-out place-content-center size-4 rounded data-[focus]:ring-offset-2 data-[checked]:ring-green-secondary-40 data-[checked]:border-green-secondary-40 data-[checked]:bg-green-secondary-40 data-[checked]:hover:bg-primary-700 data-[checked]:hover:border-primary-700 data-[indeterminate]:ring-green-secondary-40 data-[indeterminate]:border-green-secondary-40 data-[indeterminate]:bg-green-secondary-40 data-[focus]:bg-primary-800 data-[focus]:border-primary-800 data-[disabled]:shadow-md shadow-gray-300 data-[disabled]:bg-gray-200 data-[disabled]:border-gray-300 border border-[#D0D5DD] outline-none outline-0">
                <Icon icon={riCheckLine} width={12} height={12} className="hidden text-white-10 group-data-[checked]:block" />
                <Icon icon={riSubtractLine} width={12} height={12} className="hidden text-white-10 group-data-[indeterminate]:block" />
            </Checkbox>
            <RenderIf condition={!!label}>
                <Label passive={passive} className="-mt-1 lg:mt-0 flex-1">{label}</Label>
            </RenderIf>
        </Field>
    )
}