import React from "react";
import { Route } from "react-router";

export default (route) => {    
    const routes = route.routes;
    const routeProps = {
        path: route.path,
        exact: route.exact,
        strict: route.strict,
        location: route.location
    };

    // https://reacttraining.com/react-router/web/api/Route/Route-props
    // render props: { match, lacation, history }
    if (route.component) {
        routeProps.render = (props) => (<route.component {...props} routes={routes} />);
    } else if (route.render) {
        routeProps.render = (props) => (route.render({ ...props, routes }));
    } else if (route.children) {
        routeProps.children = (props) => (route.children({ ...props, routes }));
    }

    return (<Route {...routeProps} />);
};