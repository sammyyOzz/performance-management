import { useGetCurrentUser, useGetDepartments } from "@/services/hooks/queries"
import { useNavigate } from "react-router"
import { RenderIf } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"
import { useEffect } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Buildings2 } from "iconsax-react"

const HR_ADMIN = "hr_admin";

export const DepartmentsPage = () => {
    const navigate = useNavigate()
    const { data: user, isLoading: loadingUser } = useGetCurrentUser()
    const { data: departments, isLoading: loadingDepartments } = useGetDepartments({ 
        page_size: Number.MAX_SAFE_INTEGER.toString(),
        level: "department",
        filter: user?.role === HR_ADMIN ? "" : (user?.department?.name || "").toString(),
    })

    useEffect(() => {
        if (!user?.is_superuser) {
            navigate("/kra/departments")
        }
    }, [navigate, user?.is_superuser])

    return (
        <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
            <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
                        <h1 className="font-semibold text-2xl text-black">Departments</h1>
                        <p className="font-normal text-sm text-[#667185]">Select a department to view its key result areas</p>
                    </div>
                </div>
                <RenderIf condition={!loadingUser && !loadingDepartments}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments?.map((department) => (
                            <motion.button
                                key={department.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(`/kra/departments/${department.id}`)}
                                className={cn(
                                    "flex flex-col gap-4 p-6 rounded-xl border border-[#DFE2E7] bg-white-10",
                                    "hover:border-green-primary-40 hover:shadow-lg transition-all duration-200"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="grid place-content-center size-10 bg-green-primary-10 rounded-full">
                                        <Buildings2 size="20" color="#003A2B" />
                                    </div>
                                    <div className="grid gap-1">
                                        <h2 className="font-semibold text-lg text-black capitalize">{department.name}</h2>
                                        <p className="font-normal text-sm text-[#667185]">View key result areas</p>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </RenderIf>
                <RenderIf condition={loadingUser || loadingDepartments}>
                    <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
                        <Loader className="spinner size-6 text-green-primary-40" />
                    </div>
                </RenderIf>
            </div>
        </section>
    )
} 