import { FC, useId, useMemo } from "react"
import { Drawer } from "vaul"
import riAddFill from "@iconify-icons/ri/add-fill"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { AnimatePresence, motion } from "motion/react"
import { BaseButton, BaseInput, BaseSelectInput } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { createDepartmentSchema } from "@/validations/department"
import { useCreateDepartment } from "@/services/hooks/mutations/useDepartment"

interface AddDepartmentProps {
    isOpen: boolean;
    close: () => void;
}

export const AddDepartment: FC<AddDepartmentProps> = ({ isOpen, close }) => {
    const idPrefix = useId()
    const { mutate, isPending } = useCreateDepartment(() => onClose())
    const { dirty, errors, handleSubmit, isValid, register, resetForm, setFieldValue, values } = useFormikWrapper({
        initialValues: {
            name: "",
            level: "department",
            children: [] as { id: string; name: string; level: string; parent: string; }[],
        },
        validationSchema: createDepartmentSchema,
        onSubmit: () => {
            const { children, ...rest } = values 
            const payload = buildPayload(children)
            mutate({ ...rest, children: payload })
        },
    })
    const divisions = useMemo(() => {
        return values.children.filter((item) => (item.level === "division") && !!item.name)?.map((item) => ({ label: item?.name, value: item?.name })) || []
    },[values.children])
    const branches = useMemo(() => {
        return values.children.filter((item) => (item.level === "branch") && !!item.name)?.map((item) => ({ label: item?.name, value: item?.name })) || []
    },[values.children])
    const addChildren = (level: string) => {
        return { 
            id: `${idPrefix}-${values.children.filter((item) => item.level === level).length}`,
            name: "", 
            parent: "",
            level
        }
    }
    const removeResponsibility = (id: string, level: string) => {
        const children = [...values.children]
        children.splice(children.indexOf(children.find((item) => (item.id === id) && (item.level === level))!), 1);
        setFieldValue("children", children)
    }

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
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900">Create a Department</Drawer.Title>
                                    <Button type="button" className="p-3" disabled={isPending} onClick={() => onClose()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="grid w-full gap-8">
                                    <BaseInput label="Name of Department" type="text" {...register("name")} />
                                    {/* <BaseSelectInput label="Head of Department" options={[]} /> */}
                                    <div className="grid gap-2">
                                        <span className="input--label">Division</span>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                        {
                                            values.children.filter((item) => item?.level === "division").map((childItem) =>
                                                <motion.div key={childItem.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                                                    <div className="grid flex-1">
                                                        <BaseInput label="Division name" type="text" {...register(`children.${values.children.indexOf(childItem)}.name` as any)} />
                                                    </div>
                                                    <div className="pt-6">
                                                        <BaseButton type="button" size="small" theme="danger" variant="filled" onClick={() => removeResponsibility(childItem.id, "division")}>Remove</BaseButton>
                                                    </div>
                                                </motion.div>
                                            )
                                        }
                                        </AnimatePresence>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                        {
                                            (errors.children && (typeof errors.children === "string")) ? (
                                                <motion.span className="input--error" layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }}>{errors.children}</motion.span>
                                            ) : null
                                        }
                                        </AnimatePresence>
                                        <motion.div layout animate={{ width: values.children.filter((item) => item?.level === "division").length > 0 ? "fit-content" : "100%" }} className="flex items-center justify-end ml-auto">
                                            <Button type="button" className="flex flex-1 items-center justify-center gap-2 p-3 rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => setFieldValue("children", [...values.children, addChildren("division")])}>
                                                Add division
                                                <Icon icon={riAddFill} width={16} height={16} />
                                            </Button>
                                        </motion.div>
                                    </div>
                                    <div className="grid gap-2">
                                        <span className="input--label">Branches</span>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                        {
                                            values.children.filter((item) => item?.level === "branch").map((childItem) =>
                                                <motion.div key={childItem.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                                                    <div className="grid flex-1">
                                                        <BaseSelectInput label="Assigned Division" options={divisions} {...register(`children.${values.children.indexOf(childItem)}.parent` as any)} />
                                                    </div>
                                                    <div className="grid flex-1">
                                                        <BaseInput label="Branch name" type="text" {...register(`children.${values.children.indexOf(childItem)}.name` as any)} />
                                                    </div>
                                                    <div className="pt-6">
                                                        <BaseButton type="button" size="small" theme="danger" variant="filled" onClick={() => removeResponsibility(childItem.id, "branch")}>Remove</BaseButton>
                                                    </div>
                                                </motion.div>
                                            )
                                        }
                                        </AnimatePresence>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                        {
                                            (errors.children && (typeof errors.children === "string")) ? (
                                                <motion.span className="input--error" layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }}>{errors.children}</motion.span>
                                            ) : null
                                        }
                                        </AnimatePresence>
                                        <motion.div layout animate={{ width: values.children.filter((item) => item?.level === "branch").length > 0 ? "fit-content" : "100%" }} className="flex items-center justify-end ml-auto">
                                            <Button type="button" className="flex flex-1 items-center justify-center gap-2 p-3 rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => setFieldValue("children", [...values.children, addChildren("branch")])}>
                                                Add branch
                                                <Icon icon={riAddFill} width={16} height={16} />
                                            </Button>
                                        </motion.div>
                                    </div>
                                    <div className="grid gap-2">
                                        <span className="input--label">Sections</span>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                        {
                                            values.children.filter((item) => item?.level === "section").map((childItem) =>
                                                <motion.div key={childItem.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                                                    <div className="grid flex-1">
                                                        <BaseSelectInput label="Assigned Branch" options={branches} {...register(`children.${values.children.indexOf(childItem)}.parent` as any)} />
                                                    </div>
                                                    <div className="grid flex-1">
                                                        <BaseInput label="Section name" type="text" {...register(`children.${values.children.indexOf(childItem)}.name` as any)} />
                                                    </div>
                                                    <div className="pt-6">
                                                        <BaseButton type="button" size="small" theme="danger" variant="filled" onClick={() => removeResponsibility(childItem.id, "section")}>Remove</BaseButton>
                                                    </div>
                                                </motion.div>
                                            )
                                        }
                                        </AnimatePresence>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                        {
                                            (errors.children && (typeof errors.children === "string")) ? (
                                                <motion.span className="input--error" layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }}>{errors.children}</motion.span>
                                            ) : null
                                        }
                                        </AnimatePresence>
                                        <motion.div layout animate={{ width: values.children.filter((item) => item?.level === "section").length > 0 ? "fit-content" : "100%" }} className="flex items-center justify-end ml-auto">
                                            <Button type="button" className="flex flex-1 items-center justify-center gap-2 p-3 rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => setFieldValue("children", [...values.children, addChildren("section")])}>
                                                Add section
                                                <Icon icon={riAddFill} width={16} height={16} />
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>

                            </div>
                            <BaseButton type="submit" size="small" theme="primary" variant="filled" disabled={!isValid || !dirty || isPending} loading={isPending} block>Create Department</BaseButton>
                        </form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

// Input node from your `children` array
interface FlatNode {
  id: string;
  name: string;
  parent: string;
  level: string;
}

// Output node for the `payload` array
interface TreeNode {
  name: string;
  level: string;
  children?: TreeNode[];
}

const buildPayload = (nodes: FlatNode[]): TreeNode[] => {
  const map: Map<string, TreeNode> = new Map();

  // Initialize the map with node references and default empty children array
  nodes.forEach((node) => {
    map.set(node.name, {
      name: node.name,
      level: node.level,
      children: []
    });
  });

  const payload: TreeNode[] = [];

  // Link children to their parent
  nodes.forEach((node) => {
    const currentNode = map.get(node.name);

    if (!currentNode) return;

    if (node.parent && map.has(node.parent)) {
      const parentNode = map.get(node.parent);

      if (parentNode && parentNode.children) {
        parentNode.children.push(currentNode);
      }
    } else {
      // If there’s no parent, push it to top-level payload
      payload.push(currentNode);
    }
  });

  return payload;
};
