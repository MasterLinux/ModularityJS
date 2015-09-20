import * as MemoryUtility from "../src/utility/memory_utility.js";
import {UnsupportedOperationError} from "../src/error/unsupported_operation_error.js";
import {expect, assert} from "chai";

(function () {
    describe("Memory", () => {
        let expectedObjectKey = "test_object_key",
            objectUnderTest = {},

            expectedFunctionKey = "test_function_key",
            functionUnderTest = function () {
            },

            expectedBooleanTrueKey = "test_boolean_true_key",
            booleanTrueUnderTest = true,

            expectedBooleanFalseKey = "test__boolean_false_key",
            booleanFalseUnderTest = false,

            expectedIntKey = "test_int_key",
            intUnderTest = 0,

            expectedFloatKey = "test_float_key",
            floatUnderTest = 1.1,

            expectedUndefinedKey = "test_undefined_key",
            undefinedUnderTest = undefined,

            expectedNullKey = "test_null_key",
            nullUnderTest = null,

            expectedArrayKey = "test_array_key",
            arrayUnderTest = [],

            expectedStringKey = "test_string_key",
            stringUnderTest = "test",

            expectedNanKey = "test_nan_key",
            nanUnderTest = NaN;

        beforeEach(function () {
            if (MemoryUtility.isLocalStorageAvailable()) {
                // clear local storage before each test
                localStorage.clear()
            }
        });

        it("should check whether value is writable to memory", (done) => {
            expect(MemoryUtility.isWriteable(objectUnderTest)).to.be.false;
            expect(MemoryUtility.isWriteable(functionUnderTest)).to.be.false;
            expect(MemoryUtility.isWriteable(undefinedUnderTest)).to.be.false;
            expect(MemoryUtility.isWriteable(nullUnderTest)).to.be.false;
            expect(MemoryUtility.isWriteable(nanUnderTest)).to.be.false;
            expect(MemoryUtility.isWriteable(arrayUnderTest)).to.be.false;

            expect(MemoryUtility.isWriteable(booleanTrueUnderTest)).to.be.true;
            expect(MemoryUtility.isWriteable(booleanFalseUnderTest)).to.be.true;
            expect(MemoryUtility.isWriteable(intUnderTest)).to.be.true;
            expect(MemoryUtility.isWriteable(floatUnderTest)).to.be.true;
            expect(MemoryUtility.isWriteable(stringUnderTest)).to.be.true;
            done();
        });

        it("should write value to memory", (done) => {
            let expectedMemory = {};

            MemoryUtility.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedStringKey, stringUnderTest);

            expect(expectedMemory[expectedBooleanTrueKey]).to.be.equal(booleanTrueUnderTest);
            expect(expectedMemory[expectedBooleanFalseKey]).to.be.equal(booleanFalseUnderTest);
            expect(expectedMemory[expectedIntKey]).to.be.equal(intUnderTest);
            expect(expectedMemory[expectedFloatKey]).to.be.equal(floatUnderTest);
            expect(expectedMemory[expectedStringKey]).to.be.equal(stringUnderTest);

            done();
        });

        it("should throw error if a value can not be written to memory, because it is not writeable", (done) => {
            let expectedMemory = {};

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedObjectKey, objectUnderTest);
            }).to.throw(UnsupportedOperationError);

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedArrayKey, arrayUnderTest);
            }).to.throw(UnsupportedOperationError);

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedNanKey, nanUnderTest);
            }).to.throw(UnsupportedOperationError);

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedFunctionKey, functionUnderTest);
            }).to.throw(UnsupportedOperationError);

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedUndefinedKey, undefinedUnderTest);
            }).to.throw(UnsupportedOperationError);

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedNullKey, nullUnderTest);
            }).to.throw(UnsupportedOperationError);

            done();
        });

        it("should overwrite value", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                initialValue = 42,
                expectedValue = 1337,
                isMutable = true;

            MemoryUtility.writeTo(expectedMemory, expectedKey, initialValue, isMutable);
            expect(expectedMemory[expectedKey]).to.equal(initialValue);

            MemoryUtility.writeTo(expectedMemory, expectedKey, expectedValue, isMutable);
            expect(expectedMemory[expectedKey]).to.equal(expectedValue);

            done();
        });

        it("should throw error if a value with the given key already exists", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42;

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedKey, expectedValue);
                MemoryUtility.writeTo(expectedMemory, expectedKey, expectedValue);
            }).to.throw(UnsupportedOperationError);

            done();
        });

        it("should not throw error if a value with the given key already exists and memory is mutable", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42,
                isMutable = true;

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedKey, expectedValue, isMutable);
                MemoryUtility.writeTo(expectedMemory, expectedKey, expectedValue, isMutable);
            }).to.not.throw(UnsupportedOperationError);

            done();
        });

        it("should read value from memory", (done) => {
            let expectedMemory = {};

            MemoryUtility.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedStringKey, stringUnderTest);

            expect(MemoryUtility.readFrom(expectedMemory, expectedBooleanTrueKey)).to.be.equal(booleanTrueUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedBooleanFalseKey)).to.be.equal(booleanFalseUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedIntKey)).to.be.equal(intUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedFloatKey)).to.be.equal(floatUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedStringKey)).to.be.equal(stringUnderTest);
            done();
        });

        it("should return undefined if memory does not contain a value with the given key", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key";

            let actualValue = MemoryUtility.readFrom(expectedMemory, expectedKey);

            expect(actualValue).to.be.undefined;
            done();
        });

        it("should delete value from memory", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42;

            MemoryUtility.writeTo(expectedMemory, expectedKey, expectedValue);
            MemoryUtility.deleteFrom(expectedMemory, expectedKey);

            expect(expectedMemory[expectedKey]).to.be.undefined;
            done();
        });

        it("should not throw if adding value again after deleting value", (done) => {
            let expectedMemory = {},
                expectedKey = "test_key",
                expectedValue = 42;

            MemoryUtility.writeTo(expectedMemory, expectedKey, expectedValue);
            MemoryUtility.deleteFrom(expectedMemory, expectedKey);

            expect(() => {
                MemoryUtility.writeTo(expectedMemory, expectedKey, expectedValue);
            }).to.not.throw(UnsupportedOperationError);

            done();
        });

        it("should check whether memory contains value with specific key", (done) => {
            let expectedMemory = {},
                deletedKey = "deleted_key";

            MemoryUtility.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedStringKey, stringUnderTest);

            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedBooleanTrueKey)).to.be.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedBooleanFalseKey)).to.be.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedIntKey)).to.be.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedFloatKey)).to.be.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedStringKey)).to.be.true;

            expect(MemoryUtility.isAvailableIn(expectedMemory, "unavailable_key")).to.be.false;

            MemoryUtility.writeTo(expectedMemory, deletedKey, expectedIntKey);
            MemoryUtility.deleteFrom(expectedMemory, deletedKey);
            expect(MemoryUtility.isAvailableIn(expectedMemory, deletedKey)).to.be.false;

            done();
        });

        it("should persist memory", (done) => {
            let expectedInMemory = {},
                expectedOutMemory,
                expectedMemoryKey = "memory_key";

            if (MemoryUtility.isLocalStorageAvailable()) {
                MemoryUtility.writeTo(expectedInMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedIntKey, intUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedFloatKey, floatUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedStringKey, stringUnderTest);

                MemoryUtility.persist(expectedMemoryKey, expectedInMemory);
                expectedOutMemory = MemoryUtility.getPersistentMemory(expectedMemoryKey);

                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedBooleanTrueKey)).to.be.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedBooleanFalseKey)).to.be.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedIntKey)).to.be.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedFloatKey)).to.be.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedStringKey)).to.be.true;
            } else {
                console.log("\n    ? Local storage is not available. So the following test is skipped!");
            }

            done();
        });

        it("should not throw if persistent memory not exists", (done) => {
            let expectedMemoryKey = "memory_key",
                expectedOutMemory;

            if (MemoryUtility.isLocalStorageAvailable()) {
                expectedOutMemory = MemoryUtility.getPersistentMemory(expectedMemoryKey);
                expect(expectedOutMemory).to.be.undefined;
            } else {
                console.log("\n    ? Local storage is not available. So the following test is skipped!");
            }

            done();
        });
    });
})();