import { Routes, Route } from "react-router";
import { EmployeeTasksLayout, OwnTasksPage, SubordinatesTaskPage, SubordinateTasksPage } from "@/pages/employee-tasks";

const TasksRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<EmployeeTasksLayout />}>
                <Route index path="subordinates" element={<SubordinatesTaskPage />} />
                <Route path="own" element={<OwnTasksPage />} />
            </Route>
            <Route path="subordinates/:id" element={<SubordinateTasksPage />} />
        </Routes>
    );
};

export default TasksRoutes;