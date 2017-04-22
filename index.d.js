import React, { Component } from "react";
import Router, { initHistory } from "./index";

describe("ReactBrowserRouter", () => {
    describe("initHistory", () => {
        it("initHistory should be function", function () {
            expect(typeof initHistory).to.equal("function");
        });
        it("init history after creating routers should throw exception", function () {
            const router = (<Router><div></div></Router>)
            expect(initHistory).to.throw(Error);
        });
    });
});