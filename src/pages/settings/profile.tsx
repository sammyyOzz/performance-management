import { BaseButton, BaseInput, BaseSelectInput } from "@/components/core"
import { useGetCurrentUser } from "@/services/hooks/queries"
import { Button } from "@headlessui/react"
import { GalleryAdd } from "iconsax-react"

const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
]

export const ProfilePage = () => {
    useGetCurrentUser()
    return (
        <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
            <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-8 p-6 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <div className="grid gap-1">
                        <h1 className="font-semibold text-xl text-black">Aijay Solomon</h1>
                        <p className="font-normal text-xs text-[#727A86]">Edit your account information and save the changes.</p>
                    </div>
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-1 flex-col gap-5">
                            <div className="grid gap-1">
                                <h2 className="font-medium text-sm text-black">Profile photo</h2>
                                <p className="font-normal text-xs text-[#727A86]">This image will be displayed on your profile</p>
                            </div>
                            <Button className="bg-white-10 border border-green-secondary-40 rounded-lg p-3 flex items-center gap-2 w-fit">
                                <span className="text-sm font-medium text-green-secondary-40">Change photo</span>
                                <GalleryAdd size="16" color="#0F973D" variant="Outline" />
                            </Button>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            <div className="grid place-content-center bg-green-primary-40 rounded-full border border-green-secondary-10 text-white-10 text-xl font-semibold size-[6.25rem]">
                                AS
                            </div>
                        </div>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-1 flex-col gap-5">
                            <div className="grid gap-1">
                                <h2 className="font-medium text-sm text-black">Basic Information</h2>
                                <p className="font-normal text-xs text-[#727A86]">Update your basic details here.</p>
                            </div>
                            <BaseButton size="small" theme="primary" variant="filled">
                                Save Changes
                            </BaseButton>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            <div className="grid grid-cols-2 gap-5">
                                <BaseInput label="First Name" type="text" />
                                <BaseInput label="Last Name" type="text" />
                            </div>
                            <BaseSelectInput label="Gender" options={genders} />
                            <BaseSelectInput label="Marital Status" options={genders} />
                            <BaseInput label="Email" type="text" />
                            <BaseInput label="Employee ID" type="text" />
                        </div>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-1 flex-col gap-1">
                            <h3 className="font-medium text-sm text-black">Employee Details</h3>
                            <p className="font-normal text-xs text-[#727A86]">View your employee details here</p>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            <BaseInput label="Department" type="text" />
                            <BaseInput label="Job Title" type="text" />
                            <BaseInput label="Designation" type="text" />
                            <BaseInput label="Role" type="text" />
                        </div>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-1 flex-col gap-1">
                            <h3 className="font-medium text-sm text-black">Hierarchy Information</h3>
                            <p className="font-normal text-xs text-[#727A86]">View your supervisor</p>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            <BaseInput label="Reporting Manager" type="text" />
                            <BaseInput label="Head of Department" type="text" />
                        </div>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-col flex-1 gap-5">
                            <div className="grid gap-1">
                                <h2 className="font-medium text-sm text-black">Contact Details</h2>
                                <p className="font-normal text-xs text-[#727A86]">Update your contact details here.</p>
                            </div>
                            <BaseButton size="small" theme="primary" variant="filled">
                                Save Changes
                            </BaseButton>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            <BaseInput label="Work Phone Number" type="text" />
                            <BaseInput label="Personal Mobile Number" type="text" />
                            <BaseInput label="Address" type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}