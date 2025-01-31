import { BaseButton, BaseInput } from "@/components/core"
import riMailLine from "@iconify-icons/ri/mail-line"

export const ForgotPasswordPage = () => {
    return (
        <div className="flex flex-col gap-8 items-center justify-center max-w-md w-full mx-auto">
            <div className="grid gap-0.5 text-center">
                <h1 className="text-green-primary-50 text-3xl font-semibold">Forgot Password?</h1>
                <p className="text-grey-40 text-base font-normal">Please input your registered mail to reset your password</p>
            </div>
            <form className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-7">
                    <BaseInput label="Email Address" type="email" placeholder="Enter your email address" iconRight={riMailLine} />
                </div>
                <BaseButton size="small" theme="primary" variant="filled" block>Continue</BaseButton>
            </form>
        </div>
    )
}