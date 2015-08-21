/**
 * Error which is thrown whenever an extension can not be added because the namespace to extend is not an object
 * @class NamespaceCollisionError
 * @param {string} namespace - The namespace of the extension which already exists
 * @param {string} part - The namespace part which is not an object to extend
 * @constructor
 */
export function NamespaceCollisionError(namespace, part) {
    let message = "Unable to extend namespace <" + namespace + "> because <" + part + "> is not an object";
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