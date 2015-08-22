import {ExtensionExistsError} from "./error/extension_exists_error.js";
import {NamespaceCollisionError} from "./error/namespace_collision_error.js";
import * as NamespaceUtility from "./utility/namespace_utility.js";
import * as TypeUtility from "./utility/type_utility.js";


/**
 * The main framework facade used to register new modules and extensions
 * @author Christoph Grundmann
 * @namespace Modularity
 */
export var Modularity = {

    /**
     * Registers a new framework extension
     * @param {string} namespace - The namespace of the new extension
     * @param {string} name - The name of the new extension
     * @param {object} extension - The definition of the extension
     * @throws Will throw an error if an extension with the same name is already registered in the given namespace
     * @throws Will throw an error if the namespace can not be created because the namespace part to extend is not an object
     * @example
     * Modularity.extend("my.namespace", "Mobile", {
     *      isIOS: function() {
     *          return true;
     *      }
     * });
     *
     * let isIOS = Modularity.my.namespace.Mobile.isIOS();
     */
    extend: function (namespace, name, extension) {
        NamespaceUtility.extend(this, namespace, name, extension);
    }

};
