import { Notification } from "iconsax-react"

export const Header = () => {
    return (
        <nav className="flex items-center justify-between px-12 pt-5 bg-accent-10 border-b border-b-[#DFE2E7]">
            <div className="pb-2">
                <img src="/mpr_logo.svg" height={50} width={181.4} />
            </div>
            <div className="flex items-center pb-3.5 gap-3">
                <Notification size="22" color="#727A86" variant="Bold"/>
            </div>
        </nav>
    )
}