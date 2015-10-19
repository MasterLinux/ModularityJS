import {EventResponder} from "./event_responder.js";
import ReactDOM from "react-dom";
import React from "react";

export class Renderer extends EventResponder {

    constructor(responder, nodeId) {
        super(responder);

        this._rootElement = document.getElementById(nodeId);
    }

    render(template) {
        if (this._rootElement) {
            ReactDOM.render(this.createElement(template), this._rootElement);
        } else {
            // TODO populate error
        }
    }

    /**
     * {
     *     "type": "PageView",
     *     "attributes": {
     *         "key": "value",
     *         "key2": "value"
     *     },
     *     children: []
     * }
     * @param template
     * @returns {*}
     */
    // TODO: implement optimized solution
    createElement(template) {
        let children = [];

        if (template.children) {
            for (let i = 0; i<template.children.length; i++) {
                let child = template.children[i];

                // TODO: test whether it is an dictionary/object
                if (!!child.attributes) {
                    child.attributes = {};
                }

                child.attributes["key"] = i;

                children.push(this.createElement(child));
            }
        }

        return React.createElement(template.type, template.attributes, children);
    }
}
