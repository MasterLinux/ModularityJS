/**
 * Error which is thrown whenever an extension with the same name already exists
 * @class ExtensionExistsError
 * @param {string} name - The name of the extension which already exists
 * @constructor
 */
export function NamespaceCollisionError(name) {
    let message = "Extension with name <" + name + "> already exists. Please use another name or check whether this extension is already added.";
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