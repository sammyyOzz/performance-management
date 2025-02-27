import React from "react";

interface EmptyStateProps {
  emptyStateTitle?: string | null
  emptyStateText: string | null
  emptyStateAction?: React.ReactNode
  emptyStateImage?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ emptyStateText = null, emptyStateTitle = null, emptyStateAction = <></>, emptyStateImage = "" }) => {
  return (
    <div className="h-full w-full flex items-center flex-col gap-3 py-20 justify-center">
      <div className="grid gap-2 justify-items-center w-full max-w-[22rem]">
        <img src={emptyStateImage} alt="empty_state_illustration" width={150} height={150} />
        <div className="flex flex-col gap-1">
          <h4 className="font-medium text-gray-900 text-base text-center">{emptyStateTitle ?? "Nothing here"}</h4>
          <p className="text-xs text-gray-600 text-center">{emptyStateText}</p>
        </div>
      </div>
      {emptyStateAction}
    </div>
  );
};