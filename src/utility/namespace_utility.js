/**
 * Collection of utilitiy functions used to work with namespaces
 * @module NamespaceUtility
 * @author Christoph
 */
import NamespaceCollisionError from "../error/namespace_collision_error.js";
import ExtensionExistsError from "../error/extension_exists_error.js";
import * as TypeUtility from "./type_utility.js";


/**
 * Adds a namespace to the given parent object
 * @param {object} parent - The object to extend
 * @param {string} namespace - The namespace to resolve
 * @returns {object} The created namespace
 * @throws Will throw an error if the namespace can not be resolved because the namespace part to extend is not an object
 * @example
 * let framework = {};
 *
 * let namespace = resolve(framework, "my.namespace");
 * namespace.isIOS = true;
 *
 * // prints true
 * console.log(framework.my.namespace.isIOS == namespace.isIOS);
 */
export function resolve(parent, namespace) {
    let parts = namespace.split(".");

    for (let i = 0; i < parts.length; i++) {
        let part = parts[i],
            current = parent[part];

        if (current && !TypeUtility.isObject(current)) {
            throw new NamespaceCollisionError(parts, i);
        } else if (!current) {
            parent[part] = {};
        }

        parent = parent[part];
    }

    return parent;
}

/**
 * Adds an extension to the namespace of the given parent object
 * @param {object} parent - The root object to extend
 * @param {string} namespace - The namespace in which the extension should be registered
 * @param {string} name - The name of the extension
 * @param {object} extension - The extension to add
 * @throws Will throw an error if an extension in the given namespace is already registered
 * @throws Will throw an error if the namespace can not be resolved because the namespace part to extend is not an object
 * @example
 * let framework = {};
 *
 * extend(framework, "my.namespace", "Mobile", {
 *      isIOS: function() {
 *          return true;
 *      }
 * });
 *
 * let isIOS = framework.my.namespace.Mobile.isIOS();
 */
export function extend(parent, namespace, name, extension) {
    let ns = resolve(parent, namespace);

    if (ns[name]) {
        throw new ExtensionExistsError(namespace, name);
    } else {
        ns[name] = extension;
    }
}
