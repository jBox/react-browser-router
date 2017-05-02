import React, { Component } from "react";
import { Route } from "react-router";

export default (route) => {
    const routeProps = {
        path: route.path,
        exact: route.exact,
        strict: route.strict
    };

    return (<Route {...routeProps} render={
        //pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
    } />);
};