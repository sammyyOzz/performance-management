import { Routes, Route } from "react-router";
import { BranchesKRAPage, DepartmentalKRAPage, DepartmentalOverviewPage, DepartmentalSubInitiativePage, DepartmentsPage, DivisionKRAPage, KeyResultAreasPage, OfficersKraDescriptionPage, SectionsKRAPage, ViewDepartmentSubInitiativePage } from "@/pages/key-result-areas";

const KRAsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<KeyResultAreasPage />}>
                <Route path="departments" element={<DepartmentsPage />} />
                <Route path="departments/:id" element={<DepartmentalKRAPage />}>
                    <Route path="overview" element={<DepartmentalOverviewPage />} />
                    <Route path="sub-initiative" element={<DepartmentalSubInitiativePage />} />
                    <Route path="sub-initiative/:kraId" element={<ViewDepartmentSubInitiativePage />} />
                    <Route path="divisions" element={<DivisionKRAPage />} />
                    <Route path="branches" element={<BranchesKRAPage />} />
                    <Route path="sections" element={<SectionsKRAPage />} />
                </Route>
                <Route path="officers/:id" element={<OfficersKraDescriptionPage />} />
            </Route>
        </Routes>
    );
};

export default KRAsRoutes;