import React from "react";
import { Route, Redirect } from "react-router";
import StateRoute from "./StateRoute";

const DEFAULT_AUTH = () => ({ verified: true });

const infoRedirect = (redirect, location) => {
    const from = `${location.pathname}${location.search}`;
    const to = (redirect || "").replace(/{\d+}/ig, encodeURIComponent(from));
    return { to, from };
};

export default (route) => {
    const routes = route.routes;
    const authorize = route.authorize || DEFAULT_AUTH;
    const routeProps = {
        path: route.path,
        exact: route.exact,
        strict: route.strict,
        location: route.location
    };

    // https://reacttraining.com/react-router/web/api/Route/Route-props
    // render props: { match, lacation, history }
    if (route.component) {
        routeProps.render = (props) => (<StateRoute
            authorize={authorize}
            location={props.location}
            component={route.component}
            componentProps={props}
            routes={routes}
        />);
    } else if (route.render) {
        routeProps.render = (props) => {
            const auth = authorize(props);
            if (!auth.verified) {
                const { location } = props;
                const redirect = infoRedirect(auth.redirect, location);
                return (<Redirect {...redirect} />);
            }
            return (route.render({ ...props, routes }));
        };
    } else if (route.children) {
        routeProps.children = (props) => {
            const auth = authorize(props);
            if (!auth.verified) {
                const { location } = props;
                const redirect = infoRedirect(auth.redirect, location);
                return (<Redirect {...redirect} />);
            }
            return (route.children({ ...props, routes }));
        };
    }

    return (<Route {...routeProps} />);
};