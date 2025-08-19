import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseInput, RenderIf, TextArea } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { FetchedUserType } from "@/types/user"
import { FetchedSubordinateAppraisalType } from "@/types/appraisal"
import { useGetReviews } from "@/services/hooks/queries/useReview"
import { Loader } from "@/components/core/Button/Loader"

interface ViewEmployeePerformanceProps {
    isOpen: boolean;
    close: () => void;
    user: FetchedUserType | FetchedSubordinateAppraisalType;
    month: number;
    year: number;
}

export const ViewEmployeePerformance: FC<ViewEmployeePerformanceProps> = ({ isOpen, close, user, month, year }) => {
    const { isLoading: isGetReviewsLoading, data: reviewsData } = useGetReviews({
        user_id: user?.id?.toString(), 
        month: `${month + 1}`, // month is 0-indexed in JavaScript
        year: year.toString(), 
        page_size: "10"
    });

    const { register } = useFormikWrapper({
        initialValues: {
            current_responsibilities: reviewsData?.data[0]?.current_responsibilities || "",
            evaluation_criteria: reviewsData?.data[0]?.evaluation_criteria || "",
            excellent_areas: reviewsData?.data[0]?.excellent_areas || "",
            expectations: reviewsData?.data[0]?.expectations || "",
            improvement_areas: reviewsData?.data[0]?.improvement_areas || "",
          },
        // initialValues: {
        //     first_name: user?.first_name || "",
        //     last_name: user?.last_name || "",
        //     current_responsibilities: "As the supervisor, it is important to highlight that the project manager's current responsibilities include overseeing project timelines, coordinating effectively with team members, managing budgets diligently, and ensuring that all deliverables meet the established quality standards. Furthermore, the project manager plays a crucial role in facilitating communication between stakeholders and providing regular updates on the progress of the projects.",
        //     evaluate: "After reviewing the performance metrics, it appears that the user successfully increased their sales by 25% over the last quarter. They implemented a new customer feedback system that resulted in a 40% improvement in customer satisfaction ratings. Additionally, the user streamlined their operations, reducing costs by 15%, which has significantly contributed to their overall strategic goals.",
        //     areas_of_excellence: "During their performance, they demonstrated exceptional skills in project management, showcasing their ability to lead teams effectively. Their communication skills were outstanding, allowing for clear and concise information sharing among team members. Additionally, they excelled in problem-solving, quickly identifying issues and implementing innovative solutions that significantly improved project outcomes.",
        //     areas_of_improvement: "In their role, they could improve in areas such as communication skills, time management, and teamwork. Additionally, implementing a structured schedule could help Aijay manage their tasks more efficiently, leading to enhanced productivity.",
        //     expectations: "None for now",
        //     appraisee_comment: "As much as i apprecaite the feedback, i’ll look into setting better performance next month"
        // },
        enableReinitialize: true,
        onSubmit() {
            
        },
    })
    return (
        <Drawer.Root open={isOpen} onOpenChange={close} direction="right">
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/10" style={{ backdropFilter: "blur(4px)" }} />
                <Drawer.Content
                className="right-0 top-0 bottom-0 fixed z-10 outline-none w-full max-w-[41.8125rem] flex"
                // The gap between the edge of the screen and the drawer is 8px in this case.
                style={{ "--initial-transform": "calc(100% + 0px)" } as React.CSSProperties}
                >
                    <div className="bg-white-10 h-full w-full grow p-6 flex flex-col rounded-bl-lg">
                        <div className="flex flex-col gap-4 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
                                <div className="flex items-center justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900 capitalize">{user?.first_name} {user?.last_name}</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>

                                <RenderIf condition={isGetReviewsLoading}>
                                    <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
                                        <Loader className="spinner size-6 text-green-primary-40" />
                                    </div>
                                </RenderIf>
                                
                                <RenderIf condition={!isGetReviewsLoading}>
                                    <div className="flex flex-col w-full gap-5">
                                        <TextArea label="What are their current responsibilities?" rows={5} disabled {...register("current_responsibilities")} />
                                        <TextArea label="How do you evaluate performance and the goals that have been achieved?" rows={5} disabled {...register("evaluation_criteria")} />
                                        <TextArea label="What areas of excellence do you believe they demonstrated in their performance?" rows={5} disabled {...register("excellent_areas")} />
                                        <TextArea label="What areas do you think they could improve in their role?" rows={3} disabled {...register("improvement_areas")} />
                                        <BaseInput label="What expectations do you believe should be set to achieve them?" type="text" {...register("expectations")} disabled />
                                        {/* <div className="flex flex-col gap-4 pt-3">
                                            <h3 className="font-semibold text-xl text-black">Appraisee’s Comment</h3>
                                            <TextArea label="Appraisee’s Comment" rows={2} disabled {...register("appraisee_comment")} />
                                        </div> */}
                                    </div>
                                </RenderIf>

                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}