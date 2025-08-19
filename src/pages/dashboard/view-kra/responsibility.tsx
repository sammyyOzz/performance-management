import { BaseInput, RenderIf } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { useGetKRA } from "@/services/hooks/queries"
import { useParams } from "react-router"

export const KraResponsibilityPage = () => {
    const { id } = useParams()
    const { data } = useGetKRA(id as string)

    const { register, values } = useFormikWrapper({
        initialValues: {
            ...data
        },
        enableReinitialize: true,
        onSubmit: () => {}
    })
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3">
                <BaseInput label="Weight" type="text" {...register("weight")} readOnly />
            </div>
            <RenderIf condition={!!(values?.responsibilities && (values?.responsibilities?.length > 0))}>
            <div className="flex border border-[#DFE2E7] rounded-lg px-6 pt-3 pb-12">
                <div className="grid grid-cols-3 gap-8 w-full">
                {
                    values?.responsibilities?.map((_, index) =>
                        <div key={index} className="grid grid-cols-2 col-span-2 gap-4 content-start">
                            <BaseInput label="Department" type="text" {...register(`responsibilities.${index}.department_name` as any)} readOnly />
                            <BaseInput label="Departmental Weight" type="text" {...register(`responsibilities.${index}.department_weight` as any)} readOnly />
                        </div>
                    )
                }
                </div>
            </div>
            </RenderIf>
        </div>
    )
}