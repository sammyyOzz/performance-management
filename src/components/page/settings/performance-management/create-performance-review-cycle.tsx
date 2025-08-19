import { FC, useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { Icon } from "@iconify-icon/react";
import riCloseFill from "@iconify-icons/ri/close-fill";
import { BaseInput, BaseSelectInput } from "@/components/core";
import { motion, MotionConfig } from "motion/react";
import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";

interface CreatePerformanceReviewCycleProps {
  isOpen: boolean;
  close: () => void;
}

export const CreatePerformanceReviewCycle: FC<
  CreatePerformanceReviewCycleProps
> = ({ isOpen, close }) => {
  const [ref, bounds] = useMeasure();
  const [_, setIsModalOpen] = useState(false);

  const appraisePerformanceForm = useFormikWrapper({
    initialValues: {
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      feedbackStartDate: "",
      feedbackEndDate: "",
    },
    onSubmit() {},
  });

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => close()}
    >
      <DialogBackdrop
        className="fixed inset-0 bg-[#FDFDFD] duration-300 ease-out transition-all"
        style={{ backdropFilter: "blur(4px)" }}
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex flex-col min-h-full items-center justify-start gap-8 px-20 pb-10">
          <div className="flex items-center justify-between w-full py-8">
            <h1 className="text-xl font-semibold text-gray-900">
              Create a review cycle
            </h1>
            <button
              onClick={() => close()}
              className="flex items-center py-3 px-5 gap-2 rounded-lg bg-[#F5F6F7] border border-[#F0F1F4]"
            >
              Close
              <Icon icon={riCloseFill} width={20} height={20} />
            </button>
          </div>

          <MotionConfig
            transition={{ duration: 0.5, type: "spring", bounce: 0 }}
          >
            <DialogPanel
              as={motion.div}
              animate={{ height: bounds.height }}
              className="w-full ease-out data-[closed]:scale-90 data-[closed]:opacity-0 duration-500"
            >
              <div ref={ref} className="w-full flex justify-center">
                <form className="max-w-2xl w-[620px] p-8 grid gap-y-8 border border-grey-110 rounded-lg">
                  <h2 className="text-xl font-semibold text-center">
                    Create a performance review cycle{" "}
                  </h2>

                  <BaseInput
                    type="text"
                    label="Name of this cycle"
                    {...appraisePerformanceForm.register("name")}
                  />

                  <BaseSelectInput
                    label="Type of performance review"
                    options={[
                      {
                        label: "Monthly performance",
                        value: "Yearly performance",
                      },
                    ]}
                  />

                  <BaseInput
                    type="date"
                    label="Start date"
                    {...appraisePerformanceForm.register("startDate")}
                  />

                  <BaseInput
                    type="date"
                    label="End date"
                    {...appraisePerformanceForm.register("endDate")}
                  />

                  <BaseInput
                    type="date"
                    label="Start date for appraiser’s feedback"
                    {...appraisePerformanceForm.register("feedbackStartDate")}
                  />

                  <BaseInput
                    type="date"
                    label="End date for appraiser’s feedback"
                    {...appraisePerformanceForm.register("feedbackEndDate")}
                  />

                  <Button className="py-6 rounded-lg bg-green-primary-40 text-sm text-white-10">
                    Begin cycle
                  </Button>
                </form>
              </div>
            </DialogPanel>
          </MotionConfig>
        </div>
      </div>
    </Dialog>
  );
};
