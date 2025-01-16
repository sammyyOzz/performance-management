import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Loader } from "@/components/core/Button/Loader";
import { Button, type ButtonProps } from "@headlessui/react";
import { type FC, forwardRef, Fragment, type LegacyRef, type ReactNode, useMemo } from "react";
import "./button.css"

interface BaseButtonProps extends ButtonProps {
    /**
     * Should the button fill it's parent container?
     */
    block?: boolean;
    /**
     * Renders child nodes passed into Button component
     */
    children: string | ReactNode;
    /**
     * Shows a loading state on Button component
     */
    loading?: boolean;
    /**
     * What size of button to render
     */
    size: "small" | "large";
    /**
     * What theme to render
     */
    theme: "primary" | "secondary" | "danger";
    /**
     * What variant to render
     */
    variant: "filled" | "ghost" | "outlined";
    /**
     * Other unknown attributes
     */
    [key: PropertyKey]: any;
}

export const BaseButton: FC<BaseButtonProps> = forwardRef(({ block, children, loading, size, theme, variant, ...props }, ref: LegacyRef<HTMLButtonElement>) => {
    const buttonState = useMemo(() => {
        return loading ? "loading" : "idle"
    }, [loading]);

    const buttonCopy = {
        idle: children,
        loading: <Loader className="spinner" />
    };
    
    return (
        <Button as={Fragment}>
            {
                (({ active, disabled, focus, hover }) => (
                    <button
                        ref={ref}
                        className={cn(
                            `button button-${size}`,
                            block && 'button-block',
                            hover && `button-${theme}--${variant}-hover`,
                            !hover && !active && `button-${theme}--${variant}`,
                            disabled && `button-${theme}--${variant}-disabled`,
                            (focus || active) && `button-${theme}--${variant}-focus`,
                        )}
                        {...props}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                                initial={{ opacity: 0, y: -25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 25 }}
                                key={buttonState}
                                className={cn(loading ? "py-1" : "")}
                            >
                                {buttonCopy[buttonState]}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                ))
            }
        </Button>
    )
})