import { Logout, Trash } from "iconsax-react"
import { BaseButton, BasePasswordInput } from "@/components/core"
import { removeItem } from "@/utils/localStorage"
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils"
import { useNavigate } from "react-router"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { changePasswordSchema } from "@/validations/auth"
import { useChangePassword } from "@/services/hooks/mutations"



export const SecurityPage = () => {
    const navigate = useNavigate()
    function logout() {
        removeItem(APP_TOKEN_STORAGE_KEY)
        removeItem(APP_USERDATA_STORAGE_KEY)
        navigate("/auth/login")
    }
    const { mutate, isPending } = useChangePassword()
    const { handleSubmit, isValid, register } = useFormikWrapper({
        initialValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
        validationSchema: changePasswordSchema,
        onSubmit(values) {
            mutate(values)
        },
    })
    return (
        <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
            <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-8 p-6 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <div className="grid gap-1">
                        <h1 className="font-semibold text-xl text-black">Setting and Privacy</h1>
                        <p className="font-normal text-xs text-[#727A86]">Ensure your account is secured and no one has access to it</p>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-3xl">
                        <div className="flex flex-1 flex-col gap-5">
                            <div className="grid gap-1">
                                <h2 className="font-medium text-sm text-black">Password</h2>
                                <p className="font-normal text-xs text-[#727A86]">Change your password for security.</p>
                            </div>
                            <BaseButton type="submit" form="change-password" size="small" theme="primary" variant="filled" disabled={!isValid || isPending} loading={isPending}>
                                Save Changes
                            </BaseButton>
                        </div>
                        <form id="change-password" onSubmit={handleSubmit} className="flex flex-col w-full max-w-96 gap-5">
                            <BasePasswordInput label="Old Password" placeholder="Enter old password" {...register("old_password")} showPassword />
                            <BasePasswordInput label="New Password" placeholder="Enter new password" {...register("new_password")} showPassword />
                            <BasePasswordInput label="Confirm Password" placeholder="Confirm new password" {...register("confirm_password")} showPassword />
                        </form>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-3xl">
                        <div className="flex flex-1 flex-col gap-1">
                            <h3 className="font-medium text-sm text-black">Account Security</h3>
                            <p className="font-normal text-xs text-[#727A86]">Manage account security</p>
                        </div>
                        <div className="flex items-center w-full max-w-96 gap-8">
                            <BaseButton type="button" size="small" theme="danger" variant="outlined" onClick={() => logout()} block>
                                Log out
                                <Logout size="16" />
                            </BaseButton>
                            <BaseButton size="small" theme="danger" variant="filled" block>
                                Delete account
                                <Trash size="16" />
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}