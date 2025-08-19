import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseInput } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { FetchedReviewType } from "@/types/review"
import { format, parseISO } from "date-fns";

interface ViewReviewProps {
    isOpen: boolean;
    close: () => void;
    review: FetchedReviewType | null;
}

export const ViewReview: FC<ViewReviewProps> = ({ isOpen, close, review }) => {
    const { register } = useFormikWrapper({
        initialValues: {
          current_responsibilities: review?.current_responsibilities || "",
          evaluation_criteria: review?.evaluation_criteria || "",
          excellent_areas: review?.excellent_areas || "",
          expectations: review?.expectations || "",
          improvement_areas: review?.improvement_areas || "",
        },
        enableReinitialize: true,
        onSubmit() {
            
        },
    })

    const date = parseISO(review?.created_at || new Date().toISOString());
    const formattedDate = format(date, "LLLL, yyyy");

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
                                <div className="flex items-start justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900 capitalize">{`Review for ${formattedDate}`}</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <BaseInput label="Current Responsibilitiess" type="text" {...register("current_responsibilities")} disabled />
                                    <BaseInput label="Evaluation Criteria" type="text" {...register("evaluation_criteria")} disabled />
                                    <BaseInput label="Excellent Areas" type="text" {...register("excellent_areas")} disabled />
                                    <BaseInput label="Expectations" type="text" {...register("expectations")} disabled />
                                    <BaseInput label="Improvement Areas" type="text" {...register("improvement_areas")} disabled />
                                    {/* <div className="grid gap-1">
                                        <span className="input--label">Criteria Value</span>
                                        <div className="grid border border-[#DFE2E7] rounded-xl overflow-hidden">
                                            <table className="table-auto border-collapse">
                                                <thead>
                                                    <tr className="bg-[#F5F6F7]">
                                                        <th className="text-sm font-normal text-grey-40 text-left py-2 px-3">Grade</th>
                                                        <th className="text-sm font-normal text-grey-40 text-left py-2 px-3">Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">0=100</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">24</td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">E=80</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">20</td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">VG=70</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">16</td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">G=60</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">12</td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">F=50</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">8</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">P=40</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">4</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}