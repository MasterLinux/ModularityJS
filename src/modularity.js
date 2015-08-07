// Vererbung wird ben�tigt
// Funktionen wie underscore implementieren? -> Modularity.isFunction(func(){})?


/**
 * @author Christoph Grundmann
 * @namespace ModularityCore
 */
var ModularityCore = (function () {
    var extensions = {};
    var core = {};

    /**
     * @callback extensionDefinition
     * @param {Extension} extension - The newly created instance of the extension
     * @param {string} extension.name - The name of the extension
     * @param {...Extension} imports - Each imported extension
     */

    /**
     * Registers a new framework extension
     * @memberOf ModularityCore
     * @function extend
     * @param {string} name - The name of the new extension
     * @param {string} [inherits = Extension] - The name of the extension to inherit from
     * @param {string[]} [imports = []] - All names of extensions which should be imported
     * @param {extensionDefinition} extension - The definition of the extension
     * @throws Will throw an error if an exception with the same name is already registered
     * @throws Will throw an error if the given extension is not defined. Argument extension must be a function
     */
    core.extend = function (name, inherits = "Extension", imports = [], extension = null) {
        if (!ModularityCore.type.isFunction(extension)) {
            throw new Error("Extension with name <" + name + "> must be a function, but is of type <" + typeof extension + ">");
        } else if (ModularityCore.type.isFunction(extensions[name])) {
            throw new Error("Extension with name <" + name + "> already exists. Please use another name or check whether this extension is already added.");
        } else {
            extensions[name] = extension;
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

    function inherits(module, baseModule) {
    }

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

// 1. Module registrieren, unabh�ngig von Abh�ngigkeiten
// 2. Alle Module initialisieren, Abh�ngigkeiten vermeiden!
// 3. Nutzerdefinierte init() aufrufen

/**
 * @class Extension
 */
ModularityCore.extend("Extension", function (extention) {

    /**
     * Gets the name of the extension
     * @returns {string} The name of the extension
     */
    extention.getExtensionName = function () {
        return extention.name;
    };
});

ModularityCore.extend("Gallery", ["Navigator", ""], function (gallery, navigator) {

});