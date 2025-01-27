import { BaseButton, BaseInput, BasePasswordInput } from "@/components/core"
import { PasswordStrength } from "@/components/shared"
import riMailLine from "@iconify-icons/ri/mail-line"
import riUserLine from "@iconify-icons/ri/user-line"

export const InvitePage = () => {
    return (
        <div className="flex flex-col gap-8 items-center justify-center max-w-md w-full mx-auto">
            <div className="grid gap-0.5 text-center">
                <h1 className="text-green-primary-50 text-3xl font-semibold">You’ve been invited</h1>
                <p className="text-grey-40 text-base font-normal">Create an account to access this application</p>
            </div>
            <form className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-7">
                    <BaseInput label="Email Address" type="email" placeholder="Enter email" iconRight={riMailLine} value="aijaysolomon68@gmail.com" disabled />
                    <BaseInput label="Full Name" type="text" placeholder="Enter full name" iconRight={riUserLine} />
                    <div className="grid gap-2 content-start">
                        <BasePasswordInput label="Password" type="password" placeholder="Enter password" showPassword />
                        <PasswordStrength value={""} />
                    </div>
                    <BasePasswordInput label="Confirm Password" type="password" placeholder="Confirm password" showPassword />
                </div>
                <BaseButton size="small" theme="primary" variant="filled" block>Accept invitation</BaseButton>
            </form>
        </div>
    )
}