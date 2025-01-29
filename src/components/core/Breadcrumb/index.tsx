import { cn } from "@/lib/utils"
import { BaseButton } from "../Button"
import { Fragment, type FC } from "react"
import { Icon } from "@iconify-icon/react"
import riArrowLeftSLine from "@iconify-icons/ri/arrow-left-s-line"
import { Link, type To, useNavigate } from "react-router"

type Item = {
    label: string;
    href: To;
}

interface BreadcrumbProps {
    items: Item[]
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center gap-1.5">
            <BaseButton size="small" theme="primary" variant="ghost" type="button" onClick={() => navigate(items[(items.length - 2)].href)}>
                <Icon icon={riArrowLeftSLine} width={16} height={16} />
                Back
            </BaseButton>
            <div className="flex items-center">
            {
                items.map((item, index) =>
                    <Link to={item.href}>
                        <Fragment>
                            <span className={cn(index === (items.length - 1) ? "text-green-secondary-40" : "text-[#98A2B3]", "font-medium text-sm")}>{item.label}</span>
                            { index < (items.length - 1) ? <span className="text-[#98A2B3] font-medium text-sm">&nbsp;/&nbsp;</span> : null}
                        </Fragment>
                    </Link>
                )
            }
            </div>
        </div>
    )
}