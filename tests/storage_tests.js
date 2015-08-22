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

        it("should overwrite value", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                initialValue = 42,
                expectedValue = 1337,
                isMutable = true;

            Storage.writeTo(expectedMemory, expectedKey, initialValue, isMutable);
            expect(expectedMemory[expectedKey]).to.equal(initialValue);

            Storage.writeTo(expectedMemory, expectedKey, expectedValue, isMutable);
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

        it("should not throw error if a value with the given key already exists and memory is mutable", (done) => {
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

        it("should read value from memory", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42;

            Storage.writeTo(expectedMemory, expectedKey, expectedValue);
            let actualValue = Storage.readFrom(expectedMemory, expectedKey);

            expect(actualValue).to.equal(expectedValue);
            done();
        });

        it("should return undefined if memory does not contain a value with the given key", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key";

            let actualValue = Storage.readFrom(expectedMemory, expectedKey);

            expect(actualValue).to.be.undefined;
            done();
        });

        it("should delete value from memory", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42;

            Storage.writeTo(expectedMemory, expectedKey, expectedValue);
            Storage.deleteFrom(expectedMemory, expectedKey);

            expect(expectedMemory[expectedKey]).to.be.undefined;
            done();
        });

        it("should not throw if adding value again after deleting value", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42;

            Storage.writeTo(expectedMemory, expectedKey, expectedValue);
            Storage.deleteFrom(expectedMemory, expectedKey);

            expect(() => {
                Storage.writeTo(expectedMemory, expectedKey, expectedValue);
            }).to.not.throw(ValueOverrideError);

            done();
        });

        it("should check whether memory contains value with specific key", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                anotherExpectedKey = "another_test_key",
                deletedKey = "deleted_key",
                expectedValue = 42;

            Storage.writeTo(expectedMemory, expectedKey, expectedValue);
            expect(Storage.isAvailableIn(expectedMemory, expectedKey)).to.be.true;
            expect(Storage.isAvailableIn(expectedMemory, anotherExpectedKey)).to.be.false;

            Storage.writeTo(expectedMemory, deletedKey, expectedValue);
            Storage.deleteFrom(expectedMemory, deletedKey);
            expect(Storage.isAvailableIn(expectedMemory, deletedKey)).to.be.false;

            done();
        });

        // TODO add function to test whether local storage is available due private mode
    });
})();