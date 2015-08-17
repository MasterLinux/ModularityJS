//import {Extension} from "extension.js";


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
            extensions[name] = null;//Extension.extend(name, imports, instance);
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




