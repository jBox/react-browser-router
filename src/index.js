import AdvancedRoute from "./AdvancedRoute";
import BrowserHistoryRouter from "./BrowserRouter";

export { Link, NavLink, HashRouter, Redirect } from "react-router-dom";
export {
    Switch,
    Router,
    MemoryRouter,
    StaticRouter,
    withRouter,
    matchPath
} from "react-router";

export const Route = AdvancedRoute;

export const BrowserRouter = BrowserHistoryRouter;