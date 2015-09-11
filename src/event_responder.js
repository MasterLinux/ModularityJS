export class EventResponder {

    get nextResponder() {
        return this._responder;
    }

    set nextResponder(responder) {
        this._responder = responder;
    }

    /**
     * Propagates the given error. It will be propagated to the next responder in chain
     * if this responder will not handle it {@link EventResponder#onErrorPropagation}
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

    onErrorPropagation(event) {
        // does nothing
    }
}

export class Event {

    get isPropagating() {
        return this._isPropagating;
    }

    constructor(error) {
        this._isPropagating = true;
    }

    stopPropagation() {
        this._isPropagating = false;
    }
}

export class ErrorEvent extends Event {

    get error() {
        return this._error;
    }

    constructor(error) {
        super();
        this._error = error;
    }
}
