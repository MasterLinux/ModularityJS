import {EventResponder} from "../src/event_responder.js";
import {EventResponderMock} from "./mocks/event_responder_mock.js";
import {expect, assert} from "chai";

describe("Event Responder", () => {

    it("should handle error", (done) => {
        let expectedErrorMessage = "test_message";
        let expectedError = new Error(expectedErrorMessage);

        let responderUnderTest = new EventResponderMock(null, (actualError) => {
            expect(expectedError).to.be.equal(actualError);
            expect(expectedErrorMessage).to.be.equal(actualError.message);

            done();
        });

        let responderUnderTest2 = new EventResponderMock(responderUnderTest);
        let lastResponderUnderTest = new EventResponderMock(responderUnderTest2);

        lastResponderUnderTest.propagateError(expectedError);
    });

});
