import {Stack} from "./data/stack.js";

export class Event {

    /**
     * An abstract implementation of an event
     * @author Christoph Grundmann
     * @class Event
     * @abstract
     */
    constructor() {
        this._isPropagating = true;
    }

    /**
     * Indicates whether the event is propagating.
     * If true it is propagating, otherwise not
     * @name isPropagating
     * @memberOf Event
     * @type {boolean}
     * @readonly
     * @instance
     */
    get isPropagating() {
        return this._isPropagating;
    }

    /**
     * Stops the event propagation
     * @memberOf Event
     * @function stopPropagation
     * @instance
     */
    stopPropagation() {
        this._isPropagating = false;
    }
}

export class ErrorEvent extends Event {

    /**
     * An implementation of an event encapsulating an error. This
     * event type is usually used to propagate errors
     * @author Christoph Grundmann
     * @class ErrorEvent
     * @extends Event
     * @param {Error} error - The error which is occurred
     */
    constructor(error) {
        super();
        this._stack = new Stack(error);
    }

    /**
     * Gets the occurred error
     * @name error
     * @memberOf ErrorEvent
     * @type {Error}
     * @readonly
     * @instance
     */
    get error() {
        return this._stack.last;
    }

    /**
     * Gets the error stack
     * @name stack
     * @memberOf ErrorEvent
     * @type {Stack}
     * @readonly
     * @instance
     */
    get stack() {
        return this._stack;
    }

    /**
     * Adds a new error to the error stack
     * @memberOf ErrorEvent
     * @function pushError
     * @param {Error} error - The error to push to stack
     * @instance
     */
    pushError(error) {
        this._stack.push(error);
    }
}
