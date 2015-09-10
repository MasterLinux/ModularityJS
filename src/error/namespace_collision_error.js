import * as TypeUtility from "../utility/type_utility.js";

/**
 * Error which is thrown whenever an extension can not be added because the namespace to extend is not an object
 * @author Christoph Grundmann
 * @class NamespaceCollisionError
 * @param {string[]} [namespace] - The namespace of the extension which already exists
 * @param {number} [index] - The index of the namespace part which is not an object to extend
 */
export function NamespaceCollisionError(namespace, index) {
    let message = this.buildMessage(namespace, index);
    let base = Error.apply(this, [message]);

    base.name = this.name = "NamespaceCollisionError";
    this.message = base.message;
}

// inherit from Error
NamespaceCollisionError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: NamespaceCollisionError,
        writable: true,
        configurable: true
    }
});

/**
 * Builds the error message
 * @param {string} [namespace] - The namespace of the extension which already exists
 * @param {number} [index] - The index of the namespace part which is not an object to extend
 * @return {string} - The error message
 */
NamespaceCollisionError.prototype.buildMessage = function (namespace, index) {
    if (namespace && TypeUtility.isNumber(index)) {
        let markedNamespace = "", lastIndex = namespace.length - 1;

        // mark critical namespace part
        for (let i = 0; i < namespace.length; i++) {
            if (i == index) {
                markedNamespace += `{${namespace[i]}`;
            } else {
                markedNamespace += namespace[i];
            }

            if (i != lastIndex) {
                markedNamespace += ".";
            }
        }

        return `Unable to resolve namespace because <${namespace[index]}> in namespace <${markedNamespace}> is not an object`;
    }

    return "Unable to resolve namespace";
};
