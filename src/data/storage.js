import * as MemoryUtility from "../utility/memory_utility.js";

export class Storage {

    /**
     * A Storage used to read and write key/value pairs to local storage
     * @author Christoph Grundmann
     * @param {string} id - ID of the storage required to persist the storage data
     * @param {boolean} [isMutable=false] - If true values can be overwritten, if false the storage throws an error when trying to write a value with an already existing key
     * @class Storage
     */
    constructor(id, isMutable = false) {
        this._isLocalStorageAvailable = MemoryUtility.isLocalStorageAvailable();
        this._isMutable = isMutable;
        this._memory = {};
        this._id = id;

        // save initial state required to restore from local storage
        this.write(Storage.kIsMutableMemoryKey, isMutable);
    }

    /**
     * Gets a specific storage from local storage
     * @memberOf Storage
     * @function getPersistentStorage
     * @static
     * @param {string} id - The ID of the storage to get
     * @return {Storage|undefined} Returns the storage or undefined if no storage with the given key is available
     */
    static getPersistentStorage(id) {
        let memory = MemoryUtility.getPersistentMemory(id);

        if (memory) {
            let storage = new Storage(id, memory[Storage.kIsMutableMemoryKey]);

            for (let key in memory) {
                if (memory.hasOwnProperty(key) && key !== Storage.kIsMutableMemoryKey) {
                    storage.write(key, memory[key]);
                }
            }

            return storage;
        }

        return undefined;
    }

    /**
     * Gets the key used to store {@link Storage#isMutable}
     * @name kIsMutableMemoryKey
     * @see {@link Storage#isMutable}
     * @memberOf Storage
     * @type {string}
     * @readonly
     * @static
     */
    static get kIsMutableMemoryKey() {
        return "__isMutable__";
    }

    /**
     * Gets whether the storage is mutable. If true values can be overwritten.
     * If false the write function throws an error when trying to overwrite a value with an already existing key
     * @name isMutable
     * @memberOf Storage
     * @type {boolean}
     * @readonly
     * @instance
     */
    get isMutable() {
        return this._isMutable;
    }

    /**
     * Gets the ID of the storage used to persist the
     * data to local storage
     * @name id
     * @memberOf Storage
     * @type {string}
     * @readonly
     * @instance
     */
    get id() {
        return this._id;
    }

    /**
     * Writes the given value to the storage
     * @memberOf Storage
     * @function write
     * @instance
     * @param {string} key - The key of the value to write
     * @param {(boolean|string|number)} value - The value to write
     * @throws Will throw an error if storage is not mutable and a value with an already available key will be written
     *
     * @throws Will throw error if value cannot be written to memory, because the data-type of the given value is not supported. See {@link MemoryUtilities#isWriteable}
     */
    write(key, value) {
        MemoryUtility.writeTo(this._memory, key, value, this.isMutable);
        this.persist();
    }

    /**
     * Gets a specific value by its key
     * @memberOf Storage
     * @function read
     * @instance
     * @param {string} key - The key of the value to get
     * @return {(boolean|string|number|undefined)} Returns the value or undefined if not exists
     */
    read(key) {
        return MemoryUtility.readFrom(this._memory, key);
    }

    /**
     * Removes a specific value by its key
     * @memberOf Storage
     * @function remove
     * @instance
     * @param {string }key - The key of the value to remove
     */
    remove(key) {
        MemoryUtility.deleteFrom(this._memory, key);
        this.persist();
    }

    /**
     * Checks whether the storage contains a value with the given key
     * @memberOf Storage
     * @function contains
     * @instance
     * @param {string} key - The key of the value to check
     * @return {boolean} Returns true if the storage contains a value with the given key, false otherwise
     */
    contains(key) {
        return MemoryUtility.isAvailableIn(this._memory, key);
    }

    /**
     * Writes the whole storage data to local storage
     * @memberOf Storage
     * @function persist
     * @instance
     * @private
     * @return {boolean} Returns true if the storage data could be written to local storage, false otherwise
     */
    persist() {
        if (this._isLocalStorageAvailable) {
            MemoryUtility.persist(this.id, this._memory);
            return true;
        }

        return false;
    }
}
