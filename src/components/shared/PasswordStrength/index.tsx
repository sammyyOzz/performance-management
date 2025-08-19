import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { type FC, useMemo } from "react";

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

    const barStyles = useMemo(() => {
        const validCount = rules.filter(rule => rule.regex.test(value)).length;

        if (validCount === 1) {
            return [{ width: "100%", bgColor: "bg-red-50" }, { width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }];
        }

        if (validCount >= 2 && validCount < 5) {
            return [
                    { width: "100%", bgColor: "bg-yellow-50" },
                    { width: "100%", bgColor: "bg-yellow-50" },
                    { width: "0%", bgColor: "" }
                ]
        }

        if (validCount >= 5) {
            return [
                    { width: "100%", bgColor: "bg-green-secondary-40" },
                    { width: "100%", bgColor: "bg-green-secondary-40" },
                    { width: "100%", bgColor: "bg-green-secondary-40" }
                ];
        }
        return [{ width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }, { width: "0%", bgColor: "" }]
        
    }, [rules, value]);

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