import { Routes, Route } from "react-router";
import { BranchesKRAPage, DepartmentalKRAPage, DepartmentalOverviewPage, DepartmentalSubInitiativePage, DivisionKRAPage, KeyResultAreasPage, OfficersKRAPage, SectionsKRAPage, ViewDepartmentSubInitiativePage } from "@/pages/key-result-areas";

const KRAsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<KeyResultAreasPage />}>
                <Route path="departments" element={<DepartmentalKRAPage />}>
                    <Route path="overview" element={<DepartmentalOverviewPage />} />
                    <Route path="sub-initiative" element={<DepartmentalSubInitiativePage />} />
                </Route>
                <Route path="divisions" element={<DivisionKRAPage />} />
                <Route path="branches" element={<BranchesKRAPage />} />
                <Route path="sections" element={<SectionsKRAPage />} />
                <Route path="officers" element={<OfficersKRAPage />} />
            </Route>
            <Route path="departments/sub-initiative/:id" element={<ViewDepartmentSubInitiativePage />} />
        </Routes>
    );
};

export default KRAsRoutes;