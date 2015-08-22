import {ValueOverrideError} from "../error/value_override_error.js";
import * as TypeUtility from "../utility/type_utility.js";

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
