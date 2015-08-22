import {ExtensionExistsError} from "./error/extension_exists_error.js";
import {NamespaceCollisionError} from "./error/namespace_collision_error.js";
import * as NamespaceUtility from "./utility/namespace_utility.js";
import * as TypeUtility from "./utility/type_utility.js";


export var Modularity = {
    /**
     * The main framework facade used to register new modules and extensions
     * @author Christoph Grundmann
     * @namespace Modularity
     */

    /**
     * Registers a new framework extension
     * @param {string} namespace - The namespace of the new extension
     * @param {object} extension - The definition of the extension
     * @throws Will throw an error if an extension in the same namespace is already registered
     * @throws Will throw an error if the namespace can not be created because the namespace part to extend is not an object
     * @example
     * Modularity.extend("utility.Mobile", {
     *      isIOS: function() {
     *          return true;
     *      }
     * });
     *
     * let isIOS = Modularity.utility.Mobile.isIOS();
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
                        throw new NamespaceCollisionError(namespace, part);
                    }
                } else {
                    current[part] = extension;
                }

            } else if (!ns) {
                current[part] = ns = {};
            } else if (!isObject) {
                throw new NamespaceCollisionError(namespace, part);
            }

            current = ns;
        }
    }

};