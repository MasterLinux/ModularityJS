import * as Storage from "../src/data/storage.js";
import {ValueOverrideError} from "../src/error/value_override_error.js";
import {expect, assert} from "chai";

export var StorageTests = (function () {
    describe("Storage", () => {

        it("should write value to memory", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42;

            Storage.writeTo(expectedMemory, expectedKey, expectedValue);

            expect(expectedMemory[expectedKey]).to.equal(expectedValue);
            done();
        });

        it("should throw error if a value with the given key already exists", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42;

            expect(() => {
                Storage.writeTo(expectedMemory, expectedKey, expectedValue);
                Storage.writeTo(expectedMemory, expectedKey, expectedValue);
            }).to.throw(ValueOverrideError);

            done();
        });

        it("should not throw error if a value with the given key already exists if memory is mutable", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42,
                isMutable = true;

            expect(() => {
                Storage.writeTo(expectedMemory, expectedKey, expectedValue, isMutable);
                Storage.writeTo(expectedMemory, expectedKey, expectedValue, isMutable);
            }).to.not.throw(ValueOverrideError);

            done();
        });
    });
})();