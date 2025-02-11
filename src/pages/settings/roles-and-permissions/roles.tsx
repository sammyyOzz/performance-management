import { Fragment } from "react"
import { Icon } from "@iconify-icon/react"
import riArrowDownSLine from "@iconify-icons/ri/arrow-down-s-line"
import { AnimatePresence, easeOut, motion } from "motion/react"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { BaseButton, BaseCheckbox } from "@/components/core"

interface RolesDisclosureProps {
    role: {
        label: string;
        actions: {
            label: string;
            permissions: string[];
        }[];
    }
}

function RolesDisclosure({ role }: RolesDisclosureProps) {
    return (
        <Disclosure defaultOpen as="div" className="w-full">
            {({ open }) => (
                <>
                <DisclosureButton className="flex items-center gap-1.5 w-full bg-[#F9F9F9] rounded-xl py-3.5 px-3 font-medium text-sm text-grey-40">
                    <Icon icon={riArrowDownSLine} width={20} height={20} />
                    {role?.label}
                </DisclosureButton>
                <div className="overflow-hidden">
                    <AnimatePresence>
                        {open && (
                            <DisclosurePanel static as={Fragment}>
                                <motion.div
                                    initial={{ opacity: 0, y: -24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -24 }}
                                    transition={{ duration: 0.2, ease: easeOut }}
                                    className="origin-top"
                                >
                                    {
                                            role.actions.map((action, index) =>
                                                <div key={index} className="grid grid-cols-4 border-b border-b-[#DFE2E7] pb-1 mb-1">
                                                    <div className="text-sm text-grey-40 px-3 py-6">{action.label}</div>
                                                    <div className="flex items-center py-2 px-3"><BaseCheckbox /></div>
                                                    <div className="flex items-center py-2 px-3"><BaseCheckbox /></div>
                                                    <div className="flex items-center py-2 px-3"><BaseCheckbox /></div>
                                                </div>
                                            )
                                    }
                                </motion.div>
                            </DisclosurePanel>
                        )}
                    </AnimatePresence>
                </div>
                </>
            )}
        </Disclosure>
    )
}

export const RolesPage = () => {
    const roles = [
        {
            label: "Key Result Area",
            actions: [
                {
                    label: "Can edit KRA",
                    permissions: [""]
                },
                {
                    label: "Can change KRA status",
                    permissions: [""]
                },
            ]
        },
        {
            label: "Department-Sections",
            actions: [
                {
                    label: "Can edit Department-Section KRA",
                    permissions: [""]
                },
                {
                    label: "Can delete Department-Section KRA",
                    permissions: [""]
                },
            ]
        },
        {
            label: "Department-Branches",
            actions: [
                {
                    label: "Can edit Department-Branch KRA",
                    permissions: [""]
                },
                {
                    label: "Can delete Department-Branch KRA",
                    permissions: [""]
                },
            ]
        },
        {
            label: "Department-Divison",
            actions: [
                {
                    label: "Can edit Department-Division KRA",
                    permissions: [""]
                },
                {
                    label: "Can delete Department-Division KRA",
                    permissions: [""]
                },
            ]
        },
    ]
    return (
        <Fragment>
            <div className="flex items-center justify-between">
                <div className="grid">
                    <h4 className="text-xl font-semibold text-gray-900">Team access</h4>
                    <p className="text-xs text-[#727A86]">Control the actions assigned to each role.</p>
                </div>
                <BaseButton size="small" theme="primary" variant="filled">Save Changes</BaseButton>
            </div>
            <div className="flex flex-col gap-3.5">
                <div className="bg-[#F0F1F4] rounded-lg grid grid-cols-4">
                    <div className="text-sm text-grey-40 py-2 px-3">Actions</div>
                    <div className="text-sm text-grey-40 py-2 px-3">Team Member</div>
                    <div className="text-sm text-grey-40 py-2 px-3">Manager</div>
                    <div className="text-sm text-grey-40 py-2 px-3">Admin</div>
                </div>
                {
                    roles.map((role, index) =>
                        <RolesDisclosure role={role} key={index} />
                    )
                }
            </div>
        </Fragment>
    )
}