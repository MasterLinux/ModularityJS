import * as MemoryUtility from "../utility/memory_utility.js";

export class Storage {

    static getPersistentStorage(id) {
        let memory = MemoryUtility.getPersistentMemory(id);
        let storage = new Storage(id, memory["__isMutable__"]);

        for (let key in memory) {
            if (memory.hasOwnProperty(key) && key !== "__isMutable__") {
                storage.write(key, memory[key]);
            }
        }

        return storage;
    }

    /**
     * Initializes the storage
     * @author Christoph Grundmann
     * @param {string} id - ID of the storage required to persist the storage data
     * @param {boolean} [isMutable=false] - If true values can be overwritten, if false the storage throws an error when trying to write a value with an already existing key
     * @class Storage
     */
    constructor(id, isMutable = false) {
        this.isLocalStorageAvailable = MemoryUtility.isLocalStorageAvailable();
        this.isMutable = isMutable;
        this.memory = {
            "__isMutable__": isMutable
        };
        this.id = id;
    }

    /**
     * Writes the given value to the storage
     * @memberOf Storage
     * @function write
     * @param {string} key - The key of the value to write
     * @param {*} value - The value to write
     * @throws Will throw an error if storage is not mutable and a value with an already available key will be written
     */
    write(key, value) {
        MemoryUtility.writeTo(this.memory, key, value, this.isMutable);
        this.persist();
    }

    /**
     * Gets a specific value by its key
     * @memberOf Storage
     * @function read
     * @param {string} key - The key of the value to get
     * @return {*|undefined} Returns the value or undefined if not exists
     */
    read(key) {
        return MemoryUtility.readFrom(this.memory, key);
    }

    /**
     * Removes a specific value by its key
     * @memberOf Storage
     * @function remove
     * @param {string }key - The key of the value to remove
     */
    remove(key) {
        MemoryUtility.deleteFrom(this.memory, key);
        this.persist();
    }

    /**
     * Checks whether the storage contains a value with the given key
     * @memberOf Storage
     * @function contains
     * @param {string} key - The key of the value to check
     * @return {boolean} Returns true if the storage contains a value with the given key, false otherwise
     */
    contains(key) {
        return MemoryUtility.isAvailableIn(this.memory, key);
    }

    /**
     * Writes the whole storage data to local storage
     * @memberOf Storage
     * @function persist
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
