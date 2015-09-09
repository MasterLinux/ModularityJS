import {Storage} from "../src/data/storage.js";
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


        it("should write and read value", (done) => {
            let storage = new Storage("test_id");

            storage.write(expectedObjectKey, objectUnderTest);
            storage.write(expectedFunctionKey, functionUnderTest);
            storage.write(expectedBooleanTrueKey, booleanTrueUnderTest);
            storage.write(expectedBooleanFalseKey, booleanFalseUnderTest);
            storage.write(expectedIntKey, intUnderTest);
            storage.write(expectedFloatKey, floatUnderTest);
            storage.write(expectedUndefinedKey, undefinedUnderTest);
            storage.write(expectedNullKey, nullUnderTest);
            storage.write(expectedArrayKey, arrayUnderTest);
            storage.write(expectedStringKey, stringUnderTest);
            storage.write(expectedNanKey, nanUnderTest);

            expect(storage.read(expectedUndefinedKey)).to.be.undefined;
            expect(storage.read(expectedNullKey)).to.be.undefined;
            expect(storage.read(expectedNanKey)).to.be.NaN;

            expect(storage.read(expectedFunctionKey)).to.be.equal(functionUnderTest);
            expect(storage.read(expectedObjectKey)).to.equal(objectUnderTest);
            expect(storage.read(expectedBooleanTrueKey)).to.equal(booleanTrueUnderTest);
            expect(storage.read(expectedBooleanFalseKey)).to.equal(booleanFalseUnderTest);
            expect(storage.read(expectedIntKey)).to.equal(intUnderTest);
            expect(storage.read(expectedFloatKey)).to.equal(floatUnderTest);
            expect(storage.read(expectedArrayKey)).to.equal(arrayUnderTest);
            expect(storage.read(expectedStringKey)).to.equal(stringUnderTest);
            done();
        });

        it("should overwrite value", (done) => {
            let storage = new Storage("test_id", true),
                expectedKey = "test_key",
                initialValue = 42,
                expectedValue = 1337;

            storage.write(expectedKey, initialValue);
            expect(storage.read(expectedKey)).to.equal(initialValue);

            storage.write(expectedKey, expectedValue);
            expect(storage.read(expectedKey)).to.equal(expectedValue);

            done();
        });

        it("should throw error if a value with the given key already exists", (done) => {
            let storage = new Storage("test_id"),
                expectedKey = "test_key",
                expectedValue = 42;

            expect(() => {
                storage.write(expectedKey, expectedValue);
                storage.write(expectedKey, expectedValue);
            }).to.throw(ValueOverrideError);

            done();
        });

        it("should not throw error if a value with the given key already exists and storage is mutable", (done) => {
            let storage = new Storage("test_id", true),
                expectedKey = "test_key",
                expectedValue = 42;

            expect(() => {
                storage.write(expectedKey, expectedValue);
                storage.write(expectedKey, expectedValue);
            }).to.not.throw(ValueOverrideError);

            done();
        });

        it("should return undefined if storage does not contain a value with the given key", (done) => {
            let storage = new Storage("test_id"),
                expectedKey = "test_key";

            let actualValue = storage.read(expectedKey);

            expect(actualValue).to.be.undefined;
            done();
        });

        it("should remove value from storage", (done) => {
            let storage = new Storage("test_id"),
                expectedKey = "test_key",
                expectedValue = 42;

            storage.write(expectedKey, expectedValue);
            storage.remove(expectedKey);

            expect(storage.read(expectedKey)).to.be.undefined;
            done();
        });

        it("should not throw if adding value again after deleting value", (done) => {
            let storage = new Storage("test_id"),
                expectedKey = "test_key",
                expectedValue = 42;

            storage.write(expectedKey, expectedValue);
            storage.remove(expectedKey);

            expect(() => {
                storage.write(expectedKey, expectedValue);
            }).to.not.throw(ValueOverrideError);

            done();
        });

        it("should check whether storage contains value with specific key", (done) => {
            let storage = new Storage("test_id"),
                deletedKey = "deleted_key";

            storage.write(expectedObjectKey, objectUnderTest);
            storage.write(expectedFunctionKey, functionUnderTest);
            storage.write(expectedBooleanTrueKey, booleanTrueUnderTest);
            storage.write(expectedBooleanFalseKey, booleanFalseUnderTest);
            storage.write(expectedIntKey, intUnderTest);
            storage.write(expectedFloatKey, floatUnderTest);
            storage.write(expectedUndefinedKey, undefinedUnderTest);
            storage.write(expectedNullKey, nullUnderTest);
            storage.write(expectedArrayKey, arrayUnderTest);
            storage.write(expectedStringKey, stringUnderTest);
            storage.write(expectedNanKey, nanUnderTest);

            expect(storage.contains("unavailable_key")).to.be.false;
            expect(storage.contains(expectedUndefinedKey)).to.be.false;
            expect(storage.contains(expectedNullKey)).to.be.false;

            expect(storage.contains(expectedFunctionKey)).to.be.true;
            expect(storage.contains(expectedNanKey)).to.be.true;
            expect(storage.contains(expectedObjectKey)).to.true;
            expect(storage.contains(expectedBooleanTrueKey)).to.true;
            expect(storage.contains(expectedBooleanFalseKey)).to.true;
            expect(storage.contains(expectedIntKey)).to.true;
            expect(storage.contains(expectedFloatKey)).to.true;
            expect(storage.contains(expectedArrayKey)).to.true;
            expect(storage.contains(expectedStringKey)).to.true;

            storage.write(deletedKey, expectedIntKey);
            storage.remove(deletedKey);
            expect(storage.contains(deletedKey)).to.be.false;

            done();
        });

        it("should persist storage", (done) => {
            let expectedStorageId = "persistent_test_id",
                storage = new Storage(expectedStorageId),
                anotherStorage;

            if (storage.isLocalStorageAvailable) {
                storage.write(expectedObjectKey, objectUnderTest);
                storage.write(expectedFunctionKey, functionUnderTest);
                storage.write(expectedBooleanTrueKey, booleanTrueUnderTest);
                storage.write(expectedBooleanFalseKey, booleanFalseUnderTest);
                storage.write(expectedIntKey, intUnderTest);
                storage.write(expectedFloatKey, floatUnderTest);
                storage.write(expectedUndefinedKey, undefinedUnderTest);
                storage.write(expectedNullKey, nullUnderTest);
                storage.write(expectedArrayKey, arrayUnderTest);
                storage.write(expectedStringKey, stringUnderTest);
                storage.write(expectedNanKey, nanUnderTest);

                storage.persist();
                anotherStorage = Storage.getPersistentStorage(expectedStorageId);

                expect(anotherStorage.contains("unavailable_key")).to.be.false;
                expect(anotherStorage.contains(expectedUndefinedKey)).to.be.false;
                expect(anotherStorage.contains(expectedNullKey)).to.be.false;
                expect(anotherStorage.contains(expectedFunctionKey)).to.be.false;
                expect(anotherStorage.contains(expectedNanKey)).to.be.false;

                expect(anotherStorage.contains(expectedObjectKey)).to.true;
                expect(anotherStorage.contains(expectedBooleanTrueKey)).to.true;
                expect(anotherStorage.contains(expectedBooleanFalseKey)).to.true;
                expect(anotherStorage.contains(expectedIntKey)).to.true;
                expect(anotherStorage.contains(expectedFloatKey)).to.true;
                expect(anotherStorage.contains(expectedArrayKey)).to.true;
                expect(anotherStorage.contains(expectedStringKey)).to.true;
            } else {
                console.log("\n    ? Local storage is not available. So the following test is skipped!");
            }

            done();
        });

        // TODO add function to test whether local storage is available due private mode
    });
})();