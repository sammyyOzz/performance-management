import { Badge, BaseSearch, RenderIf } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"
import { ViewEmployeeTask } from "@/components/page/employee-tasks"
import { useDebounce } from "@/hooks/useDebounce"
import { cn } from "@/lib/utils"
import { useGetAssignments, useGetCurrentUser } from "@/services/hooks/queries"
import { FetchedAssignmentType } from "@/types/assignment"
import { ArrowRight2, More2 } from "iconsax-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export const EmployeeTasksPage = () => {
    const { data: currentUser, isLoading: isLoadingUser } = useGetCurrentUser();
    const { data, isLoading } = useGetAssignments({ user_id: currentUser?.id, page_size: Number.MAX_SAFE_INTEGER }, { enabled: !!currentUser?.id })
    const tabs = ["all", "active", "done"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const cards = [
        { icon: <More2 size="20" color="#003A2B" />, label: "Total Tasks Assigned", value: data?.length || 0 },
        { icon: <More2 size="20" color="#003A2B"/>, label: "Total Tasks Active", value: data?.filter((item) => item?.status === "active")?.length || 0 },
        { icon: <More2 size="20" color="#003A2B"/>, label: " Total Tasks Done", value: data?.filter((item) => item?.status === "done")?.length || 0 },
    ]
    const { value, onChangeHandler } = useDebounce(500)
    const [toggleModals, setToggleModals] = useState({
        openViewEmployeeTask: false,
        activeEmployeeTask: null as null | FetchedAssignmentType
    })
    
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 page-height overflow-y-scroll bg-[#FFFFFF]">
            <RenderIf condition={!isLoadingUser}>
                <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto">
                    <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
                        <h1 className="font-semibold text-2xl text-black">{currentUser?.first_name} {currentUser?.last_name}</h1>
                        <p className="font-normal text-sm text-[#727A86]">{currentUser?.position}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-[1.875rem]">
                        {
                            cards.map((card, index) =>
                                <div key={index} className="flex items-center gap-3 py-3 px-4 border border-[#DFE2E7] rounded-xl">
                                    <div className="grid place-content-center size-10 bg-green-primary-10 rounded-full">
                                        {card.icon}
                                    </div>
                                    <div className="grid gap-2">
                                        <h2 className="font-semibold text-2xl text-green-primary-40">{card.value}</h2>
                                        <p className="font-normal text-sm text-grey-40">{card.label}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 p-1 rounded-lg w-[14.5rem] bg-[#F6F8FA]">
                                {
                                    tabs.map((tab) =>
                                        <motion.button key={tab} onClick={() => setActiveTab(tab)} className={cn("capitalize py-1 flex-1 font-medium text-sm rounded relative", activeTab === tab ? "text-gray-900" : "text-gray-400")}>
                                            {
                                                activeTab === tab ? <motion.div layoutId="active-background" id="active-background" className="absolute inset-0 bg-white-10 rounded" style={{ boxShadow: "0px 2px 4px 0px rgba(27, 28, 29, 0.02) 0px 6px 10px 0px rgba(27, 28, 29, 0.06)" }} /> : null
                                            }
                                            <span className="isolate">{tab}</span>
                                        </motion.button>
                                    )
                                }
                            </div>
                            <div className="flex items-center gap-3 w-96">
                                <BaseSearch type="text" placeholder="Search..." defaultValue={value} onChange={onChangeHandler} />
                                {/* <BaseButton size="tiny" theme="primary" variant="outlined">
                                    <span className="text-sm font-normal whitespace-nowrap">May, 2024</span>
                                    <ArrowDown2 size="14" />
                                </BaseButton> */}
                            </div>
                        </div>
                        <AnimatePresence mode="popLayout">
                            {
                                (isLoading && (data === undefined)) ? (
                                    <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
                                        <Loader className="spinner size-6 text-green-primary-40" />
                                    </div>
                                ) : (!isLoading && (data !== undefined) && (data?.length > 0)) ? (
                                    <div className="grid grid-cols-3 gap-x-5 gap-y-8">
                                        {
                                            data?.map((item, index) =>
                                                <motion.div key={index} initial={{ y: 10, opacity: 0, filter: "blur(2px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: index * 0.08, bounce: 0 }} className="relative flex flex-col p-4 gap-3 border border-[#DFE2E7] rounded-lg">
                                                    <button type="button" onClick={() => setToggleModals((prev) => ({ ...prev, openViewEmployeeTask: true, activeEmployeeTask: item }))} className="absolute inset-0 isolate" />
                                                    <Badge status={item.status as "pending" | "done" | "completed" | "warning"} label={item.status} size="medium" className="isolate" />
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-1 grid gap-1.5 isolate">
                                                            <h1 className="font-semibold text-xl text-grey-40 leading-6">{item?.sub_initiative?.name}</h1>
                                                            <p className="text-xs font-normal text-[#727A86]">Key Result Area: {item?.sub_initiative?.kpi}</p>
                                                        </div>
                                                        <ArrowRight2 size="20" color="#0F973D"/>
                                                    </div>
                                                    <hr className="flex-1 border-[#F0F2F5] isolate" />
                                                    <div className="flex items-center gap-2 isolate">
                                                        <span className="text-xs font-normal text-[#727A86]">Task weight:</span>
                                                        <span className="text-base leading-7 font-semibold text-green-secondary-40">{item?.sub_initiative?.assigned_weight}</span>
                                                    </div>
                                                </motion.div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center">No tasks found</div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </RenderIf>
            <RenderIf condition={isLoadingUser}>
                <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
            </RenderIf>
            <ViewEmployeeTask isOpen={toggleModals.openViewEmployeeTask} close={() => setToggleModals((prev) => ({ ...prev, openViewEmployeeTask: false, activeEmployeeTask: null }))} employeeTask={toggleModals.activeEmployeeTask as FetchedAssignmentType} />
        </section>
    )
}