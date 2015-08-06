// Vererbung wird benötigt
// Funktionen wie underscore implementieren? -> Modularity.isFunction(func(){})?


/**
 * @author Christoph Grundmann
 * @class Modularity
 */
var ModularityCore = (function () {
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
     * @param {string} [inherits] - The name of the extension to inherit from
     * @param {string[]} [imports] - All names of extensions which should be imported
     * @param {extensionDefinition} extension - The definition of the extension
     */
    core.extend = function (name, inherits, imports, extension) {

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

    function inherits(module, baseModule) {}

    function isFunction(func) {}

    return core;
})();

// 1. Module registrieren, unabhängig von Abhängigkeiten
// 2. Alle Module initialisieren, Abhängigkeiten vermeiden!
// 3. Nutzerdefinierte init() aufrufen

/**
 * @class Extension
 */
ModularityCore.extend("Extension", function (extention) {

    /**
     * Gets the name of the extension
     * @returns {string} The name of the extension
     */
    extention.getExtensionName = function() {
        return extention.name;
    };
});

ModularityCore.extend("Gallery", ["Navigator", ""], function (gallery, navigator) {

});