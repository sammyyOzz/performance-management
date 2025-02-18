import { Fragment, useCallback, useEffect, useState } from "react"
import { motion } from "motion/react"
import { Icon } from "@iconify-icon/react"
import riPencilLine from "@iconify-icons/ri/pencil-line"
import { NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router"
import riDeleteBin6Line from "@iconify-icons/ri/delete-bin-6-line"
import { Badge, BaseButton, Breadcrumb } from "@/components/core"
import { DeleteKraDetail, EditKraDetail } from "@/components/page/dashboard"

export const ViewDashboardKraPage = () => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const [toggleModals, setToggleModals] = useState({
        openDeleteKraDetail: false,
        openEditKraDetail: false
    })

    const kraRoutes = [
        { name: "Overview", path: `/dashboard/kra/${id}/overview` },
        { name: "Responsibility", path: `/dashboard/kra/${id}/responsibility` },
    ]
    
    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "View KRAs", href: "/dashboard/kra" },
        { label: "KRA Detail", href: "/dashboard/kra/1" },
    ]

    const toggleDeleteKraDetail = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openDeleteKraDetail: !toggleModals.openDeleteKraDetail,
      }))
    },[toggleModals.openDeleteKraDetail])

    const toggleEditKraDetail = useCallback(() => {
      setToggleModals((prev) => ({
        ...prev,
        openEditKraDetail: !toggleModals.openEditKraDetail,
      }))
    },[toggleModals.openEditKraDetail])
    
    useEffect(() => {
        if (location.pathname === `/dashboard/kra/${id}`) {
            navigate(`/dashboard/kra/${id}/overview`, { replace: true})
        }
    },[id, location.pathname, navigate])
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-0 page-height overflow-y-scroll">
            <div className="flex flex-col flex-1 gap-5 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-5">
                    <Breadcrumb items={breadcrumbs} />
                    <div className="flex flex-col items-start gap-4 md:gap-10 md:flex-row md:justify-between py-2">
                        <div className="grid gap-0.5">
                            <h1 className="font-semibold text-black text-2xl">Optimization of Crude Oil and Gas reserves to 40 million barrels and 220tcf respectively</h1>
                            <p className="font-normal text-gray-500 text-sm">See the key result area of the organisation</p>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <BaseButton type="button" size="tiny" theme="primary" variant="outlined" onClick={() => toggleEditKraDetail()}>
                                <Icon icon={riPencilLine} width={16} height={16} />
                                Edit
                            </BaseButton>
                            <BaseButton type="button" size="tiny" theme="danger" variant="filled" onClick={() => toggleDeleteKraDetail()}>
                                <Icon icon={riDeleteBin6Line} width={16} height={16} />
                                Delete
                            </BaseButton>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-1">
                        Status: <Badge status="pending" label="Active" size="medium" />
                    </div>
                    <div className="flex items-center w-full border-b border-b-[#DFE2E7]">
                    {
                        kraRoutes.map((route) =>
                            <NavLink key={route.path} to={route.path} className="relative text-xs py-5 px-3">
                                {({ isActive }) => (
                                    <Fragment>
                                        <span className={isActive ? "text-green-primary-40" : "text-[#98A2B3]"}>{route.name}</span>
                                            {
                                                isActive ? (
                                                    <motion.div layoutId="kra-underline" id="kra-underline" className="inset-x-0 bg-green-primary-40 h-1 absolute bottom-0" />
                                                ) : null
                                            }
                                    </Fragment>
                                )}
                            </NavLink>
                        )
                    }
                    </div>
                    <Outlet />
                </div>
            </div>
            <DeleteKraDetail isOpen={toggleModals.openDeleteKraDetail} close={() => toggleDeleteKraDetail()} />
            <EditKraDetail isOpen={toggleModals.openEditKraDetail} close={() => toggleEditKraDetail()} />
        </section>
    )
}