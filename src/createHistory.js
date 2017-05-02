import createBrowserHistory from "history/createBrowserHistory";

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
export default () => {
    if (!global[BROWSER_HISTORY]) {
        global[BROWSER_HISTORY] = createBrowserHistory();
    }

    return global[BROWSER_HISTORY];
};