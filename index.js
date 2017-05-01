import React, { Component } from "react";
import PropTypes from "prop-types";
import createBrowserHistory from "history/createBrowserHistory";
import { Router } from "react-router";

const global = typeof window !== "undefined" ? window : {};
const BROWSER_HISTORY = "__REACT_BROWSER_HISTORY__";

/**
 * createBrowserHistory({
    basename: "",             // The base URL of the app (see below)
    forceRefresh: false,      // Set true to force full page refreshes
    keyLength: 6,             // The length of location.key
    // A function to use to confirm navigation with the user (see below)
    getUserConfirmation: (message, callback) => callback(window.confirm(message))
})
 */
export const createHistory = () => {
    if (!global[BROWSER_HISTORY]) {
        global[BROWSER_HISTORY] = createBrowserHistory();
    }

    return global[BROWSER_HISTORY];
};

/**
 * Wrap a <Router> using unique HTML5 history.
 */
export default class ReactBrowserRouter extends Component {

    constructor(props, context) {
        super(props, context);
        this.history = createHistory();
    }

    static propTypes = {
        children: PropTypes.node,
        history: PropTypes.object
    }

    render() {
        const { history, children } = this.props;
        return (<Router history={history || this.history} children={children} />);
    }
}
