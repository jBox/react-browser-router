import React, { Component } from "react";
import PropTypes from "prop-types";
import createBrowserHistory from "history/createBrowserHistory";
import { Router } from "react-router";

const global = window;
const BROWSER_HISTORY = "__BROWSER_HISTORY__";

/**
 * createBrowserHistory({
    basename: "",             // The base URL of the app (see below)
    forceRefresh: false,      // Set true to force full page refreshes
    keyLength: 6,             // The length of location.key
    // A function to use to confirm navigation with the user (see below)
    getUserConfirmation: (message, callback) => callback(window.confirm(message))
})
 */
export const initHistory = (options) => {
    if (global[BROWSER_HISTORY]) {
        throw new Error("Initiating history should be done before any <Router>s called.");
    }

    global[BROWSER_HISTORY] = createBrowserHistory(options);
    return global[BROWSER_HISTORY];
};

const createHistory = () => {
    if (global[BROWSER_HISTORY]) {
        global[BROWSER_HISTORY] = createBrowserHistory(options);
    }

    return global[BROWSER_HISTORY];
};

/**
 * Wrap a <Router> using unique HTML5 history.
 */
export default class ReactBrowserRouter extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    history = createHistory()

    render() {
        return (<Router history={this.history} children={this.props.children} />);
    }
}
