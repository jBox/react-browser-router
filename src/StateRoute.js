import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";

const isPromise = (obj) => {
    return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
};

const infoRedirect = (redirect, location) => {
    const from = `${location.pathname}${location.search}`;
    const to = (redirect || "").replace(/{\d+}/ig, encodeURIComponent(from));
    return { to, from };
};

export default class StateRoute extends Component {
    static defaultProps = {
        authorize: () => ({ verified: true })
    }

    static propTypes = {
        location: PropTypes.object,
        component: PropTypes.any,
        routes: PropTypes.any,
        componentProps: PropTypes.object,
        authorize: PropTypes.func
    }

    constructor(props, context) {
        super(props, context);
        const { authorize, componentProps } = props;
        this.state = {
            ready: true,
            auth: { verified: true }
        };
        this.alive = true;

        const authorized = authorize(componentProps);
        if (isPromise(authorized)) {
            this.state.ready = false;
            authorized.then((auth) => this.updateState({ auth, ready: true }))
                .catch(() => this.updateState({ verified: false, ready: true }));
        } else {
            this.state.auth = authorized;
        }
    }

    componentWillReceiveProps(nextProps) {
        const { authorize, componentProps, location } = nextProps;
        if (location !== this.props.location) {
            const authorized = authorize(componentProps);
            if (isPromise(authorized)) {
                const doAuthorize = () => authorized.then((auth) => this.updateState({ auth, ready: true }))
                    .catch(() => this.updateState({ verified: false, ready: true }));
                this.updateState({ ready: false }, doAuthorize);
            } else {
                this.updateState({ auth: authorized, ready: true });
            }
        }
    }

    updateState = (state, cb) => {
        if (this.alive) {
            this.setState(state, cb);
        }
    }

    componentWillUnmount() {
        this.alive = false;
    }

    render() {
        const { auth, ready } = this.state;
        if (!ready) {
            return null;
        }

        const { component: RouteComponent, componentProps, routes, location } = this.props;
        if (!auth.verified) {
            const redirect = infoRedirect(auth.redirect, location);
            return (<Redirect {...redirect} />);
        }

        return (<RouteComponent {...componentProps} routes={routes} />);
    }
}