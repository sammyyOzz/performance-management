import React from "react";
import "./pagination.css";
import { cn } from "@/lib/utils";
import { Button } from "@headlessui/react";
import { Icon } from "@iconify-icon/react";
import riArrowLeftSLine from "@iconify-icons/ri/arrow-left-s-line";
import riArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line";

export interface PaginationProps {
  /**
   * Current page.
   */
  currentPage: number;
  /**
   * Total pages.
   */
  totalPages: number;
  /**
   * Go to previous page.
   */
  prev: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Go to next page.
   */
  next: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Other unknown attributes
   */
  goToPage: (page: number) => void;
  /**
   * Other unknown attributes
   */
  [x: string]: any;
}

/**
 * Pagination component for iterating through data on a table
 */

export const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages, prev, next, goToPage, className }) => {

    return (
        <div className={cn("pagination-container", className)}>
            <div className="flex items-center gap-2">
                <Button type="button" className={cn(currentPage === 1 ? "pagination-arrow-button-inactive" : "pagination-arrow-button-active")} onClick={prev} disabled={currentPage === 1}>
                    <Icon icon={riArrowLeftSLine} width={16} height={16} />
                </Button>
                <div className="flex items-center gap-2">
                    {
                        [...Array(totalPages)].map((_, i) =>
                            <Button key={i + 1} type="button" disabled={currentPage === (i + 1)} className={cn(currentPage === (i + 1) ? "pagination-number-button-inactive" : "pagination-number-button-active")} onClick={() => goToPage(i + 1)}>{i + 1}</Button>
                        )
                    }
                </div>
                <Button type="button" className={cn(currentPage === totalPages ? "pagination-arrow-button-inactive" : "pagination-arrow-button-active")} onClick={next} disabled={currentPage === totalPages}>
                    <Icon icon={riArrowRightSLine} width={16} height={16} />
                </Button>
            </div>
            <div className="text-sm text-gray-500 font-normal">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
};