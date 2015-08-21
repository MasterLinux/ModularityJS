import {ExtensionExistsError} from "./error/extension_exists_error.js";
import {NamespaceCollisionError} from "./error/namespace_collision_error.js";
import {TypeUtility} from "./utility/type_utility.js";

/**
 * The main framework facade used to register new modules and extensions
 * @author Christoph Grundmann
 * @namespace ModularityCore
 */
export var Modularity = {

    /**
     * Registers a new framework extension
     * @memberOf Modularity
     * @function extend
     * @param {string} namespace - The namespace of the new extension
     * @param {object} extension - The definition of the extension
     * @throws Will throw an error if an extension with the same namespace is already registered
     */
    extend: function (namespace, extension) {
        let parts = namespace.split("."),
            lastIndex = parts.length - 1,
            current = this,
            part, ns, isObject;

        for (let index = 0; index < parts.length; index++) {
            part = parts[index];
            ns = current[part];
            isObject = TypeUtility.isObject(ns);

            if (index === lastIndex) {
                if (ns) {
                    if (isObject) {
                        throw new ExtensionExistsError(namespace);
                    } else {
                        throw new NamespaceCollisionError(namespace);
                    }
                } else {
                    current[part] = extension;
                }

            } else if (!ns) {
                current[part] = ns = {};
            } else if (!isObject) {
                throw new NamespaceCollisionError(namespace);
            }

            current = ns;
        }
    }

};