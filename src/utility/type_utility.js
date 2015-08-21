/**
 * Collection of utilities used for type checking.
 * These utilities are inspired by lodash {@link https://lodash.com/}
 * @namespace TypeUtility
 */
export var TypeUtility = {

    /**
     * Checks whether the given value is a function
     * @memberOf ModularityCore.type
     * @function isFunction
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is a function, otherwise false
     */
    isFunction: function (value) {
        return this.isObject(value) && Object.prototype.toString.call(value) == '[object Function]';
    },

    /**
     * Checks whether the given value is a string
     * @memberOf ModularityCore.type
     * @function isString
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is a string, otherwise false
     */
    isString: function (value) {
        return typeof value == 'string' || (this.isObjectLike(value) && Object.prototype.toString.call(value) == '[object String]');
    },

    /**
     * Checks whether the given value is an object
     * @memberOf ModularityCore.type
     * @function isObject
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is an object, otherwise false
     */
    isObject: function (value) {
        var type = typeof value;
        return !!value && (type == 'object' || type == 'function');
    },

    /**
     * Checks whether the given value is an array
     * @memberOf ModularityCore.type
     * @function isArray
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is an array, otherwise false
     */
    isArray: function (value) {
        return Array.isArray(value);
    },

    /**
     * Checks whether the given value is object-like
     * @memberOf ModularityCore.type
     * @function isObjectLike
     * @private
     * @param {*} value - The value to check
     * @returns {boolean} Returns true if the given value is object-like, otherwise false
     */
    isObjectLike: function (value) {
        return !!value && typeof value == 'object';
    }
};
