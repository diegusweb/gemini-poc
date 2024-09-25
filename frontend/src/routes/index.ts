import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Login/login";

const routes = [
    {path: '/', exact: true, component: Login},
    {path: '/dashboard', exact: true, component: Dashboard}

]

export default routes;