import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { type FC, useCallback, useMemo } from "react";

interface PasswordStrengthProps {
  /**
   * Label for input element
   */
  value: string;
}

export const PasswordStrength: FC<PasswordStrengthProps> = ({ value }) => {
    const rules = useMemo(() => {
        return [
            { label: "At least 1 uppercase", regex: /[A-Z]+/ },
            { label: "At least 1 lowercase", regex: /[a-z]+/ },
            { label: "At least 1 number", regex: /\d+/ },
            { label: "At least 8 characters", regex: /^.{8,}$/ },
            { label: "At least 1 special character", regex: /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]+/ }
        ]
    },[])

    const getBarStyles = useCallback(() => {
        const validCount = rules.filter(rule => rule.regex.test(value)).length;

        switch (validCount) {
            case 1:
                return [{ width: "100%", bgColor: "bg-error-500" }, { width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }];
            case 2:
                return [
                    { width: "100%", bgColor: "bg-warning-500" },
                    { width: "100%", bgColor: "bg-warning-500" },
                    { width: "0%", bgColor: "" }
                ];
            case 3:
                return [
                    { width: "100%", bgColor: "bg-success-500" },
                    { width: "100%", bgColor: "bg-success-500" },
                    { width: "100%", bgColor: "bg-success-500" }
                ];
            default:
                return [{ width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }];
        }
    }, [rules, value]);

    const barStyles = getBarStyles();

    return (
        <div className="flex items-center gap-2">
            {
                barStyles.map((style, index) =>
                    <div key={index} className="bg-gray-200 h-1 flex-1 rounded-sm">
                        <motion.div initial={{ width: "0%" }} animate={{ width: style.width }} exit={{ width: "0px" }} transition={{ duration: 0.3 }} className={cn("h-1 rounded-sm", style.bgColor)} />
                    </div>
                )
            }
        </div>
    )
}