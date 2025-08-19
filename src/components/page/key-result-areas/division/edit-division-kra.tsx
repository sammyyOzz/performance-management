import { FC, useId, useMemo } from "react"
import { Drawer } from "vaul"
import riAddFill from "@iconify-icons/ri/add-fill"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseButton, BaseInput, BaseSelectInput } from "@/components/core"
import type { FetchedSubInitiative } from "@/types/sub-initiative"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { AnimatePresence, motion } from "motion/react"
import { FetchedDepartmentType } from "@/types/department"

interface EditDivisionKraProps {
    kra: FetchedSubInitiative;
    department: FetchedDepartmentType;
    isOpen: boolean;
    close: () => void;
}

export const EditDivisionKra: FC<EditDivisionKraProps> = ({ isOpen, close, kra, department }) => {
    const idPrefix = useId()
    const { register, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            name: kra?.name || "",
            assigned_weight: kra?.assigned_weight || "",
            responsibilities: kra?.responsibilities?.map((item) => ({ id: item?.id?.toString(), department_id: item?.department_id?.toString(), department_weight: item?.department_weight?.toString(), level: item?.level })) || [] as { id: string; department_id: string; department_weight: string; level: string; }[]
        },
        enableReinitialize: true,
        onSubmit() {
            
        },
    })

    const addChildren = (level: string) => {
        return { 
            id: `${idPrefix}-${values?.responsibilities?.filter((item) => item.level === level).length}`,
            department_id: "", 
            department_weight: "",
            level
        }
    }
    const removeResponsibility = (id: string, level: string) => {
        const children = [...values.responsibilities]
        children.splice(children.indexOf(children.find((item) => (item.department_id === id) && (item.level === level))!), 1);
        setFieldValue("responsibilities", children)
    }
    const deptDivisions = useMemo(() => {
        return department?.children?.filter((item) => item?.level === "division")?.map((item) => ({ label: item?.name, value: item?.id?.toString() })) || []
    },[department?.children])
    return (
        <Drawer.Root open={isOpen} onOpenChange={close} direction="right">
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/10" style={{ backdropFilter: "blur(4px)" }} />
                <Drawer.Content
                className="right-0 top-0 bottom-0 fixed z-10 outline-none w-full max-w-[41.8125rem] flex"
                // The gap between the edge of the screen and the drawer is 8px in this case.
                style={{ "--initial-transform": "calc(100% + 0px)" } as React.CSSProperties}
                >
                    <div className="bg-white-10 h-full w-full grow p-6 flex flex-col rounded-bl-lg">
                        <div className="relative flex flex-col gap-4 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col flex-1 gap-4 overflow-y-scroll scrollbar-hide">
                                <div className="flex items-center justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900">Edit Division KRA</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <BaseInput label="Name of KRA" type="text" {...register("name")} />
                                    <BaseInput label="Departmental Weight" type="text" {...register("assigned_weight")} />
                                    <div className="flex flex-col gap-2">
                                        <AnimatePresence mode="popLayout" initial={false}>
                                        {
                                            values?.responsibilities?.filter((item) => item?.level === "division")?.map((childItem) =>
                                                <motion.div key={childItem.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                                                    <div className="grid flex-1">
                                                        <BaseSelectInput label="Responsibility" options={deptDivisions} {...register(`responsibilities.${values.responsibilities.indexOf(childItem)}.department_id` as any)} />
                                                    </div>
                                                    <div className="grid flex-1">
                                                        <BaseInput type="number" label="Assigned Weight" className="hide-number-input-arrows" {...register(`responsibilities.${values.responsibilities.indexOf(childItem)}.department_weight` as any)} />
                                                    </div>
                                                    <div className="pt-6">
                                                        <BaseButton type="button" size="small" theme="danger" variant="filled" onClick={() => removeResponsibility(childItem.id, "division")}>Remove</BaseButton>
                                                    </div>
                                                </motion.div>
                                            )
                                        }
                                        </AnimatePresence>
                                        <Button type="button" className="flex items-center justify-center gap-2 p-3 w-fit ml-auto rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => addChildren("division")}>
                                            Add division
                                            <Icon icon={riAddFill} width={16} height={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <BaseButton type="submit" size="small" theme="primary" variant="filled" block>Save changes</BaseButton>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}