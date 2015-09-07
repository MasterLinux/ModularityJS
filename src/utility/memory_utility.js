/**
 * Collection of utility functions to manage a memory object
 * @module MemoryUtilities
 * @author Christoph Grundmann
 * @example
 * import * as MemoryUtilities from "../utility/memory_utility.js";
 *
 * // create object used as memory
 * let memory = {};
 *
 * // write to memory
 * MemoryUtilities.writeTo(memory, "my_key", 42);
 *
 * // read from memory
 * let value = MemoryUtilities.readFrom(memory, "my_key");
 */
import {ValueOverrideError} from "../error/value_override_error.js";
import * as TypeUtility from "../utility/type_utility.js";

/**
 * Writes a value to the given memory object. It is not possible to write undefined and null values
 * @param {object} memory - The object which should be used as storage
 * @param {string} key - The key of the value
 * @param {boolean} [isMutable=false] - If set to true the memory allows overwriting values
 * @param {*} value - The value to write
 * @throws Will throw error if memory is not mutable and a value with an already available key will be written
 */
export function writeTo(memory, key, value, isMutable) {
    isMutable = isMutable || false;

    if (isAvailableIn(memory, key) && !isMutable) {
        throw new ValueOverrideError(key);
    } else if (value !== null) {
        memory[key] = value;
    }
}

/**
 * Gets the value with the given key or undefined if no value with this key exists
 * @param {object} memory - The object which contains the value
 * @param {string} key - The key of the value to read
 * @return {*|undefined} Returns the value if exists in memory, otherwise undefined 
 */
export function readFrom(memory, key) {
    return isAvailableIn(memory, key) ? memory[key] : undefined;
}

/**
 * Deletes the value with the given key from memory
 * @param {object} memory - The object which contains the value
 * @param {string} key - The key of the value to delete
 */
export function deleteFrom(memory, key) {
    memory[key] = undefined;
}

/**
 * Checks whether the given memory object contains a value with the given key
 * @param {object} memory - The object to check whether it contains the value
 * @param {string} key - The key of the value to check
 * @return {boolean} Returns true if the memory object contains a value with the given key, otherwise false
 */
export function isAvailableIn(memory, key) {
    let value = memory[key];
    return value !== undefined && value !== null;
}

/**
 * Writes the given memory object to the local storage
 * @param {string} key - The key of the memory to persist
 * @param {object} memory - The memory object to persist
 */
export function persist(key, memory) {
    localStorage.setItem(key, memory);
}

/**
 * Gets a specific memory object from the local storage
 * @param {string} key - The key of the memory to get
 * @returns {object|undefined} The memory object or undefined if not exists
 */
export function getPersistentMemory(key) {
    return localStorage.getItem(key);
}

/**
 * Checks whether the local storage is available. Whenever
 * the user use the private mode in iOS or OSX the local
 * and session storage is not available.
 * @return {boolean} Returns true if local storage is available, otherwise false
 */
export function isLocalStorageAvailable() {
    let key = "local_storage",
        storage;

    try {
        storage = window.sessionStorage;
        storage.setItem(key, "value");
        storage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
}
