/**
 * Collection of utilities used to work with namespaces
 * @namespace NamespaceUtility
 */
import {NamespaceCollisionError} from "../error/namespace_collision_error.js";
import {ExtensionExistsError} from "../error/extension_exists_error.js";
import * as TypeUtility from "./type_utility.js";


/**
 * @typedef NamespaceSplitResult
 * @memberOf NamespaceUtility
 * @type {object}
 * @property {string[]} parts - An array of all namespace parts
 * @property {string} name - The extension name
 */

/**
 * Splits the given name into its parts
 * @param {string} namespace - The namespace to split
 * @returns {NamespaceSplitResult} The parts of the namespace and the extension name
 */
export function split(namespace) {
    let parts = namespace.split("."),
        name = parts.pop();

    return {
        parts: parts,
        name: name
    };
}

/**
 * Adds a namespace to the given parent object
 * @param {object} parent - The object to extend
 * @param {string[]} namespaceParts - All parts of the namespace to create
 * @returns {object} The created namespace
 * @throws Will throw an error if the namespace can not be resolved because the namespace part to extend is not an object
 */
export function resolve(parent, namespaceParts) {
    for (let i = 0; i < namespaceParts.length; i++) {
        let part = namespaceParts[i],
            current = parent[part];

        if (current && !TypeUtility.isObject(current)) {
            throw new NamespaceCollisionError(namespaceParts, i);
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
 * @param {string[]} namespaceParts - All parts of the namespace to extend
 * @param {string} extensionName - The name of the extension
 * @param {object} extension - The extension to add
 * @throws Will throw an error if an extension in the given namespace is already registered
 */
export function extend(parent, namespaceParts, extensionName, extension) {
    let namespace = resolve(parent, namespaceParts);

    if (namespace[extensionName]) {
        throw new ExtensionExistsError(namespaceParts.join("."), extensionName);
    } else {
        namespace[extensionName] = extension;
    }
}
