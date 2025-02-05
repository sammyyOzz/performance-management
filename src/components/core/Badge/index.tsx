import "./badge.css"
import { type FC } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
    status: "completed" | "pending"
    label?: string
}

export const Badge: FC<BadgeProps> = ({ label = null, status }) => {
    return (
        <div className={cn("badge", `badge-${status}`)}>
            <div className="grid size-4 place-content-center">
                <span className={cn("size-1.5 rounded-full", `badge-${status}-icon`)} />
            </div>
            <span className="font-medium text-xs capitalize">{label ?? status}</span>
        </div>
    )
}