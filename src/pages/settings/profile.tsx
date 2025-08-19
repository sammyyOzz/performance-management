import { BaseInput } from "@/components/core"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Button } from "@headlessui/react"
import { GalleryAdd } from "iconsax-react"
import { useUpdateProfilePicture } from "@/services/hooks/mutations/useUser"
import { useState, useRef } from "react"
import { successToast, errorToast } from "@/utils/createToast"

interface UserProfile {
    id: number
    staff_id: string
    first_name: string
    last_name: string
    profile_pic: string
    email: string
    department_id: number
    department: null
    division_id: number | null
    branch_id: number | null
    section_id: number | null
    position: string
    grade_level: string
    supervisor_id: number
    supervisor: {
        id: number
        staff_id: string
        first_name: string
        last_name: string
        profile_pic: string
        email: string
        department_id: number
        department: null
        division_id: number | null
        branch_id: number | null
        section_id: number | null
        position: string
        grade_level: string
        supervisor_id: number | null
        supervisor: null
        status: string
        email_verified: boolean
        is_superuser: boolean
        role_id: number
        onboarding_level: number
        department_name: string
        is_supervisor: boolean
    } | null
    status: string
    email_verified: boolean
    is_superuser: boolean
    role_id: number
    onboarding_level: number
    department_name: string
    is_supervisor: boolean
}

// const genders = [
//     { label: "Male", value: "male" },
//     { label: "Female", value: "female" }
// ]

export const ProfilePage = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { mutate: updateProfilePicture, isPending } = useUpdateProfilePicture();
    
    const { data: userData, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/get-current-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data as UserProfile
        }
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                errorToast({ param: "File size should be less than 5MB", variant: "light" });
                return;
            }
            if (!file.type.startsWith('image/')) {
                errorToast({ param: "Please select an image file", variant: "light" });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
            updateProfilePicture(file, {
                onSuccess: () => {
                    successToast({ param: null, msg: "Profile picture updated successfully" });
                },
                onError: (error) => {
                    errorToast({ param: error, variant: "light" });
                }
            });
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    if (isLoading) {
        return (
            <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
                <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                    <div className="flex flex-col gap-8 p-6 bg-white-10 border border-[#DFE2E7] rounded-xl">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
            <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-8 p-6 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <div className="grid gap-1">
                        <h1 className="font-semibold text-xl text-black">{`${userData?.first_name} ${userData?.last_name}`}</h1>
                        <p className="font-normal text-xs text-[#727A86]">Edit your account information and save the changes.</p>
                    </div>
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-1 flex-col gap-5">
                            <div className="grid gap-1">
                                <h2 className="font-medium text-sm text-black">Profile photo</h2>
                                <p className="font-normal text-xs text-[#727A86]">This image will be displayed on your profile</p>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <Button 
                                className="bg-white-10 border border-green-secondary-40 rounded-lg p-3 flex items-center gap-2 w-fit"
                                onClick={handleButtonClick}
                                disabled={isPending}
                            >
                                <span className="text-sm font-medium text-green-secondary-40">
                                    {isPending ? "Uploading..." : "Change photo"}
                                </span>
                                <GalleryAdd size="16" color="#0F973D" variant="Outline" />
                            </Button>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            {selectedImage || userData?.profile_pic ? (
                                <img
                                    src={selectedImage || userData?.profile_pic}
                                    alt="Profile"
                                    className="rounded-full size-[6.25rem] object-cover border border-green-secondary-10"
                                />
                            ) : (
                                <div className="grid place-content-center bg-green-primary-40 rounded-full border border-green-secondary-10 text-white-10 text-xl font-semibold size-[6.25rem]">
                                    {`${userData?.first_name?.[0]}${userData?.last_name?.[0]}`}
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-1 flex-col gap-5">
                            <div className="grid gap-1">
                                <h2 className="font-medium text-sm text-black">Basic Information</h2>
                            </div>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            <div className="grid grid-cols-2 gap-5">
                                <BaseInput label="First Name" type="text" value={userData?.first_name} />
                                <BaseInput label="Last Name" type="text" value={userData?.last_name} />
                            </div>
                            {/* <BaseSelectInput label="Gender" options={genders} />
                            <BaseSelectInput label="Marital Status" options={genders} /> */}
                            <BaseInput label="Email" type="text" value={userData?.email} />
                            <BaseInput label="Staff ID" type="text" value={userData?.staff_id} />
                        </div>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-1 flex-col gap-1">
                            <h3 className="font-medium text-sm text-black">Staff Details</h3>
                            <p className="font-normal text-xs text-[#727A86]">View your staff details here</p>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            {/* <BaseInput label="Department" type="text" value={userData?.department_name} /> */}
                            <BaseInput label="Job Title" type="text" value={userData?.position} />
                            <BaseInput label="Grade Level" type="text" value={userData?.grade_level} />
                            <BaseInput label="Role" type="text" value={userData?.is_superuser ? "Superuser" : "User"} />
                        </div>
                    </div>
                    <hr className="border-[#DFE2E7]" />
                    <div className="flex w-full gap-24 max-w-[62rem]">
                        <div className="flex flex-1 flex-col gap-1">
                            <h3 className="font-medium text-sm text-black">Hierarchy Information</h3>
                            <p className="font-normal text-xs text-[#727A86]">View your supervisor</p>
                        </div>
                        <div className="flex flex-col w-full max-w-[43.875rem] gap-5">
                            <BaseInput 
                                label="Supervisor" 
                                type="text" 
                                value={userData?.supervisor ? `${userData.supervisor.first_name} ${userData.supervisor.last_name}` : "Not assigned"} 
                            />
                            {/* <BaseInput label="Head of Department" type="text" value={userData?.department_name} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}