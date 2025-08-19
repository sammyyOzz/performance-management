import { Fragment } from "react"
import { NavLink, useNavigate } from "react-router"
import { Icon } from "@iconify-icon/react"
import { appRoutes } from "@/constants/routes"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { motion } from "motion/react"
import riArrowDownSLine from "@iconify-icons/ri/arrow-down-s-line"
import { useGetCurrentUser } from "@/services/hooks/queries"
import { removeItem } from "@/utils/localStorage"
import { APP_TOKEN_STORAGE_KEY, APP_USERDATA_STORAGE_KEY } from "@/constants/utils"

export const Header = () => {
    const navigate = useNavigate()
    const { data } = useGetCurrentUser()

    function logout() {
        removeItem(APP_TOKEN_STORAGE_KEY)
        removeItem(APP_USERDATA_STORAGE_KEY)
        navigate("/auth/login")
    }

    return (
        <nav className="flex items-center justify-between px-12 pt-5 bg-accent-30 border-b border-b-[#DFE2E7]">
            <div className="flex items-end gap-10">
                <div className="pb-2">
                    <img src="/appraisium-logo.png" height={20} width={121.4} />
                </div>
                <div className="flex items-end gap-3">
                    {
                        appRoutes.map((route) =>
                            <NavLink key={route.path} to={route.path} className="relative text-xs py-5 px-3">
                                {({ isActive }) => (
                                    <Fragment>
                                        <span className={isActive ? "text-green-primary-40" : "text-[#98A2B3]"}>{route.name}</span>
                                            {
                                                isActive ? (
                                                    <motion.div layoutId="underline" id="underline" className="inset-x-0 bg-green-primary-40 h-1 absolute bottom-0" />
                                                ) : null
                                            }
                                    </Fragment>
                                )}
                            </NavLink>
                        )
                    }
                </div>
            </div>
            <div className="flex items-center pb-3.5 gap-3">
                <div className="flex items-center gap-1">
                    
                    <Menu>
                        <MenuButton className="inline-flex items-center text-green-primary-40 data-[hover]:text-green-primary-50 data-[open]:text-green-primary-50 data-[focus]:outline-0 data-[focus]:outline-none">
                            <div className="grid place-content-center uppercase bg-green-primary-40 rounded-full border border-green-secondary-10 text-white-10 text-sm font-medium size-[1.875rem]">
                                {data?.first_name?.[0]}{data?.last_name?.[0]}
                            </div>
                            <Icon icon={riArrowDownSLine} width={12} height={12} />
                        </MenuButton>
                        <MenuItems
                            transition
                            anchor={{ to: "bottom end" }}
                            className="w-52 origin-top-right mt-3 rounded-xl border border-gray-50 bg-white-10 p-1 text-sm/6 text-white transition duration-150 ease-out focus:outline-none data-[closed]:scale-75 data-[closed]:opacity-0"
                        >
                            <MenuItem>
                                <button onClick={logout} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 transition-colors duration-150 ease-out data-[focus]:bg-green-primary-10/50 data-[focus]:text-green-primary-40">
                                    Logout
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}