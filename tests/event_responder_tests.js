import {EventResponder} from "../src/event_responder.js";
import {expect, assert} from "chai";

export class MockEventResponder extends EventResponder {

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

export var EventResponderTests = (function () {
    describe("Event Responder", () => {

        it("should handle error", (done) => {
            let expectedErrorMessage = "test_message";
            let expectedError = new Error(expectedErrorMessage);

            let responderUnderTest = new MockEventResponder(null, (actualError) => {
                expect(expectedError).to.be.equal(actualError);
                expect(expectedErrorMessage).to.be.equal(actualError.message);

                done();
            });

            let responderUnderTest2 = new MockEventResponder(responderUnderTest);
            let lastResponderUnderTest = new MockEventResponder(responderUnderTest2);

            lastResponderUnderTest.propagateError(expectedError);
        });

    });
})();
