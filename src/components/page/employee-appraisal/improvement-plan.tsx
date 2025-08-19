import { FC, useState } from "react"
import { Icon } from "@iconify-icon/react"
import riAddFill from "@iconify-icons/ri/add-fill"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { FetchedUserType } from "@/types/user"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { BaseButton, BaseInput, TextArea } from "@/components/core"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useCreateImprovementPlan } from "@/services/hooks/mutations/useImprovementPlan"
import { CreateImprovementPlanParams, ImprovementPlanAction } from "@/types/improvement-plan"
import { ImprovementPlanSchema } from "@/validations/improvement-plan"

interface ImprovementPlanProps {
    isOpen: boolean;
    close: () => void;
    user: FetchedUserType;
}

export const ImprovementPlan: FC<ImprovementPlanProps> = ({ isOpen, close, user }) => {
    const [reviewDate] = useState(() => {
        const date = new Date();
        return `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    });
    
    const [reviewMonth] = useState(() => {
        return new Date().toLocaleString('default', { month: 'long' });
    });
    
    // Track touched fields manually
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    
    const { mutate: createImprovementPlan, isPending } = useCreateImprovementPlan(() => {
        onClose();
    });

    const { values, handleSubmit, setFieldValue, resetForm } = useFormikWrapper<CreateImprovementPlanParams>({
        initialValues: {
            improvementArea: "",
            expectedStandards: "",
            actions: [
                {
                    concernArea: "",
                    improvementActions: "",
                    resources: ""
                }
            ],
            userID: user?.id || 0
        },
        validationSchema: ImprovementPlanSchema,
        onSubmit: (values) => {
            createImprovementPlan({ ...values, userID: user?.id });
        },
    });
    
    const onClose = () => {
        close();
        resetForm();
        setTouchedFields({});
    };

    const addPlan = () => {
        setFieldValue("actions", [
            ...values.actions,
            {
                concernArea: "",
                improvementActions: "",
                resources: ""
            }
        ]);
    };

    const removePlan = (index: number) => {
        const updatedActions = [...values.actions];
        updatedActions.splice(index, 1);
        setFieldValue("actions", updatedActions);
    };
    
    // Mark a field as touched
    const handleFieldTouch = (fieldName: string) => {
        setTouchedFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };
    
    // Custom register for main form fields with error handling
    const registerMainField = (field: keyof CreateImprovementPlanParams) => {
        if (field === 'actions' || field === 'userID') return {};
        
        const fieldName = field;
        const errorMessage = field === 'improvementArea' 
            ? 'Please specify areas for improvement' 
            : 'Expected standards are required';
            
        return {
            name: fieldName,
            onChange: (e: React.ChangeEvent<any>) => {
                const newValue = e.target.value;
                setFieldValue(fieldName, newValue);
            },
            onBlur: () => handleFieldTouch(fieldName),
            value: values[field],
            error: touchedFields[fieldName] && values[field] === '' ? errorMessage : undefined
        };
    };
    
    // Helper function to handle nested fields with proper type safety
    const registerField = (index: number, field: keyof ImprovementPlanAction) => {
        const fieldName = `actions[${index}].${field}`;
        const errorMessage = field === 'concernArea' 
            ? 'Area of concern is required' 
            : field === 'improvementActions' 
                ? 'Improvement actions are required' 
                : 'Support/Resources are required';
        
        return {
            name: fieldName,
            onChange: (e: React.ChangeEvent<any>) => {
                const newValue = e.target.value;
                const updatedActions = [...values.actions];
                updatedActions[index] = {
                    ...updatedActions[index],
                    [field]: newValue
                };
                setFieldValue("actions", updatedActions);
            },
            onBlur: () => handleFieldTouch(fieldName),
            value: values.actions[index][field],
            error: touchedFields[fieldName] && values.actions[index][field] === '' ? errorMessage : undefined
        };
    };

    const handleImprovementSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        let hasErrors = false;
        const newTouchedFields: Record<string, boolean> = {};
      
        if (!values.improvementArea) {
          newTouchedFields["improvementArea"] = true;
          hasErrors = true;
        }
        if (!values.expectedStandards) {
          newTouchedFields["expectedStandards"] = true;
          hasErrors = true;
        }
      
        values.actions.forEach((action, index) => {
          if (!action.concernArea) {
            newTouchedFields[`actions[${index}].concernArea`] = true;
            hasErrors = true;
          }
          if (!action.improvementActions) {
            newTouchedFields[`actions[${index}].improvementActions`] = true;
            hasErrors = true;
          }
          if (!action.resources) {
            newTouchedFields[`actions[${index}].resources`] = true;
            hasErrors = true;
          }
        });
      
        setTouchedFields((prev) => ({ ...prev, ...newTouchedFields }));
      
        if (!hasErrors) {
          handleSubmit();
        }
      };
      
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {}}>
            <DialogBackdrop className="fixed inset-0 bg-[#FDFDFD] duration-300 ease-out transition-all" style={{ backdropFilter: "blur(4px)" }} /> 
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex flex-col min-h-full items-center justify-start gap-12 px-20">
                    <div className="flex items-center justify-between w-full py-8">
                        <h1 className="text-xl font-semibold text-gray-900">Improvement plan</h1>
                        <button type="button" className="flex items-center py-3 px-5 gap-2 rounded-lg bg-[#F5F6F7] border border-[#F0F1F4] z-10" onClick={onClose}>
                            Close
                            <Icon icon={riCloseFill} width={20} height={20} />
                        </button>
                    </div>
                    <DialogPanel as="div" className="w-full ease-out data-[closed]:scale-90 data-[closed]:opacity-0 duration-500 pb-8">
                        <form onSubmit={handleImprovementSubmit} className="relative flex flex-col items-start w-full justify-center gap-20">
                            <div className="flex flex-col gap-4 p-6 border border-[#E4E7EC] rounded-xl w-full">
                                <h2 className="font-semibold text-black text-xl">Staff detail</h2>
                                <div className="flex flex-col gap-6">
                                    <BaseInput label="Name of Staff" type="text" defaultValue={`${user?.first_name} ${user?.last_name}`} disabled />
                                    <div className="grid grid-cols-2 gap-6">
                                        <BaseInput label="IPPIS No." type="text" defaultValue={`${user?.staff_id}`} disabled />
                                        <BaseInput label="Rank" type="text" defaultValue={`${user?.position}`} disabled />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <BaseInput label="Department" type="text" defaultValue={`${user?.staff_id}`} disabled />
                                        <BaseInput label="Designation" type="text" defaultValue={`${user?.position}`} disabled />
                                    </div>
                                    <BaseInput label="Review Date" type="text" defaultValue={reviewDate} disabled />
                                    <BaseInput label="Review Month" type="text" defaultValue={reviewMonth} disabled />
                                </div>
                            </div>
                            <div className="flex flex-col gap-10 max-w-screen-2xl w-full mx-auto">
                                <div className="flex flex-col gap-8 p-8 flex-1 w-full border border-[#E6E6E6] rounded-lg">
                                    <h1 className="font-semibold text-2xl text-gray-900">Area(s) of concern</h1>
                                    <div className="flex flex-col gap-8">
                                        <TextArea 
                                            label="What areas do you think they could improve in their role?" 
                                            {...registerMainField("improvementArea")}
                                        />
                                        <TextArea 
                                            label="What are the expected standards of performance to these areas" 
                                            {...registerMainField("expectedStandards")}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8 p-8 flex-1 w-full border border-[#E6E6E6] rounded-lg">
                                    <h1 className="font-semibold text-2xl text-gray-900">Improvement plan and goal</h1>
                                    
                                    {values.actions.map((_, index) => (
                                        <div key={index} className="flex flex-col p-3 gap-6 border border-[#F0F1F4] rounded-lg">
                                            <BaseInput 
                                                label="Area of concern" 
                                                type="text" 
                                                {...registerField(index, "concernArea")}
                                            />
                                            <BaseInput 
                                                label="Agreed improvement Actions" 
                                                type="text" 
                                                {...registerField(index, "improvementActions")}
                                            />
                                            <BaseInput 
                                                label="Support/Resources to be provided" 
                                                type="text" 
                                                {...registerField(index, "resources")}
                                            />
                                            
                                            {values.actions.length > 1 && (
                                                <BaseButton 
                                                    type="button" 
                                                    variant="filled" 
                                                    theme="danger" 
                                                    size="tiny"
                                                    onClick={() => removePlan(index)}
                                                >
                                                    Remove plan
                                                    <Icon icon={riCloseFill} width={20} height={20} />
                                                </BaseButton>
                                            )}
                                        </div>
                                    ))}
                                    
                                    <button 
                                        type="button" 
                                        className="flex items-center justify-center gap-2 p-3 w-fit rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40"
                                        onClick={addPlan}
                                    >
                                        Add plan
                                        <Icon icon={riAddFill} width={16} height={16} />
                                    </button>
                                </div>
                                
                                <BaseButton 
                                    type="submit" 
                                    theme="primary" 
                                    variant="filled" 
                                    size="small" 
                                    block
                                    loading={isPending}
                                >
                                    Submit
                                </BaseButton>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}