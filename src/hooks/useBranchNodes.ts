import { FetchedDepartmentType } from "@/types/department";
import { useMemo } from "react";

export const useBranchNodes = (data: FetchedDepartmentType, level: "division" | "section" | "branch" | "department") => {
  return useMemo(() => {
    const extractBranches = (node: any): any[] => {
      let branches: any[] = [];

      // If the current node is a branch, collect it
      if (node.level === level) {
        branches.push(node);
      }

      // If there are children, recursively extract from them
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => {
          branches = branches.concat(extractBranches(child));
        });
      }

      return branches;
    };

    return extractBranches(data);
  }, [data]);
};