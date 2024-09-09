import { lazy } from "react";
import Loadable from "app/components/Loadable";

const AppUsers = Loadable(lazy(() => import("./users/AppUsers")));
const AppRoles = Loadable(lazy(() => import("./roles/AppRoles")));
const AppPermissions = Loadable(lazy(() => import("./permissions/AppPermissions")));

const settingsRoutes = [
  { path: "/settings/users", element: <AppUsers /> },
  { path: "/settings/roles", element: <AppRoles /> },
  { path: "/settings/permissions", element: <AppPermissions /> },
];

export default settingsRoutes;
