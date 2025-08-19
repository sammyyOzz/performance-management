import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { RenderIf } from "@/components/core";
import { NavLink, Outlet } from "react-router";
import { Loader } from "@/components/core/Button/Loader";
import { useGetCurrentUser } from "@/services/hooks/queries";

const adminRoutes = [
  {
    name: "Subordinate Appraisal",
    path: "/employee-appraisal/performance-appraisal",
  },
  {
    name: "Your Appraisal",
    path: "/employee-appraisal/performance-appraisal/own",
  },
];

export const PerformanceAppraisalPage = () => {
  const { data: user, isLoading } = useGetCurrentUser();

  return (
    <>
      <RenderIf condition={!isLoading}>
        <section className="flex-1 p-10 overflow-y-scroll bg-[#FFFFFF]">
          <div className="flex flex-col flex-1 gap-3 max-w-screen-2xl mx-auto">
            <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
              <h1 className="font-semibold text-2xl text-black capitalize">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="font-normal text-sm text-[#727A86]">
                {user?.position}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center w-full border-b border-b-[#DFE2E7]">
                {adminRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className="relative text-center p-4"
                  >
                    {({ isActive }) => (
                      <Fragment>
                        <span
                          className={cn(
                            isActive
                              ? "text-green-primary-40"
                              : "text-[#727A86]",
                            "font-medium text-sm"
                          )}
                        >
                          {route.name}
                        </span>
                        {isActive ? (
                          <motion.div
                            layoutId="team-members-underline"
                            id="team-members-underline"
                            className="inset-x-0 bg-green-primary-40 h-px absolute -bottom-px"
                          />
                        ) : null}
                      </Fragment>
                    )}
                  </NavLink>
                ))}
              </div>
              <Outlet />
            </div>
          </div>
        </section>
      </RenderIf>
      <RenderIf condition={isLoading}>
        <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
          <Loader className="spinner size-6 text-green-primary-40" />
        </div>
      </RenderIf>
    </>
  );
};
