import { BaseButton, BaseInput, BasePasswordInput } from "@/components/core"
import riMailLine from "@iconify-icons/ri/mail-line"

export const LoginPage = () => {
    return (
        <div className="flex flex-col gap-8 items-center justify-center max-w-md w-full mx-auto">
            <div className="grid gap-0.5 text-center">
                <h1 className="text-green-primary-50 text-3xl font-semibold">Log in to your account</h1>
                <p className="text-grey-40 text-base font-normal">Enter your details to access this application</p>
            </div>
            <form className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-7">
                    <BaseInput label="Email Address" type="email" placeholder="Enter email" iconRight={riMailLine} />
                    <BasePasswordInput label="Password" type="password" placeholder="Enter password" showPassword />
                </div>
                <BaseButton size="small" theme="primary" variant="filled" block>Login</BaseButton>
            </form>
        </div>
    )
}