export class UniqueId {
    
    /**
     * Helper class used to generate unique IDs
     * @author Sven Lang
     * @class UniqueId
     * @param {string} [prefix] - A prefix added to the generated ID 
     */ 
    constructor(prefix) {
        this.prefix = prefix || UniqueId.getDefaultPrefix();
        this.index = 0;
    }
    
    /**
     * Generates a new ID
     * @memberOf UniqueId
     * @function generate
     * @return {string} The generated ID
     */ 
    generate() {
        return `${this.prefix}_${this.index++}`;
    }
    
    /**
     * Gets the default prefix, used if no prefix is set
     * @memberOf UniqueId
     * @function getDefaultPrefix
     * @static
     * @return {string} The default prefix
     */
    static getDefaultPrefix() {
        return "id";
    }
}
