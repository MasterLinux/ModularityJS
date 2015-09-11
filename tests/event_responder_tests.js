import {UnsupportedOperationError} from "../src/error/unsupported_operation_error.js";
import {EventResponder} from "../src/event_responder.js";
import {expect, assert} from "chai";

export class MockEventResponder extends EventResponder {

    constructor(callback) {
        super();
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

export var EventResponderTests = (function () {
    describe("Event Responder", () => {

        it("should handle error", (done) => {
            let expectedErrorMessage = "test_message";
            let expectedError = new UnsupportedOperationError(expectedErrorMessage);

            let responderUnderTest = new MockEventResponder((actualError) => {
                expect(expectedError).to.be.equal(actualError);
                expect(expectedErrorMessage).to.be.equal(actualError.message);

                done();
            });

            let responderUnderTest2 = new MockEventResponder();
            responderUnderTest2.nextResponder = responderUnderTest;

            let lastResponderUnderTest = new MockEventResponder();
            lastResponderUnderTest.nextResponder = responderUnderTest2;

            lastResponderUnderTest.propagateError(expectedError);
        });

    });
})();
