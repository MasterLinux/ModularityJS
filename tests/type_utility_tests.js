import * as TypeUtility from "../src/utility/type_utility.js";
import {expect, assert} from "chai";

export var TypeUtilityTests = (function () {
    describe("Type utility", () => {

        it("should be able to check if value is an object or not", (done) => {
            let objectUnderTest = {},
                functionUnderTest = function () {},
                booleanTrueUnderTest = true,
                booleanFalseUnderTest = false,
                intUnderTest = 1,
                floatUnderTest = 1.1,
                undefinedUnderTest = undefined,
                nullUnderTest = null,
                arrayUnderTest = [],
                stringUnderTest = "test",
                nanUnderTest = NaN;

            expect(TypeUtility.isObject(objectUnderTest)).to.be.true;
            expect(TypeUtility.isObject(functionUnderTest)).to.be.true;
            expect(TypeUtility.isObject(arrayUnderTest)).to.be.true;

            expect(TypeUtility.isObject(nanUnderTest)).to.be.false;
            expect(TypeUtility.isObject(booleanTrueUnderTest)).to.be.false;
            expect(TypeUtility.isObject(booleanFalseUnderTest)).to.be.false;
            expect(TypeUtility.isObject(intUnderTest)).to.be.false;
            expect(TypeUtility.isObject(floatUnderTest)).to.be.false;
            expect(TypeUtility.isObject(undefinedUnderTest)).to.be.false;
            expect(TypeUtility.isObject(nullUnderTest)).to.be.false;
            expect(TypeUtility.isObject(stringUnderTest)).to.be.false;

            done();
        });

        it("should be able to check if value is a function or not", (done) => {
            let objectUnderTest = {},
                functionUnderTest = function () {},
                booleanTrueUnderTest = true,
                booleanFalseUnderTest = false,
                intUnderTest = 1,
                floatUnderTest = 1.1,
                undefinedUnderTest = undefined,
                nullUnderTest = null,
                arrayUnderTest = [],
                stringUnderTest = "test",
                nanUnderTest = NaN;

            expect(TypeUtility.isFunction(functionUnderTest)).to.be.true;

            expect(TypeUtility.isFunction(nanUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(objectUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(booleanTrueUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(booleanFalseUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(intUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(floatUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(undefinedUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(nullUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(stringUnderTest)).to.be.false;
            expect(TypeUtility.isFunction(arrayUnderTest)).to.be.false;

            done();
        });

        it("should be able to check if value is a string or not", (done) => {
            let objectUnderTest = {},
                functionUnderTest = function () {},
                booleanTrueUnderTest = true,
                booleanFalseUnderTest = false,
                intUnderTest = 1,
                floatUnderTest = 1.1,
                undefinedUnderTest = undefined,
                nullUnderTest = null,
                arrayUnderTest = [],
                stringUnderTest = "test",
                nanUnderTest = NaN;

            expect(TypeUtility.isString(stringUnderTest)).to.be.true;

            expect(TypeUtility.isString(nanUnderTest)).to.be.false;
            expect(TypeUtility.isString(functionUnderTest)).to.be.false;
            expect(TypeUtility.isString(objectUnderTest)).to.be.false;
            expect(TypeUtility.isString(booleanTrueUnderTest)).to.be.false;
            expect(TypeUtility.isString(booleanFalseUnderTest)).to.be.false;
            expect(TypeUtility.isString(intUnderTest)).to.be.false;
            expect(TypeUtility.isString(floatUnderTest)).to.be.false;
            expect(TypeUtility.isString(undefinedUnderTest)).to.be.false;
            expect(TypeUtility.isString(nullUnderTest)).to.be.false;
            expect(TypeUtility.isString(arrayUnderTest)).to.be.false;

            done();
        });

        it("should be able to check if value is an array or not", (done) => {
            let objectUnderTest = {},
                functionUnderTest = function () {},
                booleanTrueUnderTest = true,
                booleanFalseUnderTest = false,
                intUnderTest = 1,
                floatUnderTest = 1.1,
                undefinedUnderTest = undefined,
                nullUnderTest = null,
                arrayUnderTest = [],
                stringUnderTest = "test",
                nanUnderTest = NaN;

            expect(TypeUtility.isArray(arrayUnderTest)).to.be.true;

            expect(TypeUtility.isArray(nanUnderTest)).to.be.false;
            expect(TypeUtility.isArray(stringUnderTest)).to.be.false;
            expect(TypeUtility.isArray(functionUnderTest)).to.be.false;
            expect(TypeUtility.isArray(objectUnderTest)).to.be.false;
            expect(TypeUtility.isArray(booleanTrueUnderTest)).to.be.false;
            expect(TypeUtility.isArray(booleanFalseUnderTest)).to.be.false;
            expect(TypeUtility.isArray(intUnderTest)).to.be.false;
            expect(TypeUtility.isArray(floatUnderTest)).to.be.false;
            expect(TypeUtility.isArray(undefinedUnderTest)).to.be.false;
            expect(TypeUtility.isArray(nullUnderTest)).to.be.false;

            done();
        });

        it("should be able to check if value is a number or not", (done) => {
            let objectUnderTest = {},
                functionUnderTest = function () {},
                booleanTrueUnderTest = true,
                booleanFalseUnderTest = false,
                intUnderTest = 1,
                floatUnderTest = 1.1,
                undefinedUnderTest = undefined,
                nullUnderTest = null,
                arrayUnderTest = [],
                stringUnderTest = "test",
                nanUnderTest = NaN;

            expect(TypeUtility.isNumber(floatUnderTest)).to.be.true;
            expect(TypeUtility.isNumber(intUnderTest)).to.be.true;
            expect(TypeUtility.isNumber(nanUnderTest)).to.be.true;

            expect(TypeUtility.isNumber(arrayUnderTest)).to.be.false;
            expect(TypeUtility.isNumber(stringUnderTest)).to.be.false;
            expect(TypeUtility.isNumber(functionUnderTest)).to.be.false;
            expect(TypeUtility.isNumber(objectUnderTest)).to.be.false;
            expect(TypeUtility.isNumber(booleanTrueUnderTest)).to.be.false;
            expect(TypeUtility.isNumber(booleanFalseUnderTest)).to.be.false;
            expect(TypeUtility.isNumber(undefinedUnderTest)).to.be.false;
            expect(TypeUtility.isNumber(nullUnderTest)).to.be.false;

            done();
        });
    });
})();
