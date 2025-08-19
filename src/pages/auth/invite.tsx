import { BaseButton, BaseInput, BasePasswordInput } from "@/components/core"
import { PasswordStrength } from "@/components/shared"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { useSetUserPassword } from "@/services/hooks/mutations"
import { inviteUserSchema } from "@/validations/auth"
import riMailLine from "@iconify-icons/ri/mail-line"
import riUserLine from "@iconify-icons/ri/user-line"
import { useNavigate, useSearchParams } from "react-router"

export const InvitePage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const jwtToDecode = searchParams.get("token") as string
    const decryptedToken = JSON.parse(atob(jwtToDecode.split(".")[1]));

    const { mutate, isPending } = useSetUserPassword(() => navigate("/auth/login"))

    const { handleSubmit, isValid, register, values } = useFormikWrapper({
        initialValues: {
            token: decryptedToken?.token || "",
            password: "",
            confirm_password: ""
        },
        enableReinitialize: true,
        validationSchema: inviteUserSchema,
        onSubmit: () => {
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
                <h1 className="text-green-primary-50 text-3xl font-semibold">You’ve been invited</h1>
                <p className="text-grey-40 text-base font-normal">Create an account to access this application</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-7">
                    <BaseInput label="Email Address" type="email" placeholder="Enter email" value={decryptedToken?.email || ""} iconRight={riMailLine} disabled />
                    <BaseInput label="Full Name" type="text" placeholder="Enter full name" value={`${decryptedToken?.first_name || ""} ${decryptedToken?.last_name || ""}`} iconRight={riUserLine} disabled />
                    <div className="grid gap-2 content-start">
                        <BasePasswordInput label="Password" placeholder="Enter password" {...register("password")} showPassword />
                        <PasswordStrength value={values.password} />
                    </div>
                    <BasePasswordInput label="Confirm Password" placeholder="Confirm password" {...register("confirm_password")} showPassword />
                </div>
                <BaseButton type="submit" size="small" theme="primary" variant="filled" disabled={!isValid || isPending} loading={isPending} block>Accept invitation</BaseButton>
            </form>
        </div>
    )
}