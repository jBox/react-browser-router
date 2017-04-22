A Router wrapper for react-router, it allows you to create multiple Routers sharing the same history.

## Install

```npm 
npm install --save react-browser-router
```

## Example

```js
import React, { Component } from "react";
import { render } from "react-dom";
import Router, { initHistory } from "react-browser-router";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Nav from "./components/Nav";

/*init history before any <Router> using.*/
// initHistory({ options })

class NavComponent extends Component {
    render() {
        return (<Router>
            <div>
                <Nav />
            </div>
        </Router>);
    }
}

class ViewComponent extends Component {
    render() {
        return (<Router>
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>

                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
            </div>
        </Router>);
    }
}

render(<ViewComponent />, viewElement);
render(<NavComponent />, navElement);

```