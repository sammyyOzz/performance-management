import { BaseButton, BaseInput, BasePasswordInput } from "@/components/core"
import riMailLine from "@iconify-icons/ri/mail-line"
import { Link } from "react-router"

export const LoginPage = () => {
    return (
        <div className="flex flex-col gap-8 items-center justify-center max-w-md w-full mx-auto">
            <div className="grid gap-0.5 text-center">
                <h1 className="text-green-primary-50 text-3xl font-semibold">Log into your account</h1>
                <p className="text-grey-40 text-base font-normal">Welcome back! Please enter your details to login</p>
            </div>
            <form className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-7">
                    <BaseInput label="Email Address" type="email" placeholder="Enter email" iconRight={riMailLine} />
                    <BasePasswordInput label="Password" type="password" placeholder="Enter password" showPassword />
                </div>
                <div className="grid gap-2">
                    <BaseButton size="small" theme="primary" variant="filled" block>Login</BaseButton>
                    <Link to="/auth/forgot-password" className="button button-small button-block button-primary--ghost">Forgot Password</Link>
                </div>
            </form>
        </div>
    )
}