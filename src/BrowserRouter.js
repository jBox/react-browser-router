import React, { Component } from "react";
import PropTypes from "prop-types";
import createHistory from "./createHistory";
import { Router } from "react-router";

/**
 * Wrap a <Router> using unique HTML5 history.
 */
export default class BrowserHistoryRouter extends Component {

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
