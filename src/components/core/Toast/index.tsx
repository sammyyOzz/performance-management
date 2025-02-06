import React from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify-icon/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import riErrorWarningLine from "@iconify-icons/ri/error-warning-line"
import riAlarmWarningLine from "@iconify-icons/ri/alarm-warning-line"
import riCheckboxCircleLine from "@iconify-icons/ri/checkbox-circle-line"
import "./toast.css";

type Keys = "success" | "warning" | "error";
export interface ToastProps {
  /**
   * Renders the variant of toast which can either be success, warning or error
   */
  type: Keys;
  /**
   * Renders the title of the message shown in the toast
   */
  title?: string;
  /**
   * Renders the message which is a detailed description of the title
   */
  message: string;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

const alert = {
  success: "border-l-8 border-l-green-secondary-40",
  warning: "border-l-8 border-l-yellow-40",
  error: "border-l-8 border-l-red-40",
} as const satisfies Partial<Record<Keys, string>>;

/**
 * Toast component for displaying information
 */
export const Toast: React.FC<ToastProps> = ({ type, message, id }) => {
    const toastIcon = {
        success: {
            icon: riCheckboxCircleLine,
            color: "text-green-secondary-40"
        },
        error: {
            icon: riErrorWarningLine,
            color: "text-red-40"
        },
        warning: {
            icon: riAlarmWarningLine,
            color: "text-yellow-40"
        }
    }
    return (
        <div className={cn("group toast-container", alert[type])}>
            <Icon icon={toastIcon[type].icon} className={toastIcon[type].color} width={24} height={24} />
            <div className="toast-message">{message}</div>
            <button
                type="button"
                className="toast-button"
                onClick={() => toast.dismiss(id as string | number | undefined)}
            >
                <Icon icon={riCloseFill} width={20} height={20} />
            </button>
        </div>
    );
};