import { FC } from "react"
import { Icon } from "@iconify-icon/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseButton, BaseInput, TextArea } from "@/components/core"
import { FetchedUserType } from "@/types/user"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { format } from "date-fns"
import { useCreateReview } from "@/services/hooks/mutations"
import { createReviewSchema } from "@/validations/review"

interface ReviewEmployeePerformanceProps {
    isOpen: boolean;
    success: () => void;
    close: () => void;
    user: FetchedUserType;
}

export const ReviewEmployeePerformance: FC<ReviewEmployeePerformanceProps> = ({ isOpen, close, success, user }) => {
    const { mutate, isPending } = useCreateReview(() => onSuccess())
    const { handleSubmit, register, resetForm } = useFormikWrapper({
        initialValues: {
            current_responsibilities: "",
            evaluation_criteria: "",
            excellent_areas: "",
            expectations: "",
            improvement_areas: "",
            user_id: user?.id
        },
        validationSchema: createReviewSchema,
        enableReinitialize: true,
        onSubmit(values) {
            mutate(values)
        },
    })
    
    const onClose = () => {
        close()
        resetForm()
    }
    
    const onSuccess = () => {
        success();
        resetForm();
    }
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {}}>
            <DialogBackdrop className="fixed inset-0 bg-[#FDFDFD] duration-300 ease-out transition-all" style={{ backdropFilter: "blur(4px)" }} /> 
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex flex-col min-h-full items-center justify-start gap-12 px-20">
                    <div className="flex items-center justify-between w-full py-8">
                        <h1 className="text-xl font-semibold text-gray-900">Monthly Performance Review</h1>
                        <button type="button" className="flex items-center py-3 px-5 gap-2 rounded-lg bg-[#F5F6F7] border border-[#F0F1F4] z-10" onClick={onClose}>
                            Close
                            <Icon icon={riCloseFill} width={20} height={20} />
                        </button>
                    </div>
                    <DialogPanel as="div" className="w-full ease-out data-[closed]:scale-90 data-[closed]:opacity-0 duration-500">
                        <div className="relative flex items-start w-full justify-center gap-8">
                            <div className="sticky top-0 flex flex-col gap-4 p-6 border border-[#E4E7EC] rounded-xl max-w-[29.3125rem] w-full">
                                <h2 className="font-semibold text-black text-xl">Staff detail</h2>
                                <div className="flex flex-col gap-6">
                                    <BaseInput label="Name of Staff" type="text" defaultValue={`${user?.first_name} ${user?.last_name}`} disabled />
                                    <div className="grid grid-cols-2 gap-6">
                                        <BaseInput label="IPPIS No." type="text" defaultValue={`${user?.staff_id}`} disabled />
                                        <BaseInput label="Rank" type="text" defaultValue={`${user?.position}`} disabled />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <BaseInput label="Department" type="text" defaultValue={`${user?.department_name}`} disabled />
                                        <BaseInput label="Designation" type="text" defaultValue={`${user?.position}`} disabled />
                                    </div>
                                    <BaseInput label="Review Date" type="text" defaultValue={format(new Date(), "dd, MMMM yyyy")} disabled />
                                    <BaseInput label="Review Month" type="text" defaultValue={format(new Date(), "MMMM")} disabled />
                                </div>
                            </div>
                            <div className="flex flex-col flex-1 w-full border border-[#E6E6E6] rounded-lg">
                                <div className="flex flex-col gap-8 p-8 overflow-x-hidden">
                                    <h1 className="font-semibold text-2xl text-gray-900 text-center">Performance Assessment</h1>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                        <TextArea label="What are their current responsibilities?" {...register("current_responsibilities")} />
                                        <TextArea label="How do you evaluate performance and the goals that have been achieved?" {...register("evaluation_criteria")} />
                                        <TextArea label="What areas of excellence do you believe they demonstrated in their performance?" {...register("excellent_areas")} />
                                        <TextArea label="What areas do you think they could improve in their role?" {...register("improvement_areas")} />
                                        <TextArea label="What expectations do you believe should be set to achieve them?" {...register("expectations")} />
                                        <BaseButton type="submit" variant="filled" theme="primary" size="small" loading={isPending} disabled={isPending} block>Submit</BaseButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}