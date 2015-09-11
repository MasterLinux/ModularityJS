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
        error = this.onErrorPropagation(error);
        let next = this.nextResponder;

        // if error is not handled
        if (error && next) {
            next.propagateError(error);
        }
    }

    onErrorPropagation(error) {
        return error;
    }
}
