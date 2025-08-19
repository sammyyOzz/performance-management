import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { useNavigate, useParams } from "react-router"
import { Button } from "@headlessui/react"
import { Icon } from "@iconify-icon/react"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce"
import { useGetAssignments, useGetCurrentUser, useGetUser, useGetImprovementPlans } from "@/services/hooks/queries"
import { Add, ArrowRight2, More2, Trash } from "iconsax-react"
import { Badge, BaseButton, BaseSearch, Breadcrumb } from "@/components/core"
import { CreateEmployeeTask, DeleteEmployeeTask, EditEmployeeTask, MarkEmployeeTask } from "@/components/page/employee-tasks"
import { FetchedUserType } from "@/types/user"
import { Loader } from "@/components/core/Button/Loader"
import { FetchedAssignmentType } from "@/types/assignment"
import { FetchedImprovementPlanType } from "@/types/improvement-plan"

const tabs = ["all", "active", "done", "improvement-plans"]

const breadcrumbs = [
    { label: "Subordinates Tasks", href: "/tasks/subordinates" },
    { label: "View Tasks", href: "/tasks/subordinates/1" },
]
    
export const SubordinateTasksPage = () => {
    const params = useParams()
    const router = useNavigate()
    const { data: user } = useGetCurrentUser()
    const { data: fetchedUser } = useGetUser(params?.id as string)
    const { data, isLoading } = useGetAssignments({ user_id: parseInt(params?.id as string), page_size: 10 }, { enabled: !!params?.id })
    const { data: improvementPlans, isLoading: isLoadingImprovementPlans } = useGetImprovementPlans({ user_id: parseInt(params?.id as string), page_size: 10 }, { enabled: !!params?.id })
    const { value, onChangeHandler } = useDebounce(500)
    const [activeTab, setActiveTab] = useState(tabs[0])
    
    const cards = [
        { icon: <More2 size="20" color="#003A2B" />, label: "Total Tasks Assigned", value: data?.length || 0 },
        { icon: <More2 size="20" color="#003A2B"/>, label: "Total Tasks Active", value: data?.filter((item: FetchedAssignmentType) => item.status === "active")?.length || 0 },
        { icon: <More2 size="20" color="#003A2B"/>, label: "Total Tasks Done", value: data?.filter((item: FetchedAssignmentType) => item.status === "done")?.length || 0 },
        { icon: <More2 size="20" color="#003A2B"/>, label: "Improvement Plans", value: improvementPlans?.data?.length || 0 },
    ]
    const [toggleModals, setToggleModals] = useState({
        openCreateEmployeeTask: false,
        openDeleteEmployeeTask: false,
        openMarkEmployeeTask: false,
        openEditEmployeeTask: false,
        activeEmployeeTask: null as null | FetchedAssignmentType
    })

    useEffect(() => {
        if (!user?.is_superuser) {
            router("/tasks")
        }
    },[router, user?.is_superuser])
    
    const toggleCreateTask = useCallback(() => {
        setToggleModals((prev) => ({
            ...prev,
            openCreateEmployeeTask: !toggleModals.openCreateEmployeeTask,
        }))
    }, [toggleModals.openCreateEmployeeTask])
    
    const toggleDeleteTask = useCallback((item: null | FetchedAssignmentType) => {
        setToggleModals((prev) => ({
            ...prev,
            activeEmployeeTask: item,
            openDeleteEmployeeTask: !toggleModals.openDeleteEmployeeTask,
        }))
    }, [toggleModals.openDeleteEmployeeTask])
    
    const toggleMarkTask = useCallback((item: null | FetchedAssignmentType) => {
        setToggleModals((prev) => ({
            ...prev,
            activeEmployeeTask: item,
            openMarkEmployeeTask: !toggleModals.openMarkEmployeeTask,
        }))
    }, [toggleModals.openMarkEmployeeTask])
    
    const toggleEditTask = useCallback((item: null | FetchedAssignmentType) => {
        setToggleModals((prev) => ({
            ...prev,
            activeEmployeeTask: item,
            openEditEmployeeTask: !toggleModals.openEditEmployeeTask,
        }))
    }, [toggleModals.openEditEmployeeTask])
    
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 page-height overflow-y-scroll bg-[#FFFFFF]">
            <div className="flex flex-col flex-1 gap-3.5 max-w-screen-2xl mx-auto">
                <Breadcrumb items={breadcrumbs} />
                <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
                    <h1 className="font-semibold text-2xl text-black">{fetchedUser?.first_name} {fetchedUser?.last_name}</h1>
                    <p className="font-normal text-sm text-[#727A86]">{fetchedUser?.position}</p>
                </div>
                <div className="grid grid-cols-4 gap-[1.875rem] pt-[1.375rem]">
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
                <div className="flex flex-col gap-8 pt-[1.375rem]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 p-1 rounded-lg w-[22rem] bg-[#F6F8FA]">
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
                        <div className="flex items-center gap-3 w-1/2">
                            <BaseSearch type="text" placeholder="Search..." defaultValue={value} onChange={onChangeHandler} />
                            {/* <BaseButton size="tiny" theme="primary" variant="outlined">
                                <span className="text-sm font-normal whitespace-nowrap">May, 2024</span>
                                <ArrowDown2 size="14" />
                            </BaseButton> */}
                            {activeTab !== "improvement-plans" && (
                                <BaseButton size="tiny" theme="primary" variant="filled" onClick={() => toggleCreateTask()}>
                                    <span className="text-sm font-normal whitespace-nowrap">Create Tasks</span>
                                    <Add size="16" />
                                </BaseButton>
                            )}
                        </div>
                    </div>
                    <AnimatePresence mode="popLayout">
                        {activeTab === "improvement-plans" ? (
                            // Improvement Plans Tab Content
                            (isLoadingImprovementPlans && (improvementPlans === undefined)) ? (
                                <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
                                    <Loader className="spinner size-6 text-green-primary-40" />
                                </div>
                            ) : (!isLoadingImprovementPlans && (improvementPlans !== undefined) && (improvementPlans?.data?.length > 0)) ? (
                                <div className="grid grid-cols-3 gap-x-5 gap-y-8">
                                    {
                                        improvementPlans?.data?.map((item: FetchedImprovementPlanType, index: number) =>
                                            <motion.div key={index} initial={{ y: 10, opacity: 0, filter: "blur(2px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: index * 0.08, bounce: 0 }} className="relative flex flex-col p-4 gap-3 border border-[#DFE2E7] rounded-lg">
                                                <Badge status="pending" label="Improvement Plan" size="medium" className="isolate" />
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1 grid gap-1.5 isolate">
                                                        <h1 className="font-semibold text-xl text-grey-40 leading-6">Improvement Plan</h1>
                                                        <p className="text-xs font-normal text-[#727A86]">Area: {item?.improvement_area}</p>
                                                    </div>
                                                    <button type="button" className="p-1">
                                                        <ArrowRight2 size="20" color="#0F973D"/>
                                                    </button>
                                                </div>
                                                <hr className="flex-1 border-[#F0F2F5] isolate" />
                                                <div className="flex items-center justify-between isolate">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-normal text-[#727A86]">Actions:</span>
                                                        <span className="text-base leading-7 font-semibold text-green-secondary-40">{item?.actions?.length || 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-normal text-[#727A86]">Created:</span>
                                                        <span className="text-xs font-normal text-[#727A86]">{new Date(item?.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="text-center">No improvement plans found</div>
                            )
                        ) : (
                            // Tasks Tab Content
                            (isLoading && (data === undefined)) ? (
                                <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
                                    <Loader className="spinner size-6 text-green-primary-40" />
                                </div>
                            ) : (!isLoading && (data !== undefined) && (data?.length > 0)) ? (
                                <div className="grid grid-cols-3 gap-x-5 gap-y-8">
                                    {
                                        data?.map((item, index) =>
                                            <motion.div key={index} initial={{ y: 10, opacity: 0, filter: "blur(2px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: index * 0.08, bounce: 0 }} className="relative flex flex-col p-4 gap-3 border border-[#DFE2E7] rounded-lg">
                                                <Badge status={item.status === "done" ? "completed" : "pending"} label={item?.status} size="medium" className="isolate" />
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1 grid gap-1.5 isolate">
                                                        <h1 className="font-semibold text-xl text-grey-40 leading-6">{item?.sub_initiative?.name}</h1>
                                                        <p className="text-xs font-normal text-[#727A86]">Key Result Area: {item?.sub_initiative?.kpi}</p>
                                                    </div>
                                                    <button type="button" onClick={() => toggleEditTask(item)} className="p-1">
                                                        <ArrowRight2 size="20" color="#0F973D"/>
                                                    </button>
                                                </div>
                                                <hr className="flex-1 border-[#F0F2F5] isolate" />
                                                <div className="flex items-center justify-between isolate">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-normal text-[#727A86]">Task weight:</span>
                                                        <span className="text-base leading-7 font-semibold text-green-secondary-40">{item?.sub_initiative?.assigned_weight}</span>
                                                    </div>
                                                    {
                                                        item?.status === "active" ? (
                                                            <div className="flex items-center gap-3">
                                                                <Button className="flex items-center gap-1 text-red-40 text-xs bg-red-10 rounded px-2 py-1.5" onClick={() => toggleDeleteTask(item)}>
                                                                    Remove Task
                                                                    <Trash size="16" color="#D42620"/>
                                                                </Button>
                                                                <Button className="flex items-center gap-1 text-white-10 text-xs bg-green-primary-40 rounded px-2 py-1.5" onClick={() => toggleMarkTask(item)}>
                                                                    Mark as done
                                                                    <Icon icon="lucide:check" width={16} height={16} />
                                                                </Button>
                                                            </div>
                                                        ) : null
                                                    }
                                                </div>
                                            </motion.div>
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="text-center">No tasks found</div>
                            )
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <CreateEmployeeTask user={fetchedUser as FetchedUserType} isOpen={toggleModals.openCreateEmployeeTask} close={() => toggleCreateTask()} />
            <DeleteEmployeeTask task={toggleModals.activeEmployeeTask as FetchedAssignmentType} isOpen={toggleModals.openDeleteEmployeeTask} close={() => toggleDeleteTask(null)} />
            <EditEmployeeTask task={toggleModals.activeEmployeeTask as FetchedAssignmentType} isOpen={toggleModals.openEditEmployeeTask} close={() => toggleEditTask(null)} />
            <MarkEmployeeTask task={toggleModals.activeEmployeeTask as FetchedAssignmentType} isOpen={toggleModals.openMarkEmployeeTask} close={() => toggleMarkTask(null)} />
        </section>
    )
}