import * as Storage from "../src/data/storage.js";
import {ValueOverrideError} from "../src/error/value_override_error.js";
import {expect, assert} from "chai";

export var StorageTests = (function () {
    describe("Storage", () => {
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

            Storage.writeTo(expectedMemory, expectedObjectKey, objectUnderTest);
            Storage.writeTo(expectedMemory, expectedFunctionKey, functionUnderTest);
            Storage.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            Storage.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            Storage.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            Storage.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            Storage.writeTo(expectedMemory, expectedUndefinedKey, undefinedUnderTest);
            Storage.writeTo(expectedMemory, expectedNullKey, nullUnderTest);
            Storage.writeTo(expectedMemory, expectedArrayKey, arrayUnderTest);
            Storage.writeTo(expectedMemory, expectedStringKey, stringUnderTest);
            Storage.writeTo(expectedMemory, expectedNanKey, nanUnderTest);

            expect(expectedMemory[expectedFunctionKey]).to.be.undefined;
            expect(expectedMemory[expectedUndefinedKey]).to.be.undefined;
            expect(expectedMemory[expectedNullKey]).to.be.undefined;
            expect(expectedMemory[expectedNanKey]).to.be.undefined;

            expect(expectedMemory[expectedObjectKey]).to.equal(objectUnderTest);
            expect(expectedMemory[expectedBooleanTrueKey]).to.equal(booleanTrueUnderTest);
            expect(expectedMemory[expectedBooleanFalseKey]).to.equal(booleanFalseUnderTest);
            expect(expectedMemory[expectedIntKey]).to.equal(intUnderTest);
            expect(expectedMemory[expectedFloatKey]).to.equal(floatUnderTest);
            expect(expectedMemory[expectedArrayKey]).to.equal(arrayUnderTest);
            expect(expectedMemory[expectedStringKey]).to.equal(stringUnderTest);
            done();
        });

        it("should be check whether value is writable", (done) => {
            expect(Storage.isWritable(functionUnderTest)).to.be.false;
            expect(Storage.isWritable(undefinedUnderTest)).to.be.false;
            expect(Storage.isWritable(nullUnderTest)).to.be.false;
            expect(Storage.isWritable(nanUnderTest)).to.be.false;

            expect(Storage.isWritable(objectUnderTest)).to.be.true;
            expect(Storage.isWritable(booleanTrueUnderTest)).to.be.true;
            expect(Storage.isWritable(booleanFalseUnderTest)).to.be.true;
            expect(Storage.isWritable(intUnderTest)).to.be.true;
            expect(Storage.isWritable(floatUnderTest)).to.be.true;
            expect(Storage.isWritable(arrayUnderTest)).to.be.true;
            expect(Storage.isWritable(stringUnderTest)).to.be.true;
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
            let expectedMemory = {};

            Storage.writeTo(expectedMemory, expectedObjectKey, objectUnderTest);
            Storage.writeTo(expectedMemory, expectedFunctionKey, functionUnderTest);
            Storage.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            Storage.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            Storage.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            Storage.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            Storage.writeTo(expectedMemory, expectedUndefinedKey, undefinedUnderTest);
            Storage.writeTo(expectedMemory, expectedNullKey, nullUnderTest);
            Storage.writeTo(expectedMemory, expectedArrayKey, arrayUnderTest);
            Storage.writeTo(expectedMemory, expectedStringKey, stringUnderTest);
            Storage.writeTo(expectedMemory, expectedNanKey, nanUnderTest);

            expect(Storage.readFrom(expectedMemory, expectedFunctionKey)).to.be.undefined;
            expect(Storage.readFrom(expectedMemory, expectedUndefinedKey)).to.be.undefined;
            expect(Storage.readFrom(expectedMemory, expectedNullKey)).to.be.undefined;
            expect(Storage.readFrom(expectedMemory, expectedNanKey)).to.be.undefined;

            expect(Storage.readFrom(expectedMemory, expectedObjectKey)).to.equal(objectUnderTest);
            expect(Storage.readFrom(expectedMemory, expectedBooleanTrueKey)).to.equal(booleanTrueUnderTest);
            expect(Storage.readFrom(expectedMemory, expectedBooleanFalseKey)).to.equal(booleanFalseUnderTest);
            expect(Storage.readFrom(expectedMemory, expectedIntKey)).to.equal(intUnderTest);
            expect(Storage.readFrom(expectedMemory, expectedFloatKey)).to.equal(floatUnderTest);
            expect(Storage.readFrom(expectedMemory, expectedArrayKey)).to.equal(arrayUnderTest);
            expect(Storage.readFrom(expectedMemory, expectedStringKey)).to.equal(stringUnderTest);
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
                deletedKey = "deleted_key";

            Storage.writeTo(expectedMemory, expectedObjectKey, objectUnderTest);
            Storage.writeTo(expectedMemory, expectedFunctionKey, functionUnderTest);
            Storage.writeTo(expectedMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
            Storage.writeTo(expectedMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
            Storage.writeTo(expectedMemory, expectedIntKey, intUnderTest);
            Storage.writeTo(expectedMemory, expectedFloatKey, floatUnderTest);
            Storage.writeTo(expectedMemory, expectedUndefinedKey, undefinedUnderTest);
            Storage.writeTo(expectedMemory, expectedNullKey, nullUnderTest);
            Storage.writeTo(expectedMemory, expectedArrayKey, arrayUnderTest);
            Storage.writeTo(expectedMemory, expectedStringKey, stringUnderTest);
            Storage.writeTo(expectedMemory, expectedNanKey, nanUnderTest);

            expect(Storage.isAvailableIn(expectedMemory, expectedFunctionKey)).to.be.false;
            expect(Storage.isAvailableIn(expectedMemory, expectedUndefinedKey)).to.be.false;
            expect(Storage.isAvailableIn(expectedMemory, expectedNullKey)).to.be.false;
            expect(Storage.isAvailableIn(expectedMemory, expectedNanKey)).to.be.false;

            expect(Storage.isAvailableIn(expectedMemory, expectedObjectKey)).to.true;
            expect(Storage.isAvailableIn(expectedMemory, expectedBooleanTrueKey)).to.true;
            expect(Storage.isAvailableIn(expectedMemory, expectedBooleanFalseKey)).to.true;
            expect(Storage.isAvailableIn(expectedMemory, expectedIntKey)).to.true;
            expect(Storage.isAvailableIn(expectedMemory, expectedFloatKey)).to.true;
            expect(Storage.isAvailableIn(expectedMemory, expectedArrayKey)).to.true;
            expect(Storage.isAvailableIn(expectedMemory, expectedStringKey)).to.true;

            expect(Storage.isAvailableIn(expectedMemory, "unavailable_key")).to.be.false;

            Storage.writeTo(expectedMemory, deletedKey, expectedIntKey);
            Storage.deleteFrom(expectedMemory, deletedKey);
            expect(Storage.isAvailableIn(expectedMemory, deletedKey)).to.be.false;

            done();
        });

        it("should persist memory", (done) => {
            let expectedInMemory = {},
                expectedOutMemory,
                expectedMemoryKey = "memory_key";

            if (Storage.isLocalStorageAvailable()) {
                Storage.writeTo(expectedInMemory, expectedObjectKey, objectUnderTest);
                Storage.writeTo(expectedInMemory, expectedFunctionKey, functionUnderTest);
                Storage.writeTo(expectedInMemory, expectedBooleanTrueKey, booleanTrueUnderTest);
                Storage.writeTo(expectedInMemory, expectedBooleanFalseKey, booleanFalseUnderTest);
                Storage.writeTo(expectedInMemory, expectedIntKey, intUnderTest);
                Storage.writeTo(expectedInMemory, expectedFloatKey, floatUnderTest);
                Storage.writeTo(expectedInMemory, expectedUndefinedKey, undefinedUnderTest);
                Storage.writeTo(expectedInMemory, expectedNullKey, nullUnderTest);
                Storage.writeTo(expectedInMemory, expectedArrayKey, arrayUnderTest);
                Storage.writeTo(expectedInMemory, expectedStringKey, stringUnderTest);
                Storage.writeTo(expectedInMemory, expectedNanKey, nanUnderTest);

                Storage.persist(expectedMemoryKey, expectedInMemory);
                expectedOutMemory = Storage.getPersistentMemory(expectedMemoryKey);

                expect(Storage.isAvailableIn(expectedOutMemory, expectedFunctionKey)).to.be.false;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedUndefinedKey)).to.be.false;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedNullKey)).to.be.false;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedNanKey)).to.be.false;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedObjectKey)).to.true;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedBooleanTrueKey)).to.true;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedBooleanFalseKey)).to.true;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedIntKey)).to.true;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedFloatKey)).to.true;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedArrayKey)).to.true;
                expect(Storage.isAvailableIn(expectedOutMemory, expectedStringKey)).to.true;
            } else {
                console.log("Local storage is not available. So test is skipped!");
            }

            done();
        });

        // TODO add function to test whether local storage is available due private mode
    });
})();