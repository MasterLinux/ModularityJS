import {EventResponder} from "../../src/event_responder.js";

export class EventResponderMock extends EventResponder {

    constructor(responder, callback) {
        super(responder);
        this._callback = callback;
    }

    // overwrite error handling to propagate or cancel error handling
    onErrorPropagation(event) {
        if (this._callback) {
            this._callback(event.error);
            event.stopPropagation();
        }
    }
}