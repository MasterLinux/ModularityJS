import {Event, ErrorEvent} from "../src/event.js";
import {expect, assert} from "chai";

(function () {
    describe("Event", () => {

        it("should stop propagation", (done) => {
            let eventUnderTest = new Event();

            expect(eventUnderTest.isPropagating).to.be.true;

            eventUnderTest.stopPropagation();

            expect(eventUnderTest.isPropagating).to.be.false;
            done()
        });

    });

    describe("Error Event", () => {

        it("should stop propagation", (done) => {
            let eventUnderTest = new ErrorEvent(new Error());

            expect(eventUnderTest.isPropagating).to.be.true;

            eventUnderTest.stopPropagation();

            expect(eventUnderTest.isPropagating).to.be.false;
            done()
        });

        it("should pass error", (done) => {
            let expectedMessage = "error_message";
            let expectedError = new Error(expectedMessage);
            let eventUnderTest = new ErrorEvent(expectedError);

            expect(eventUnderTest.error).to.be.equal(expectedError);
            expect(eventUnderTest.error.message).to.be.equal(expectedMessage);

            done()
        });

        it("should push new error", (done) => {
            let expectedMessage = "error_message";
            let expectedError = new Error(expectedMessage);
            let anotherExpectedMessage = "another_error_message";
            let anotherExpectedError = new Error(anotherExpectedMessage);
            let eventUnderTest = new ErrorEvent(expectedError);

            expect(eventUnderTest.error).to.be.equal(expectedError);
            expect(eventUnderTest.error.message).to.be.equal(expectedMessage);

            eventUnderTest.pushError(anotherExpectedError);

            expect(eventUnderTest.error).to.be.equal(anotherExpectedError);
            expect(eventUnderTest.error.message).to.be.equal(anotherExpectedMessage);

            done()
        });

        it("should iterate through error stack", (done) => {
            let expectedMessage = "error_message";
            let expectedError = new Error(expectedMessage);
            let anotherExpectedMessage = "another_error_message";
            let anotherExpectedError = new Error(anotherExpectedMessage);
            let yetAnotherExpectedMessage = "yet_another_error_message";
            let yetAnotherExpectedError = new Error(yetAnotherExpectedMessage);
            let eventUnderTest = new ErrorEvent(expectedError);

            eventUnderTest.pushError(anotherExpectedError);
            eventUnderTest.pushError(yetAnotherExpectedError);

            expect(eventUnderTest.stack).not.to.be.null;
            expect(eventUnderTest.stack.length).to.be.equal(3);

            done()
        });

    });
})();
