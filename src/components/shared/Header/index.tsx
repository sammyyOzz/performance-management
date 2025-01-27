import { appRoutes } from "@/constants/routes"

import { Notification } from "iconsax-react"
import { AnimatePresence, motion } from "motion/react"
import { NavLink } from "react-router"
import { Fragment } from "react/jsx-runtime"

export const Header = () => {
    return (
        <nav className="flex items-center justify-between px-12 pt-5 bg-accent-10 border-b border-b-[#DFE2E7]">
            <div className="flex items-end gap-10">
                <div className="pb-2">
                    <img src="/mpr_logo.svg" height={50} width={181.4} />
                </div>
                <div className="flex items-end gap-3">
                    {
                        appRoutes.map((route) =>
                            <NavLink key={route.path} to={route.path} className="relative text-xs py-5 px-3">
                                {({ isActive }) => (
                                    <Fragment>
                                        <span className={isActive ? "text-green-primary-40" : "text-[#98A2B3]"}>{route.name}</span>
                                        <AnimatePresence>
                                            {
                                                isActive ? (
                                                    <motion.div layout className="inset-x-0 bg-green-primary-40 h-1 absolute bottom-0" />
                                                ) : null
                                            }
                                        </AnimatePresence>
                                    </Fragment>
                                )}
                            </NavLink>
                        )
                    }
                </div>
            </div>
            <div className="flex items-center pb-3.5 gap-3">
                <Notification size="22" color="#727A86" variant="Bold"/>
            </div>
        </nav>
    )
}