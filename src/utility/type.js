import {Modularity} from "./modularity.js";

/**
 * Collection of utilities used for type checking.
 * These utilities are inspired by lodash {@link https://lodash.com/}
 * @namespace ModularityCore.type
 */
ModularityCore.type = (function () {
    var utils = {};

    /**
     * Checks whether the given value is a function
     * @memberOf ModularityCore.type
     * @function isFunction
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is a function, otherwise false
     */
    utils.isFunction = function (value) {
        return utils.isObject(value) && Object.prototype.toString.call(value) == '[object Function]';
    };

    /**
     * Checks whether the given value is a string
     * @memberOf ModularityCore.type
     * @function isString
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is a string, otherwise false
     */
    utils.isString = function (value) {
        return typeof value == 'string' || (isObjectLike(value) && String.prototype.toString.call(value) == '[object String]');
    };

    /**
     * Checks whether the given value is an object
     * @memberOf ModularityCore.type
     * @function isObject
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is an object, otherwise false
     */
    utils.isObject = function (value) {
        var type = typeof value;
        return !!value && (type == 'object' || type == 'function');
    };

    /**
     * Checks whether the given value is an array
     * @memberOf ModularityCore.type
     * @function isArray
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is an array, otherwise false
     */
    utils.isArray = function (value) {
        return Array.isArray(value);
    };

    /**
     * Checks whether the given value is object-like
     * @memberOf ModularityCore.type
     * @function isObjectLike
     * @private
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is object-like, otherwise false
     */
    function isObjectLike(value) {
        return !!value && typeof value == 'object';
    }

    return utils;
})();