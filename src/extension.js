export function Extension() {}


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