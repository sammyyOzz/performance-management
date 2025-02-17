import "./badge.css"
import { type FC } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
    status: "completed" | "pending"
    label?: string
    size?: "small" | "medium" | "large"
}

export const Badge: FC<BadgeProps> = ({ label = null, status, size = "small" }) => {
    return (
        <div className={cn("badge", `badge-${status}`, `badge-${size}`)}>
            <div className="grid size-4 place-content-center">
                <span className={cn("size-1.5 rounded-full", `badge-${status}-icon`)} />
            </div>
            <span className="font-medium text-xs capitalize">{label ?? status}</span>
        </div>
    )
}