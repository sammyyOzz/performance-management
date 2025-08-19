import { Fragment, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { RenderIf } from "@/components/core";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Loader } from "@/components/core/Button/Loader";
import { useGetCurrentUser, useGetUsers } from "@/services/hooks/queries";

const adminRoutes = [
  {
    name: "Subordinates Tasks",
    path: "/employee-appraisal/monthly-performance/subordinates",
  },
  {
    name: "Your Monthly Review",
    path: "/employee-appraisal/monthly-performance/own",
  },
];

export const MonthlyPerformancePage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetCurrentUser();
  const { data, isLoading: loadingSubordinates } = useGetUsers({ supervisor_id: user?.id?.toString(), page_size: "10", page: "1" }, { enabled: !!user?.id })

  useEffect(() => {
    if ((!user?.is_superuser || (data?.data?.length === 0))) {
      navigate("/employee-appraisal/monthly-performance/own")
    } else {
      navigate("/employee-appraisal/monthly-performance/subordinates")
    }
  }, [data?.data?.length, user?.is_superuser]);

  return (
    <>
      <RenderIf condition={!isLoading && !loadingSubordinates}>
        <section className="flex-1 bg-[#FDFDFD] px-10 py-6 overflow-y-scroll">
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
                <RenderIf condition={!!user?.is_superuser}>
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
                </RenderIf>
              <Outlet />
            </div>
          </div>
        </section>
      </RenderIf>
      <RenderIf condition={isLoading || loadingSubordinates}>
        <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
          <Loader className="spinner size-6 text-green-primary-40" />
        </div>
      </RenderIf>
    </>
  );
};
