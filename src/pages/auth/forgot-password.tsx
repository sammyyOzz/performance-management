import { Link, useNavigate } from "react-router"
import riMailLine from "@iconify-icons/ri/mail-line"
import { BaseButton, BaseInput } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { useForgotPassword } from "@/services/hooks/mutations"
import { forgotPasswordSchema } from "@/validations/auth"

export const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    const { mutate, isPending } = useForgotPassword(() => navigate("/auth/login"))
    const { handleSubmit, isValid, register } = useFormikWrapper({
        initialValues: {
            email: ""
        },
        validationSchema: forgotPasswordSchema,
        onSubmit(values) {
            mutate(values)
        },
    })
    return (
        <div className="flex flex-col gap-8 items-center justify-center max-w-md w-full mx-auto">
            <img 
                src={import.meta.env.VITE_DEMO === "true" ? "/appraisium-logo.png" : "/mpr_logo.svg"} 
                alt={import.meta.env.VITE_DEMO === "true" ? "Demo Logo" : "Ministry of Petroleum Resources Logo"} 
                className="h-14" 
            />
            <div className="grid gap-0.5 text-center">
                <h1 className="text-green-primary-50 text-3xl font-semibold">Forgot Password?</h1>
                <p className="text-grey-40 text-base font-normal">Please input your registered mail to reset your password</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-7">
                    <BaseInput label="Email Address" type="email" placeholder="Enter your email address" iconRight={riMailLine} {...register("email")} readOnly={isPending} />
                </div>
                <div className="grid gap-2">
                    <BaseButton type="submit" size="small" theme="primary" variant="filled" loading={isPending} disabled={!isValid || isPending} block>Continue</BaseButton>
                    <Link to="/auth/login" className="button button-small button-block button-primary--ghost">Remember Password?</Link>
                </div>
            </form>
        </div>
    )
}