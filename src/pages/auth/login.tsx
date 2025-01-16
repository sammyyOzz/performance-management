import { BaseButton } from "@/components/core/Button"

export const LoginPage = () => {
    return (
        <div className="flex flex-col gap-8 items-center justify-center max-w-md w-full mx-auto">
            <div className="grid gap-0.5 text-center">
                <h1 className="text-green-primary-50 text-3xl font-semibold">You’ve been invited</h1>
                <p className="text-grey-40 text-base font-normal">Create an account to access this application</p>
            </div>
            <form className="flex flex-col gap-8 w-full">
                <BaseButton size="small" theme="primary" variant="filled" block>Accept invitation</BaseButton>
            </form>
        </div>
    )
}