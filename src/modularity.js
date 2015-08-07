// Vererbung wird ben�tigt
// Funktionen wie underscore implementieren? -> Modularity.isFunction(func(){})?


/**
 * @author Christoph Grundmann
 * @class ModularityCore
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
     * @param {string} name - The name of the new extension
     * @param {string} [inherits = Extension] - The name of the extension to inherit from
     * @param {string[]} [imports = []] - All names of extensions which should be imported
     * @param {extensionDefinition} extension - The definition of the extension
     */
    core.extend = function (name, inherits = "Extension", imports = [], extension = null) {
        if (!ModularityCore.utils.isFunction(extension)) {
            throw new Error("Extension with name <" + name + "> must be a function, but is of type <" + typeof extension + ">");
        } else if (ModularityCore.utils.isFunction(extensions[name])) {
            throw new Error("Extension with name <" + name + "> already exists. Please use another name or check whether this extension is already added.");
        } else {
            extensions[name] = extension;
        }
    };

    /**
     * Registers a new application module
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
 * Collection of utilities used for type checking
 * @namespace
 */
ModularityCore.utils = (function () {
    var utils = {};

    /**
     * Checks whether the given value is a function
     * @param {*} value - The value to test
     * @returns {boolean} Returns true if the given value is a function, otherwise it returns false
     */
    utils.isFunction = function (value) {
        return utils.isObject(value) && Object.prototype.toString.call(value) == '[object Function]';
    };

    utils.isString = function (value) {
        return typeof value == 'string' || (isObjectLike(value) && String.prototype.toString.call(value) == '[object String]');
    };

    utils.isObject = function (value) {
        var type = typeof value;
        return !!value && (type == 'object' || type == 'function');
    };

    /**
     * Checks if `value` is object-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
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