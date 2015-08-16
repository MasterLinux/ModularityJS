import {ExtensionExistsError} from "./error/extension_exists_error.js";
import {NamespaceCollisionError} from "./error/namespace_collision_error.js";

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
        let parts = namespace.split(".");
        let lastIndex = parts.length - 1;
        let ns = this;

        console.log(parts);

        for (let index = 0; index < parts.length; index++) {
            let part = parts[index];

            if (index === lastIndex) {
                if (ns[part]) {
                    throw new ExtensionExistsError(namespace);
                } else {
                    ns[part] = extension;
                }


            } else if (!ns[part]) {
                ns[part] = {};
            } else if (!Object.isObject(ns[part])) {
                throw new NamespaceCollisionError(namespace);
            }

            ns = ns[part];
        }
    }

};