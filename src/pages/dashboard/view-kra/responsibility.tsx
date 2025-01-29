import { BaseInput } from "@/components/core"

export const KraResponsibilityPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3">
                <BaseInput label="Weight" type="text" value="9" readOnly />
            </div>
            <div className="flex border border-[#DFE2E7] rounded-lg px-6 pt-3 pb-12">
                <div className="grid grid-cols-3 gap-8 w-full">
                    <div className="grid grid-cols-2 col-span-2 gap-4 content-start">
                        <BaseInput label="Department" type="text" value="9" readOnly />
                        <BaseInput label="Departmental Weight" type="text" inputMode="numeric" value="9" readOnly />
                    </div>
                    <div className="grid grid-cols-2 col-span-2 gap-4 content-start">
                        <BaseInput label="Department" type="text" value="9" readOnly />
                        <BaseInput label="Departmental Weight" type="text" inputMode="numeric" value="9" readOnly />
                    </div>
                    <div className="grid grid-cols-2 col-span-2 gap-4 content-start">
                        <BaseInput label="Department" type="text" value="9" readOnly />
                        <BaseInput label="Departmental Weight" type="text" inputMode="numeric" value="9" readOnly />
                    </div>
                </div>
            </div>
        </div>
    )
}