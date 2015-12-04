import {ErrorEvent} from "./event.js";

export class EventResponder {

    /**
     * An abstract implementation of an event responder. It is used to propagate
     * events through an event chain
     * @author Christoph Grundmann
     * @class EventResponder
     * @abstract
     * @param {EventResponder} [responder] - The next responder in chain
     */
    constructor(responder) {
        this.nextResponder = responder;
    }

    /**
     * Propagates the given error. It will be propagated to the next responder in chain
     * if this responder will not handle it {@link EventResponder#onErrorPropagation}
     * @memberOf EventResponder
     * @function propagateError
     * @instance
     * @param {Error} error - The error to propagate
     */
    propagateError(error) {
        let event = new ErrorEvent(error);
        let next = this.nextResponder;

        this.onErrorPropagation(event);

        // if error is not handled
        if (event.isPropagating && next) {
            next.propagateError(error);
        }
    }

    /**
     * Handler which is invoked whenever an error is propagated. This
     * function can be overwritten to handle errors
     * @memberOf EventResponder
     * @function onErrorPropagation
     * @instance
     * @param {ErrorEvent} event - An event which contains the propagated error
     */
    onErrorPropagation(event) {
        // does nothing
    }
}
