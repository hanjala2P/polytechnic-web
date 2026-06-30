import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import DepartmentDetail from "../Pages/DepartmentDetail";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "department/:deptId",
        Component: DepartmentDetail,
      },
    ],
  },
]);

export default router;