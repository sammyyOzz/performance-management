import { FC } from "react";
import { Drawer } from "vaul";
import { Icon } from "@iconify-icon/react";
import { Button } from "@headlessui/react";
import riCloseFill from "@iconify-icons/ri/close-fill";
import { BaseInput } from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
import { FetchedAppraisalType } from "@/types/appraisal";
import { format, parseISO } from "date-fns";

interface ViewAppraisalProps {
  isOpen: boolean;
  close: () => void;
  appraisal: FetchedAppraisalType | null;
}

export const ViewAppraisal: FC<ViewAppraisalProps> = ({ isOpen, close, appraisal }) => {
  const { register } = useFormikWrapper({
    initialValues: {
      communication_skills: appraisal?.[0]?.communication_skills || "",
      communication_skills_score: appraisal?.[0]?.communication_skills_score || "",
      transparency: appraisal?.[0]?.transparency || "",
      transparency_score: appraisal?.[0]?.transparency_score || "",
      knowledge: appraisal?.[0]?.knowledge || "",
      knowledge_score: appraisal?.[0]?.knowledge_score || "",
      development: appraisal?.[0]?.development || "",
      development_score: appraisal?.[0]?.development_score || "",
      integrity: appraisal?.[0]?.integrity || "",
      integrity_score: appraisal?.[0]?.integrity_score || "",
      commitment: appraisal?.[0]?.commitment || "",
      commitment_score: appraisal?.[0]?.commitment_score || "",
      innovation_comment: appraisal?.[0]?.innovation_comment || "",
      innovation_score: appraisal?.[0]?.innovation_score || "",
      turn_around_comment: appraisal?.[0]?.turn_around_comment || "",
      turn_around_score: appraisal?.[0]?.turn_around_score || "",
      punctuality_comment: appraisal?.[0]?.punctuality_comment || "",
      punctuality_score: appraisal?.[0]?.punctuality_score || "",
      comments: appraisal?.[0]?.comments || "",
    },
    enableReinitialize: true,
    onSubmit() {},
  });

  const date = parseISO(appraisal?.[0]?.review_date || new Date().toISOString());
  const formattedDate = format(date, "LLLL, yyyy");

  return (
    <Drawer.Root open={isOpen} onOpenChange={close}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">View Appraisal</h2>
              <Button onClick={close}>
                <Icon icon={riCloseFill} className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Review Date</h3>
                  <p className="mt-1">{formattedDate}</p>
                </div>

                {/* Communication Skills */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Communication Skills</h3>
                  <BaseInput {...register("communication_skills")} disabled />
                  <BaseInput
                    type="number"
                    {...register("communication_skills_score")}
                    disabled
                  />
                </div>

                {/* Transparency */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Transparency</h3>
                  <BaseInput {...register("transparency")} disabled />
                  <BaseInput
                    type="number"
                    {...register("transparency_score")}
                    disabled
                  />
                </div>

                {/* Knowledge */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Knowledge</h3>
                  <BaseInput {...register("knowledge")} disabled />
                  <BaseInput
                    type="number"
                    {...register("knowledge_score")}
                    disabled
                  />
                </div>

                {/* Development */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Development</h3>
                  <BaseInput {...register("development")} disabled />
                  <BaseInput
                    type="number"
                    {...register("development_score")}
                    disabled
                  />
                </div>

                {/* Integrity */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Integrity</h3>
                  <BaseInput {...register("integrity")} disabled />
                  <BaseInput
                    type="number"
                    {...register("integrity_score")}
                    disabled
                  />
                </div>

                {/* Commitment */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Commitment</h3>
                  <BaseInput {...register("commitment")} disabled />
                  <BaseInput
                    type="number"
                    {...register("commitment_score")}
                    disabled
                  />
                </div>

                {/* Innovation */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Innovation</h3>
                  <BaseInput {...register("innovation_comment")} disabled />
                  <BaseInput
                    type="number"
                    {...register("innovation_score")}
                    disabled
                  />
                </div>

                {/* Turn Around */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Turn Around</h3>
                  <BaseInput {...register("turn_around_comment")} disabled />
                  <BaseInput
                    type="number"
                    {...register("turn_around_score")}
                    disabled
                  />
                </div>

                {/* Punctuality */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Punctuality</h3>
                  <BaseInput {...register("punctuality_comment")} disabled />
                  <BaseInput
                    type="number"
                    {...register("punctuality_score")}
                    disabled
                  />
                </div>

                {/* Overall Comments */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">Overall Comments</h3>
                  <BaseInput {...register("comments")} disabled />
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}; 