import {Storage} from "../src/data/storage.js";
import * as MemoryUtilites from "../src/utility/memory_utility.js";
import {UnsupportedOperationError} from "../src/error/unsupported_operation_error.js";
import {expect, assert} from "chai";

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

    beforeEach(function () {
        if (MemoryUtilites.isLocalStorageAvailable()) {
            // clear local storage before each test
            localStorage.clear()
        }
    });

    it("should write and read value", (done) => {
        let storage = new Storage("test_id");

        storage.write(expectedBooleanTrueKey, booleanTrueUnderTest);
        storage.write(expectedBooleanFalseKey, booleanFalseUnderTest);
        storage.write(expectedIntKey, intUnderTest);
        storage.write(expectedFloatKey, floatUnderTest);
        storage.write(expectedStringKey, stringUnderTest);

        expect(storage.read(expectedBooleanTrueKey)).to.equal(booleanTrueUnderTest);
        expect(storage.read(expectedBooleanFalseKey)).to.equal(booleanFalseUnderTest);
        expect(storage.read(expectedIntKey)).to.equal(intUnderTest);
        expect(storage.read(expectedFloatKey)).to.equal(floatUnderTest);
        expect(storage.read(expectedStringKey)).to.equal(stringUnderTest);
        done();
    });

    it("should throw error if a value can not be written to storage, because it is not writeable", (done) => {
        let storage = new Storage("test_id");

        expect(() => {
            storage.write(expectedObjectKey, objectUnderTest);
        }).to.throw(UnsupportedOperationError);

        expect(() => {
            storage.write(expectedFunctionKey, functionUnderTest);
        }).to.throw(UnsupportedOperationError);

        expect(() => {
            storage.write(expectedUndefinedKey, undefinedUnderTest);
        }).to.throw(UnsupportedOperationError);

        expect(() => {
            storage.write(expectedNullKey, nullUnderTest);
        }).to.throw(UnsupportedOperationError);

        expect(() => {
            storage.write(expectedArrayKey, arrayUnderTest);
        }).to.throw(UnsupportedOperationError);

        expect(() => {
            storage.write(expectedNanKey, nanUnderTest);
        }).to.throw(UnsupportedOperationError);

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
        }).to.throw(UnsupportedOperationError);

        done();
    });

    it("should not throw error if a value with the given key already exists and storage is mutable", (done) => {
        let storage = new Storage("test_id", true),
            expectedKey = "test_key",
            expectedValue = 42;

        expect(() => {
            storage.write(expectedKey, expectedValue);
            storage.write(expectedKey, expectedValue);
        }).to.not.throw(UnsupportedOperationError);

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
        }).to.not.throw(UnsupportedOperationError);

        done();
    });

    it("should check whether storage contains value with specific key", (done) => {
        let storage = new Storage("test_id"),
            deletedKey = "deleted_key";

        storage.write(expectedBooleanTrueKey, booleanTrueUnderTest);
        storage.write(expectedBooleanFalseKey, booleanFalseUnderTest);
        storage.write(expectedIntKey, intUnderTest);
        storage.write(expectedFloatKey, floatUnderTest);
        storage.write(expectedStringKey, stringUnderTest);

        expect(storage.contains(expectedBooleanTrueKey)).to.true;
        expect(storage.contains(expectedBooleanFalseKey)).to.true;
        expect(storage.contains(expectedIntKey)).to.true;
        expect(storage.contains(expectedFloatKey)).to.true;
        expect(storage.contains(expectedStringKey)).to.true;

        storage.write(deletedKey, expectedIntKey);
        storage.remove(deletedKey);
        expect(storage.contains(deletedKey)).to.be.false;

        done();
    });

    it("should persist storage", (done) => {
        let expectedStorageId = "persistent_test_id",
            storage = new Storage(expectedStorageId, true),
            anotherStorage;

        if (MemoryUtilites.isLocalStorageAvailable()) {
            storage.write(expectedBooleanTrueKey, booleanTrueUnderTest);
            storage.write(expectedBooleanFalseKey, booleanFalseUnderTest);
            storage.write(expectedIntKey, intUnderTest);
            storage.write(expectedFloatKey, floatUnderTest);
            storage.write(expectedStringKey, stringUnderTest);

            storage.persist();
            anotherStorage = Storage.getPersistentStorage(expectedStorageId);

            expect(anotherStorage.contains("unavailable_key")).to.be.false;

            expect(anotherStorage.contains(expectedBooleanTrueKey)).to.be.true;
            expect(anotherStorage.contains(expectedBooleanFalseKey)).to.be.true;
            expect(anotherStorage.contains(expectedIntKey)).to.be.true;
            expect(anotherStorage.contains(expectedFloatKey)).to.be.true;
            expect(anotherStorage.contains(expectedStringKey)).to.be.true;

            expect(anotherStorage.isMutable).to.be.true;
        } else {
            console.log("\n    ? Local storage is not available. So the following test is skipped!");
        }

        done();
    });

    it("should not throw if persistent storage not exists", (done) => {
        let expectedStorageId = "persistent_test_id",
            storage;

        if (MemoryUtilites.isLocalStorageAvailable()) {
            storage = Storage.getPersistentStorage(expectedStorageId);
            expect(storage).to.be.undefined;
        } else {
            console.log("\n    ? Local storage is not available. So the following test is skipped!");
        }

        done();
    });
});