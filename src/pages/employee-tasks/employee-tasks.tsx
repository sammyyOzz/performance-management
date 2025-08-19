import { EmployeeTasksPage } from "./employee"
import { AdminTasksPage } from "./admin"
import { useGetCurrentUser } from "@/services/hooks/queries"
import { useLocation, useNavigate } from "react-router"
import { RenderIf } from "@/components/core"
import { Loader } from "@/components/core/Button/Loader"
import { useEffect } from "react"

export const EmployeeTasksLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { data: user, isLoading } = useGetCurrentUser()

    useEffect(() => {
        if (user?.is_superuser) {
            if (location.pathname === "/tasks") {
                navigate("/tasks/subordinates")
            }
        } else {
            navigate("/tasks")
        }
    },[location.pathname, navigate, user?.is_superuser])

    return (
        <>
            <RenderIf condition={!isLoading}>
                {!user?.is_superuser ? <EmployeeTasksPage /> : <AdminTasksPage />}
            </RenderIf>
            <RenderIf condition={isLoading}>
                <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
            </RenderIf>
        </>
    )
}