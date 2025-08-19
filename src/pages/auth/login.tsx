import riMailLine from "@iconify-icons/ri/mail-line"
import { loginSchema } from "@/validations/auth"
import { useLogin } from "@/services/hooks/mutations"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Link, useNavigate, useSearchParams } from "react-router"
import { BaseButton, BaseInput, BasePasswordInput } from "@/components/core"

export const LoginPage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { mutate, isPending } = useLogin(() => {
        const prevRoute = searchParams.get("prevRoute")
        navigate(prevRoute || "/dashboard")
    })
    const { handleSubmit, isValid, register } = useFormikWrapper({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
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
                <h1 className="text-green-primary-50 text-3xl font-semibold">Log into your account</h1>
                <p className="text-grey-40 text-base font-normal">Welcome back! Please enter your details to login</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-7">
                    <BaseInput label="Email Address" type="email" placeholder="Enter email" iconRight={riMailLine} {...register("email")} readOnly={isPending} />
                    <BasePasswordInput label="Password" placeholder="Enter password" {...register("password")} readOnly={isPending} showPassword />
                </div>
                <div className="grid gap-2">
                    <BaseButton type="submit" size="small" theme="primary" variant="filled" loading={isPending} disabled={isPending || !isValid} block>Login</BaseButton>
                    <Link to="/auth/forgot-password" className="button button-small button-block button-primary--ghost">Forgot Password</Link>
                </div>
            </form>
        </div>
    )
}