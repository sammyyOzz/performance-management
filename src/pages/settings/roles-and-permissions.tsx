import { cn } from "@/lib/utils"
import { Add } from "iconsax-react"
import { motion } from "motion/react"
import useMeasure from "react-use-measure"
import { Fragment, useEffect, useState } from "react"
import { BaseButton } from "@/components/core"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router"
import { AddUser } from "@/components/page/settings"

const rolesAndPermissionsRoutes = [
    { name: "Users", path: "/settings/roles-and-permissions/users" },
    { name: "Roles", path: "/settings/roles-and-permissions/roles" },
]

export const RolesAndPermissionsPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [ref, bounds] = useMeasure()
    const [openAddUser, setOpenAddUser] = useState(false)
    
    useEffect(() => {
        if (location.pathname === "/settings/roles-and-permissions") {
            navigate("/settings/roles-and-permissions/users")
        }
    },[location, location.pathname, navigate])
    return (
        <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
            <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between p-4 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <div className="grid gap-1">
                        <h1 className="font-semibold text-xl text-black">Team Members</h1>
                        <p className="font-normal text-xs text-[#727A86]">Invite and manage team members in your organization</p>
                    </div>
                    <BaseButton type="button" size="small" theme="primary" variant="filled" onClick={() => setOpenAddUser(true)}>
                        Add User
                        <Add size="20" />
                    </BaseButton>
                </div>
                <motion.div animate={{ height: bounds.height }} className="bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <div ref={ref} className="flex flex-col gap-8 p-6">
                        <div className="flex items-center w-full">
                            {
                                rolesAndPermissionsRoutes.map((route) =>
                                    <NavLink key={route.path} to={route.path} className="relative flex-1 text-center py-4 border-b border-b-[#DFE2E7]">
                                        {({ isActive }) => (
                                            <Fragment>
                                                <span className={cn(isActive ? "text-green-primary-40" : "text-[#727A86]", "font-medium text-sm")}>{route.name}</span>
                                                    {
                                                        isActive ? (
                                                            <motion.div layoutId="roles-and-permissions-underline" id="roles-and-permissions-underline" className="inset-x-0 bg-green-primary-40 h-px absolute -bottom-px" />
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
                </motion.div>
            </div>
            <AddUser isOpen={openAddUser} close={() => setOpenAddUser(false)} />
        </section>
    )
}