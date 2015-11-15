import {Stack} from "../src/data/stack.js";
import {expect, assert} from "chai";

(function () {
    describe("Stack", () => {

        it("should add value via constructor", (done) => {
            let expectedValue = "value";
            let anotherExpectedValue = "another_value";
            let stackUnderTest = new Stack(expectedValue);
            let anotherStackUnderTest = new Stack([expectedValue, anotherExpectedValue]);
            let yetAnotherStackUnderTest = new Stack(expectedValue, anotherExpectedValue);
            let emptyStackUnderTest = new Stack();

            expect(stackUnderTest.length).to.be.equal(1);
            expect(anotherStackUnderTest.length).to.be.equal(2);
            expect(yetAnotherStackUnderTest.length).to.be.equal(2);
            expect(emptyStackUnderTest.length).to.be.equal(0);

            done()
        });

        it("should add value", (done) => {
            let expectedValue = "value";
            let anotherExpectedValue = "another_value";
            let yetAnotherExpectedValue = "yet_another_value";
            let stackUnderTest = new Stack(expectedValue, anotherExpectedValue);

            expect(stackUnderTest.length).to.be.equal(2);

            stackUnderTest.push(yetAnotherExpectedValue);

            expect(stackUnderTest.length).to.be.equal(3);
            done()
        });

        it("should pop last value", (done) => {
            let expectedValue = "value";
            let anotherExpectedValue = "another_value";
            let stackUnderTest = new Stack(expectedValue, anotherExpectedValue);

            expect(stackUnderTest.length).to.be.equal(2);

            let actualValue = stackUnderTest.pop();

            expect(stackUnderTest.length).to.be.equal(1);
            expect(actualValue).to.be.equal(anotherExpectedValue);
            done()
        });

        it("should iterate through values", (done) => {
            let expectedValue = "value";
            let anotherExpectedValue = "another_value";
            let stackUnderTest = new Stack();

            expect(stackUnderTest.index).to.be.equal(0);
            expect(stackUnderTest.current).to.be.undefined;

            stackUnderTest.push(expectedValue);
            stackUnderTest.push(anotherExpectedValue);

            expect(stackUnderTest.index).to.be.equal(0);
            expect(stackUnderTest.current).to.be.equal(expectedValue);

            expect(stackUnderTest.hasNext).to.be.true;
            expect(stackUnderTest.next()).to.be.true;
            expect(stackUnderTest.index).to.be.equal(1);
            expect(stackUnderTest.current).to.be.equal(anotherExpectedValue);

            expect(stackUnderTest.hasNext).to.be.false;
            expect(stackUnderTest.next()).to.be.false;
            expect(stackUnderTest.index).to.be.equal(1);
            expect(stackUnderTest.current).to.be.equal(anotherExpectedValue);

            expect(stackUnderTest.hasPrevious).to.be.true;
            expect(stackUnderTest.previous()).to.be.true;
            expect(stackUnderTest.index).to.be.equal(0);
            expect(stackUnderTest.current).to.be.equal(expectedValue);

            expect(stackUnderTest.hasPrevious).to.be.false;
            expect(stackUnderTest.previous()).to.be.false;
            expect(stackUnderTest.index).to.be.equal(0);
            expect(stackUnderTest.current).to.be.equal(expectedValue);

            done()
        });

        it("should reset index", (done) => {
            let expectedValue = "value";
            let anotherExpectedValue = "another_value";
            let yetAnotherExpectedValue = "yet_another_value";
            let stackUnderTest = new Stack(expectedValue, anotherExpectedValue, yetAnotherExpectedValue);

            expect(stackUnderTest.index).to.be.equal(0);

            stackUnderTest.push(expectedValue);
            expect(stackUnderTest.index).to.be.equal(0);

            stackUnderTest.next();
            stackUnderTest.next();

            expect(stackUnderTest.index).to.be.equal(2);

            stackUnderTest.resetIndex();

            expect(stackUnderTest.index).to.be.equal(0);
            done()
        });

        it("should get last value", (done) => {
            let expectedValue = "value";
            let anotherExpectedValue = "another_value";
            let yetAnotherExpectedValue = "yet_another_value";
            let stackUnderTest = new Stack();

            expect(stackUnderTest.last).to.be.undefined;

            stackUnderTest.push(expectedValue);
            expect(stackUnderTest.last).to.be.equal(expectedValue);

            stackUnderTest.push(anotherExpectedValue);
            expect(stackUnderTest.last).to.be.equal(anotherExpectedValue);

            stackUnderTest.push(yetAnotherExpectedValue);
            expect(stackUnderTest.last).to.be.equal(yetAnotherExpectedValue);

            done()
        });

        it("should get first value", (done) => {
            let expectedValue = "value";
            let anotherExpectedValue = "another_value";
            let yetAnotherExpectedValue = "yet_another_value";
            let stackUnderTest = new Stack();

            expect(stackUnderTest.first).to.be.undefined;

            stackUnderTest.push(expectedValue);
            expect(stackUnderTest.first).to.be.equal(expectedValue);

            stackUnderTest.push(anotherExpectedValue);
            expect(stackUnderTest.first).to.be.equal(expectedValue);

            stackUnderTest.push(yetAnotherExpectedValue);
            expect(stackUnderTest.first).to.be.equal(expectedValue);

            done()
        });

        it("should iterate through values", (done) => {
            let expectedValue = "value";
            let anotherExpectedValue = "another_value";
            let yetAnotherExpectedValue = "yet_another_value";
            let stackUnderTest = new Stack(expectedValue, anotherExpectedValue, yetAnotherExpectedValue);

            let index = 0;
            for (let value of stackUnderTest.values) {
                switch (index) {
                    case 0:
                        expect(value).to.be.equal(expectedValue);
                        break;

                    case 1:
                        expect(value).to.be.equal(anotherExpectedValue);
                        break;

                    case 2:
                        expect(value).to.be.equal(yetAnotherExpectedValue);
                        break;
                }

                index++;
            }

            done()
        });
    });

})();
