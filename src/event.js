import {Stack} from "./data/stack.js";

export class Event {

    constructor() {
        this._isPropagating = true;
    }

    get isPropagating() {
        return this._isPropagating;
    }

    stopPropagation() {
        this._isPropagating = false;
    }
}

export class ErrorEvent extends Event {

    constructor(error) {
        super();
        this._stack = new Stack(error);
    }

    get error() {
        return this._stack.last;
    }

    get stack() {
        return this._stack;
    }

    pushError(error) {
        this._stack.push(error);
    }
}
