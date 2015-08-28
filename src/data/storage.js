import * as MemoryUtility from "../utility/memory_utility.js";
import {UniqueId} from "./unique_id.js";

/**
 * @class Storage
 */
export class Storage {

    /**
     * Initializes the storage
     * @param {string} id - ID of the storage required to persist the storage data
     * @param {boolean} isMutable
     */
    constructor(id, isMutable) {
        this.isLocalStorageAvailable = MemoryUtility.isLocalStorageAvailable();
        this.isMutable = isMutable || false;
        this.memory = {};
        this.id = id;
    }

    /**
     * Writes the given value to the storage
     * @param {string} key - The key of the value to write
     * @param {*} value - The value to write
     */
    write(key, value) {
        MemoryUtility.writeTo(this.memory, key, value, this.isMutable);
        this.persist();
    }

    /**
     * Gets a specific value by its key
     * @param {string} key - The key of the value to get
     * @return {*|undefined} Returns the value or undefined if not exists
     */
    read(key) {
        return MemoryUtility.readFrom(this.memory, key);
    }

    /**
     * Removes a specific value by its key
     * @param {string }key - The key of the value to remove
     */
    remove(key) {
        MemoryUtility.deleteFrom(this.memory, key);
        this.persist();
    }

    /**
     * Checks whether the storage contains a value with the given key
     * @param {string} key - The key of the value to check
     * @return {boolean} Returns true if the storage contains a value with the given key, false otherwise
     */
    contains(key) {
        return MemoryUtility.isAvailableIn(this.memory, key);
    }

    /**
     * Writes the whole storage data to local storage
     * @private
     * @return {boolean} Returns true if the storage data could be written to local storage, false otherwise
     */
    persist() {
        if (this.isLocalStorageAvailable) {
            MemoryUtility.persist(this.id, this.memory);
            return true;
        }

        return false;
    }
}
