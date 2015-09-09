import * as MemoryUtility from "../src/utility/memory_utility.js";
import {ValueOverrideError} from "../src/error/value_override_error.js";
import {expect, assert} from "chai";

export var MemoryUtilityTests = (function () {
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


        it("should write value to memory", (done) => {
            let expectedMemory = {};

            MemoryUtility.writeTo(expectedMemory, expectedObjectKey, objectUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFunctionKey, functionUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedUndefinedKey, undefinedUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedNullKey, nullUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedArrayKey, arrayUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedStringKey, stringUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedNanKey, nanUnderTest);

            expect(expectedMemory[expectedUndefinedKey]).to.be.undefined;
            expect(expectedMemory[expectedNullKey]).to.be.undefined;
            expect(expectedMemory[expectedNanKey]).to.be.NaN;

            expect(expectedMemory[expectedFunctionKey]).to.be.equal(functionUnderTest);
            expect(expectedMemory[expectedObjectKey]).to.equal(objectUnderTest);
            expect(expectedMemory[expectedBooleanTrueKey]).to.equal(booleanTrueUnderTest);
            expect(expectedMemory[expectedBooleanFalseKey]).to.equal(booleanFalseUnderTest);
            expect(expectedMemory[expectedIntKey]).to.equal(intUnderTest);
            expect(expectedMemory[expectedFloatKey]).to.equal(floatUnderTest);
            expect(expectedMemory[expectedArrayKey]).to.equal(arrayUnderTest);
            expect(expectedMemory[expectedStringKey]).to.equal(stringUnderTest);
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
            }).to.throw(ValueOverrideError);

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
            }).to.not.throw(ValueOverrideError);

            done();
        });

        it("should read value from memory", (done) => {
            let expectedMemory = {};

            MemoryUtility.writeTo(expectedMemory, expectedObjectKey, objectUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFunctionKey, functionUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedUndefinedKey, undefinedUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedNullKey, nullUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedArrayKey, arrayUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedStringKey, stringUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedNanKey, nanUnderTest);

            expect(MemoryUtility.readFrom(expectedMemory, expectedUndefinedKey)).to.be.undefined;
            expect(MemoryUtility.readFrom(expectedMemory, expectedNullKey)).to.be.undefined;
            expect(MemoryUtility.readFrom(expectedMemory, expectedNanKey)).to.be.NaN;

            expect(MemoryUtility.readFrom(expectedMemory, expectedFunctionKey)).to.be.equal(functionUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedObjectKey)).to.equal(objectUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedBooleanTrueKey)).to.equal(booleanTrueUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedBooleanFalseKey)).to.equal(booleanFalseUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedIntKey)).to.equal(intUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedFloatKey)).to.equal(floatUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedArrayKey)).to.equal(arrayUnderTest);
            expect(MemoryUtility.readFrom(expectedMemory, expectedStringKey)).to.equal(stringUnderTest);
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
            }).to.not.throw(ValueOverrideError);

            done();
        });

        it("should check whether memory contains value with specific key", (done) => {
            let expectedMemory = {},
                deletedKey = "deleted_key";

            MemoryUtility.writeTo(expectedMemory, expectedObjectKey, objectUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFunctionKey, functionUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedUndefinedKey, undefinedUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedNullKey, nullUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedArrayKey, arrayUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedStringKey, stringUnderTest);
            MemoryUtility.writeTo(expectedMemory, expectedNanKey, nanUnderTest);

            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedUndefinedKey)).to.be.false;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedNullKey)).to.be.false;

            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedFunctionKey)).to.be.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedNanKey)).to.be.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedObjectKey)).to.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedBooleanTrueKey)).to.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedBooleanFalseKey)).to.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedIntKey)).to.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedFloatKey)).to.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedArrayKey)).to.true;
            expect(MemoryUtility.isAvailableIn(expectedMemory, expectedStringKey)).to.true;

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
                MemoryUtility.writeTo(expectedInMemory, expectedObjectKey, objectUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedFunctionKey, functionUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedIntKey, intUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedFloatKey, floatUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedUndefinedKey, undefinedUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedNullKey, nullUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedArrayKey, arrayUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedStringKey, stringUnderTest);
                MemoryUtility.writeTo(expectedInMemory, expectedNanKey, nanUnderTest);

                MemoryUtility.persist(expectedMemoryKey, expectedInMemory);
                expectedOutMemory = MemoryUtility.getPersistentMemory(expectedMemoryKey);

                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedFunctionKey)).to.be.false;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedUndefinedKey)).to.be.false;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedNullKey)).to.be.false;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedNanKey)).to.be.false;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedObjectKey)).to.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedBooleanTrueKey)).to.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedBooleanFalseKey)).to.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedIntKey)).to.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedFloatKey)).to.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedArrayKey)).to.true;
                expect(MemoryUtility.isAvailableIn(expectedOutMemory, expectedStringKey)).to.true;
            } else {
                console.log("\n    ? Local storage is not available. So the following test is skipped!");
            }

            done();
        });
    });
})();