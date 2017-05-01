"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createHistory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createBrowserHistory = require("history/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var global = typeof window !== "undefined" ? window : {};
var BROWSER_HISTORY = "__REACT_BROWSER_HISTORY__";

/**
 * createBrowserHistory({
    basename: "",             // The base URL of the app (see below)
    forceRefresh: false,      // Set true to force full page refreshes
    keyLength: 6,             // The length of location.key
    // A function to use to confirm navigation with the user (see below)
    getUserConfirmation: (message, callback) => callback(window.confirm(message))
})
 */
var createHistory = exports.createHistory = function createHistory() {
    if (!global[BROWSER_HISTORY]) {
        global[BROWSER_HISTORY] = (0, _createBrowserHistory2.default)();
    }

    return global[BROWSER_HISTORY];
};

/**
 * Wrap a <Router> using unique HTML5 history.
 */

var ReactBrowserRouter = function (_Component) {
    _inherits(ReactBrowserRouter, _Component);

    function ReactBrowserRouter(props, context) {
        _classCallCheck(this, ReactBrowserRouter);

        var _this = _possibleConstructorReturn(this, (ReactBrowserRouter.__proto__ || Object.getPrototypeOf(ReactBrowserRouter)).call(this, props, context));

        _this.history = createHistory();
        return _this;
    }

    _createClass(ReactBrowserRouter, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                history = _props.history,
                children = _props.children;

            return _react2.default.createElement(_reactRouter.Router, { history: history || this.history, children: children });
        }
    }]);

    return ReactBrowserRouter;
}(_react.Component);

ReactBrowserRouter.propTypes = {
    children: _propTypes2.default.node,
    history: _propTypes2.default.object
};
exports.default = ReactBrowserRouter;