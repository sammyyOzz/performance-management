import { cn } from '@/lib/utils'
import { forwardRef, Fragment, useState, type ReactNode } from 'react'
import { Description, Field, Input, Label } from '@headlessui/react'
import { Icon } from "@iconify-icon/react"
import riEyeOutline from "@iconify-icons/ri/eye-line"
import riEyeClosedOutline from "@iconify-icons/ri/eye-off-line"
import './input.css'
import { RenderIf } from '../RenderIf'
import { AnimatePresence, motion } from 'motion/react'

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement> {
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
   * Element to render
   */
  actionLabel?: ReactNode;
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
   * Left icon to render
   */
  iconLeft?: string;
  /**
   * Prop to show and hide password
   */
  showPassword?: boolean;
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};


export const BasePasswordInput = forwardRef(function PasswordInput({ label, error, optional, required, iconLeft, className, help, disabled, passive, showPassword, ...props }: InputProps, ref: React.Ref<HTMLInputElement>) {
    const [togglePassword, setTogglePassword] = useState<boolean>(false);

    const toggleVisibility = () => {
        setTogglePassword(togglePassword ? false : true);
    };
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
                    {() => <input ref={ref} type={showPassword && togglePassword ? "text" : "password"} className={cn("input peer", iconLeft ? "pl-12" : "pl-4", "pr-12", error ? "input--border-error" : "input--border", className)} {...props} /> }
                </Input>
                <RenderIf condition={!!showPassword}>
                    <button
                        type='button'
                        onClick={() => toggleVisibility()}
                        className={`text-grey-30 peer-disabled:text-gray-300 peer-focus:text-green-primary-40 transition-colors duration-500 ease-out ${showPassword ? "toggle-password-icon" : "hidden"}`}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {togglePassword ? (
                                <motion.span
                                    key="checkmark"
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="grid place-content-center"
                                >
                                    <Icon icon={riEyeClosedOutline} width={20} height={20} />
                                </motion.span>
                                ) : (
                                <motion.span
                                    key="copy"
                                    variants={variants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="grid place-content-center"
                                >
                                    <Icon icon={riEyeOutline} width={20} height={20} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </RenderIf>
            </div>
            <RenderIf condition={!!help}>
                <Description className="text-sm/6 text-neutral-90">{help}</Description>
            </RenderIf>
            <AnimatePresence>
                {
                    error ? (
                        <motion.span initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="input--error">{error}</motion.span>
                    ) : null
                }
            </AnimatePresence>
        </Field>
    )
})