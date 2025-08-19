import { FC, useMemo, useState } from "react"
import { Drawer } from "vaul"
import DatePicker from "react-datepicker"
import riAddFill from "@iconify-icons/ri/add-fill"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import riCalendar2Line from "@iconify-icons/ri/calendar-2-line"
import type { SingleKraType } from "@/types/kra"
import { editKRASchema } from "@/validations/kra"
import { AnimatePresence, motion } from "motion/react"
import { useDeleteResponsibility, useEditKra } from "@/services/hooks/mutations"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { BaseButton, BaseInput, BaseSelectInput, TextArea } from "@/components/core"
import { useGetDepartments } from "@/services/hooks/queries"

interface EditKraDetailProps {
    isOpen: boolean;
    close: () => void;
    kra: SingleKraType;
}

export const EditKraDetail: FC<EditKraDetailProps> = ({ isOpen, close, kra }) => {
    const [idToDelete, setIdToDelete] = useState("")
    const { mutate: deleteResponsibility, isPending: isDeleting } = useDeleteResponsibility(() => setIdToDelete(""))
    const { mutate, isPending } = useEditKra(() => close())
    const { data } = useGetDepartments({})
    const { dirty, errors, handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            budget_allocation: kra?.budget_allocation || 0,
            budget_released: kra?.budget_released || 0,
            description: kra?.description || "",
            donor_funding: kra?.donor_funding || 0,
            name: kra?.name || "",
            other_sources: kra?.other_sources || 0,
            responsibilities: kra?.responsibilities || [],
            weight: kra?.weight || 0
        },
        enableReinitialize: true,
        validationSchema: editKRASchema,
        onSubmit: () => {
            const { responsibilities, ...rest } = values
            const newResponsibilities = responsibilities.map((item) => ({ department_id: parseInt(item?.department_id as any), department_weight: item?.department_weight, department_name: item?.department_name, id: item?.id  }))
            mutate({ id: kra?.id, responsibilities: newResponsibilities, ...rest })
        },
    })
    const addResponsibility = () => {
        return { 
            department_id: "", 
            department_weight: "", 
            department_name: ""
        }
    }
    const removeResponsibility = (id: number) => {
        deleteResponsibility(id.toString())
        // const responsibilities = [...values.responsibilities]
        // responsibilities.splice(index, 1);
        // setFieldValue("responsibilities", responsibilities)
    }
    const departments = useMemo(() => {
        if (data === undefined) {
            return []
        }
        return data.map((item) => ({ label: item?.name, value: item?.id?.toString() }))
    },[data])
    const onClose = () => {
        close()
        resetForm()
    }
    return (
        <Drawer.Root open={isOpen} onOpenChange={onClose} direction="right">
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/10" style={{ backdropFilter: "blur(4px)" }} />
                <Drawer.Content
                className="right-0 top-0 bottom-0 fixed z-10 outline-none w-full max-w-[41.8125rem] flex"
                // The gap between the edge of the screen and the drawer is 8px in this case.
                style={{ "--initial-transform": "calc(100% + 0px)" } as React.CSSProperties}
                >
                    <div className="bg-white-10 h-full w-full grow p-6 flex flex-col rounded-bl-lg">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-14 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col gap-8 overflow-y-scroll scrollbar-hide" style={{ height: "calc(100dvh - 124px)"}}>
                                <div className="flex items-center justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900">Edit a Key Result Area</Drawer.Title>
                                    <Button type="button" className="p-3" disabled={isPending} onClick={() => onClose()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="grid w-full gap-8">
                                    <BaseInput label="Name of Objective" type="text" {...register("name")} />
                                    <TextArea label="Description" {...register("description")} />
                                    <div className="grid grid-cols-2 content-start gap-4">
                                        <div className="grid">
                                            <DatePicker
                                                // selected={values?.date as any}
                                                onChange={() => {}}
                                                // minDate={add(new Date(), { days: 1 })}
                                                dateFormat="yyyy-MM-dd"
                                                customInput={<BaseInput label="Start Date" type="text" iconRight={riCalendar2Line} />}
                                            />
                                        </div>
                                        <div className="grid">
                                            <DatePicker
                                                // selected={values?.date as any}
                                                onChange={() => {}}
                                                // minDate={add(new Date(), { days: 1 })}
                                                dateFormat="yyyy-MM-dd"
                                                customInput={<BaseInput label="End Date" type="text" iconRight={riCalendar2Line} />}
                                            />
                                        </div>
                                    </div>
                                    <BaseInput label="Budget Allocation" type="text" {...register("budget_allocation")} />
                                    <BaseInput label="Budget Released" type="text" {...register("budget_released")} />
                                    <BaseInput label="Donor Funding" type="text" {...register("donor_funding")} />
                                    <BaseInput label="Other Sources" type="text" {...register("other_sources")} />
                                    <BaseSelectInput label="Status" options={[{ label: "Active", value: "active" }]} />
                                    <BaseInput label="KRA Weight" type="text" {...register("weight")} />
                                    <AnimatePresence mode="popLayout" initial={false}>
                                    {
                                        values.responsibilities.map((responsibility, index) =>
                                            <motion.div key={responsibility.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                                                <div className="grid flex-1">
                                                    <BaseSelectInput label="Select Department" options={departments} {...register(`responsibilities.${index}.department_id` as any)} />
                                                </div>
                                                <div className="grid flex-1">
                                                    <BaseInput type="number" label="Assigned Weight" className="hide-number-input-arrows" {...register(`responsibilities.${index}.department_weight` as any)} />
                                                </div>
                                                <div className="pt-6">
                                                    <BaseButton type="button" size="small" theme="danger" variant="filled" loading={(idToDelete === responsibility.id.toString()) && isDeleting} disabled={isDeleting} block onClick={() => {
                                                        setIdToDelete(responsibility.id.toString())
                                                        removeResponsibility(responsibility.id)
                                                    }}>Remove</BaseButton>
                                                </div>
                                            </motion.div>
                                        )
                                    }
                                    </AnimatePresence>
                                    <AnimatePresence mode="popLayout" initial={false}>
                                    {
                                        (errors.responsibilities && (typeof errors.responsibilities === "string")) ? (
                                            <motion.span className="input--error" layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }}>{errors.responsibilities}</motion.span>
                                        ) : null
                                    }
                                    </AnimatePresence>
                                    <motion.div layout>
                                        <Button type="button" className="flex items-center justify-center gap-2 p-3 w-fit rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => setFieldValue("responsibilities", [...values.responsibilities, addResponsibility()])}>
                                            Add department
                                            <Icon icon={riAddFill} width={16} height={16} />
                                        </Button>
                                    </motion.div>
                                </div>

                            </div>
                            <BaseButton type="submit" size="small" theme="primary" variant="filled" disabled={!isValid || !dirty || isPending} loading={isPending} block>Save Changes</BaseButton>
                        </form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}