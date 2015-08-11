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
            imports = core.type.isArray(options.imports) ? options.imports : [],
            extension = options.extension,
            instance = {};

        if (core.type.isFunction(extensions[name])) {
            throw new Error("Extension with name <" + name + "> already exists. Please use another name or check whether this extension is already added.");
        } else {
            extension(instance);
            extensions[name] = Extension.extend(name, imports, instance);
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

(function () {
    var initializing = false, fnTest = /xyz/.test(function () {xyz;}) ? /\b_super\b/ : /.*/;

    /**
     * Prototype used to provide simple JavaScript inheritance.
     * Inspired by John Resig {@link http://ejohn.org/blog/simple-javascript-inheritance/}
     * @class Extension
     */
    this.Extension = function () {
        // The base Class implementation (does nothing)
    };

    /**
     * Creates a new extension that inherits from this extension
     * @memberOf Extension
     * @function extend
     * @param {string} name - The name of the new extension
     * @param {string[]} imports - An array of names of extensions which should be imported
     * @param {object} extension - The new extension which inherits from this extension
     * @return {Extension} Returns the new extension
     */
    Extension.extend = function (name, imports, extension) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        /**
         * The name of the extension
         * @memberOf Extension
         * @type {string}
         * @constant
         * @readonly
         */
        prototype.__NAME__ = name;

        /**
         * An array of names of extensions which should be imported
         * @memberOf Extension
         * @type {string[]}
         * @constant
         * @readonly
         */
        prototype.__IMPORTS__ = imports;

        // Copy the properties over onto the new prototype
        for (var propertyName in extension) {
            // Check if we're overwriting an existing function
            prototype[propertyName] = typeof extension[propertyName] == "function" &&
            typeof _super[propertyName] == "function" && fnTest.test(extension[propertyName]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(propertyName, extension[propertyName]) :
                extension[propertyName];
        }

        // The dummy class constructor
        function Extension() {

            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Extension.prototype = prototype;

        // Enforce the constructor to be what we expect
        Extension.prototype.constructor = Extension;

        // And make this class extendable
        Extension.extend = arguments.callee;

        return Extension;
    };
})();
