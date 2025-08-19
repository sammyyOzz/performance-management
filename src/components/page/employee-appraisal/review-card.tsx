// import { Trash } from "iconsax-react";
import { ArrowRight2 } from "iconsax-react";
import React from "react";
import { motion } from "motion/react"
// import { Badge } from "@/components/core";
// import { Button } from "@headlessui/react";
// import { Icon } from "@iconify-icon/react"

interface ReviewCardProps {
  index: number;
  displayText: string
  toggleReviewOpen?: () => void;
  // toggleDeleteTask?: (item: FetchedReviewType) => void;
  // toggleMarkTask?: (item: FetchedReviewType) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  index,
  displayText,
  toggleReviewOpen,
  // toggleDeleteTask,
  // toggleMarkTask,
}) => {

  return (
    <motion.div
      key={index}
      initial={{ y: 10, opacity: 0, filter: "blur(2px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ delay: index * 0.08, bounce: 0 }}
      className="relative flex flex-col p-4 gap-3 border border-[#DFE2E7] rounded-lg"
    >
      <button type="button" onClick={toggleReviewOpen} className="absolute inset-0 isolate" />
      {/* <Badge status={item.status as any} label={item.status} size="medium" className="isolate" /> */}

      <div className="flex items-start gap-4">
        <div className="flex-1 grid gap-1.5 isolate">
          <h1 className="font-semibold text-xl text-grey-40 leading-6">{displayText}</h1>
          {/* <p className="text-xs font-normal text-[#727A86]">
            Key Result Area: 
          </p> */}
        </div>
        <ArrowRight2 size="20" color="#0F973D" />
      </div>

      {/* <hr className="flex-1 border-[#F0F2F5] isolate" /> */}

      <div className="flex items-center justify-between isolate">
        <div className="flex items-center gap-2">
          {/* <span className="text-xs font-normal text-[#727A86]">Responsibilities:</span>
          <span className="text-base leading-7 font-semibold text-green-secondary-40">
            {item.current_responsibilities}
          </span> */}
        </div>

        {/* {item.status === "active" && (
          <div className="flex items-center gap-3">
            <Button
              className="flex items-center gap-1 text-red-40 text-xs bg-red-10 rounded px-2 py-1.5"
              onClick={() => toggleDeleteTask?.(item)}
            >
              Remove Task
              <Trash size="16" color="#D42620" />
            </Button>
            <Button
              className="flex items-center gap-1 text-white-10 text-xs bg-green-primary-40 rounded px-2 py-1.5"
              onClick={() => toggleMarkTask?.(item)}
            >
              Mark as done
              <Icon icon="lucide:check" width={16} height={16} />
            </Button>
          </div>
        )} */}
      </div>
    </motion.div>
  );
};
