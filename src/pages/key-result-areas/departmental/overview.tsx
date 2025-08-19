import { BaseInput, RenderIf } from "@/components/core"
import { useGetDepartment, useGetKRAs } from "@/services/hooks/queries"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { Loader } from "@/components/core/Button/Loader"
import { useParams } from "react-router"

export const DepartmentalOverviewPage = () => {
    const { id } = useParams()
    const { data: department } = useGetDepartment(id as string)
    const { data: kra, isLoading } = useGetKRAs({ department_id: id, page_size: "10" })

    const { register } = useFormikWrapper({
        initialValues: {
            name: department?.name || "",
            divisions: department?.children?.filter((item) => item?.level === "division")?.length || "0",
            branches: department?.children?.filter((item) => item?.level === "branch")?.length || "0",
            sections: department?.children?.filter((item) => item?.level === "section")?.length || "0",
            weight: kra?.total_weight || "0"
        },
        enableReinitialize: true,
        onSubmit() {
            
        },
    })
    return (
        <div className="flex max-w-[39.0625rem] w-full">
            <RenderIf condition={!isLoading}>
                <div className="grid w-full gap-8 content-start">
                    <BaseInput label="Department Name" type="text" {...register("name")} readOnly />
                    <BaseInput label="Number of Divisions" type="text" {...register("divisions")} readOnly />
                    <BaseInput label="Number of Branches" type="text" {...register("branches")} readOnly />
                    <BaseInput label="Number of Sections" type="text" {...register("sections")} readOnly />
                    <BaseInput label="Total KRA Weight" type="text" {...register("weight")} readOnly />
                </div>
            </RenderIf>
            <RenderIf condition={isLoading}>
                <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
            </RenderIf>
        </div>
    )
}