import { Routes, Route } from "react-router";
import { KeyResultAreasPage } from "@/pages/key-result-areas";

const KRAsRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<KeyResultAreasPage />}>
                <Route path="departments" element={<div>departments</div>} />
                <Route path="divisions" element={<div>divisions</div>} />
                <Route path="branches" element={<div>branches</div>} />
                <Route path="sections" element={<div>sections</div>} />
                <Route path="officers" element={<div>officers</div>} />
            </Route>
        </Routes>
    );
};

export default KRAsRoutes;