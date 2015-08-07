/**
 * The main framework facade used to register new modules and extensions
 * @author Christoph Grundmann
 * @namespace ModularityCore
 */
var ModularityCore = (function () {
    var extensions = {};
    var core = {};

    /**
     * @callback extensionDefinition
     * @param {object} extension - The newly created instance of the extension which should be defined
     */

    /**
     * Registers a new framework extension
     * @memberOf ModularityCore
     * @function extend
     * @param {object} options
     * @param {string} options.name - The name of the new extension
     * @param {string[]} [options.imports = []] - All names of extensions which should be imported
     * @param {extensionDefinition} options.extension - The definition of the extension
     * @throws Will throw an error if an extension with the same name is already registered
     */
    core.extend = function (options) {
        var name = options.name,
            imports = options.imports,
            extension = options.extension,
            instance;

        // name, imports = [], extension = null
        if (ModularityCore.type.isFunction(extensions[name])) {
            throw new Error("Extension with name <" + name + "> already exists. Please use another name or check whether this extension is already added.");
        } else {
            instance = {};
            extension(instance);
            extensions[name] = instance;
        }
    };

    /**
     * Registers a new application module
     * @memberOf ModularityCore
     * @function module
     * @param name
     * @param inherits
     * @param requires
     * @param module
     */
    core.module = function (name, inherits, requires, module) {

    };

    return core;
})();

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
