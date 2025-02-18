import { Routes, Route } from "react-router";
import { DepartmentalKRAPage, DepartmentalOverviewPage, DepartmentalSubInitiativePage, KeyResultAreasPage, ViewDepartmentSubInitiativePage } from "@/pages/key-result-areas";

const KRAsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<KeyResultAreasPage />}>
                <Route path="departments" element={<DepartmentalKRAPage />}>
                    <Route path="overview" element={<DepartmentalOverviewPage />} />
                    <Route path="sub-initiative" element={<DepartmentalSubInitiativePage />} />
                </Route>
                <Route path="divisions" element={<div>divisions</div>} />
                <Route path="branches" element={<div>branches</div>} />
                <Route path="sections" element={<div>sections</div>} />
                <Route path="officers" element={<div>officers</div>} />
            </Route>
            <Route path="departments/sub-initiative/:id" element={<ViewDepartmentSubInitiativePage />} />
        </Routes>
    );
};

export default KRAsRoutes;