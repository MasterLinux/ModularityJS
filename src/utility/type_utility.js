/**
 * Collection of utilities used for type checking.
 * These utilities are inspired by lodash {@link https://lodash.com/}
 * @namespace TypeUtility
 */

/**
 * Checks whether the given value is a function
 * @memberOf TypeUtility
 * @function isFunction
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is a function, otherwise false
 */
export function isFunction(value) {
    return isObject(value) && Object.prototype.toString.call(value) == '[object Function]';
}

/**
 * Checks whether the given value is a string
 * @memberOf TypeUtility
 * @function isString
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is a string, otherwise false
 */
export function isString(value) {
    return typeof value == 'string' || (isObjectLike(value) && Object.prototype.toString.call(value) == '[object String]');
}

/**
 * Checks whether the given value is an object
 * @memberOf TypeUtility
 * @function isObject
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is an object, otherwise false
 */
export function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks whether the given value is an array
 * @memberOf TypeUtility
 * @function isArray
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is an array, otherwise false
 */
export function isArray(value) {
    return Array.isArray(value);
}

/**
 * Checks whether the given value is object-like
 * @memberOf TypeUtility
 * @function isObjectLike
 * @private
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is object-like, otherwise false
 */
export function isObjectLike(value) {
    return !!value && typeof value == 'object';
}

/**
 * Checks whether the given value is a number
 * @memberOf TypeUtility
 * @function isNumber
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is a number, otherwise false
 */
export function isNumber(value) {
    return typeof value == 'number' || (isObjectLike(value) && Object.prototype.toString.call(value) == '[object Number]');
}

/**
 * Checks whether the given value is undefined
 * @memberOf TypeUtility
 * @function isUndefined
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is undefined, otherwise false
 */
export function isUndefined(value) {
    return value === undefined;
}

/**
 * Checks whether the given value is null
 * @memberOf TypeUtility
 * @function isNull
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is null, otherwise false
 */
export function isNull(value) {
    return value === null;
}

/**
 * Checks whether the given value is NaN
 * @memberOf TypeUtility
 * @function isNaN
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is NaN, otherwise false
 */
export function isNaN(value) {
    return isNumber(value) && value != +value;
}

/**
 * Checks whether the given value is a boolean
 * @memberOf TypeUtility
 * @function isBoolean
 * @param {*} value - The value to check
 * @returns {boolean} Returns true if the given value is a boolean, otherwise false
 */
export function isBoolean(value) {
    return value === true || value === false || (isObjectLike(value) && Object.prototype.toString.call(value) == '[object Boolean]');
}
