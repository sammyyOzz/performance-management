import { Routes, Route } from "react-router";
import { SecurityPage } from "@/pages/settings";
import { EmployeeAppraisalPage } from "@/pages/employee-appraisal";
import { MonthlyPerformancePage } from "@/pages/employee-appraisal/monthly-performance";
import { SubordinatesMonthlyPerformancePage } from "@/pages/employee-appraisal/monthly-performance/admin";
import { PersonalMonthlyPerformancePage } from "@/pages/employee-appraisal/monthly-performance/own";
import { PerformanceAppraisalPage } from "@/pages/employee-appraisal/performance-appraisal";
import { SubordinateAppraisalPage } from "@/pages/employee-appraisal/performance-appraisal/admin";
import { PersonalAppraisalPage } from "@/pages/employee-appraisal/performance-appraisal/own";

const EmployeeAppraisalRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<EmployeeAppraisalPage />}>
        <Route path="monthly-performance" element={<MonthlyPerformancePage />}>
          <Route
            index
            path="subordinates"
            element={<SubordinatesMonthlyPerformancePage />}
          />
          <Route path="own" element={<PersonalMonthlyPerformancePage />} />
        </Route>
        <Route path="monthly-performance/own" element={<SecurityPage />} />

        <Route
          path="performance-appraisal"
          element={<PerformanceAppraisalPage />}
        >
          <Route path="" element={<SubordinateAppraisalPage />} />
          <Route path="own" element={<PersonalAppraisalPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default EmployeeAppraisalRoutes;
