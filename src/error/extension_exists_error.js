/**
 * Error which is thrown whenever an extension with the same name already exists
 * @author Christoph Grundmann
 * @class ExtensionExistsError
 * @param {string} namespace - The namespace which contains the extension
 * @param {string} name - The name of the extension which already exists
 */
export function ExtensionExistsError(namespace, name) {
    let message = `Extension in namespace <${namespace}> with name <${name}> already exists. Please use another name or check whether this extension is already added`;
    let base = Error.apply(this, [message]);
    base.name = this.name = "ExtensionExistsError";
    this.message = base.message;
}

// inherit from Error
ExtensionExistsError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: ExtensionExistsError,
        writable: true,
        configurable: true
    }
});
