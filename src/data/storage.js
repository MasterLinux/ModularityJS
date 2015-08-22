import {ValueOverrideError} from "../error/value_override_error.js";

/**
 * Writes a value to the given memory object
 * @param {object} memory - The object which should be used as storage
 * @param {string} key - The key of the value
 * @param {boolean} [isMutable=false] - If set to true the memory allows overwriting values
 * @param {*} value - The value to write
 * @throws Will throw error if memory is not mutable and a value with an already available key will be written
 */
export function writeTo(memory, key, value, isMutable) {
    isMutable = isMutable || false;

    if (memory[key] && !isMutable) {
        throw new ValueOverrideError(key);
    } else {
        memory[key] = value;
    }
}

/**
 * Gets the value with the given key or undefined if no value with this key exists
 * @param {object} memory - The object which contains the value
 * @param {string} key - The key of the value to read
 * @return {*|undefined}
 */
export function readFrom(memory, key) {
    return memory[key] || undefined;
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
    return !!memory[key];
}
