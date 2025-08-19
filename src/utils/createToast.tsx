import { toast } from "sonner"
import { Toast, type ToastProps } from "@/components/core"

export const createToast = (options: ToastProps) =>
  toast.custom((t) => (<Toast id={t} {...options} />))

export function successToast(res: Record<string, any>) {
    createToast({
        message: res?.message ?? res?.msg,
        type: "success",
    });
}

export function errorToast(err: Record<string, any>) {
    createToast({
        message: err?.param?.response?.data?.message ?? err?.msg,
        type: "error",
    });
}