import { Logout, Trash } from "iconsax-react"
import { BaseButton, BasePasswordInput } from "@/components/core"
import { removeItem } from "@/utils/localStorage"
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils"
import { useNavigate } from "react-router"



export const SecurityPage = () => {
    const navigate = useNavigate()
    function logout() {
        removeItem(APP_TOKEN_STORAGE_KEY)
        removeItem(APP_USERDATA_STORAGE_KEY)
        navigate("/auth/login")
    }
    return (
        <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
            <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-8 p-6 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <div className="grid gap-1">
                        <h1 className="font-semibold text-xl text-black">Setting and Privacy</h1>
                        <p className="font-normal text-xs text-[#727A86]">Ensure your account is secured and no one has access to it</p>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="grid grid-cols-3 gap-14">
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-1">
                                <h2 className="font-medium text-sm text-black">Password</h2>
                                <p className="font-normal text-xs text-[#727A86]">Change your password for security.</p>
                            </div>
                            <BaseButton size="small" theme="primary" variant="filled">
                                Save Changes
                            </BaseButton>
                        </div>
                        <div className="flex flex-col gap-5">
                            <BasePasswordInput label="Old Password" placeholder="Enter old password" showPassword />
                            <BasePasswordInput label="New Password" placeholder="Enter new password" showPassword />
                            <BasePasswordInput label="Confirm Password" placeholder="Confirm new password" showPassword />
                        </div>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="grid grid-cols-3 gap-14">
                        <div className="grid gap-1">
                            <h3 className="font-medium text-sm text-black">Account Security</h3>
                            <p className="font-normal text-xs text-[#727A86]">Manage account security</p>
                        </div>
                        <div className="flex items-center gap-8">
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