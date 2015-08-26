/**
 * Helper class used to generate unique IDs
 */ 
export class UniqueId {
    
    /**
     * Initializes the ID generator
     * @param {string} [prefix] - A prefix added to the generated ID 
     */ 
    constructor(prefix) {
        this.index = 0;
        this.prefix = prefix || UniqueId.getDefaultPrefix();
    } 
    
    /**
     * Generates a new ID
     * @return {string} The generated ID
     */ 
    generate() {
        return `${this.prefix}_${this.index++}`;
    }
    
    /**
     * Gets the default prefix, used if no prefix is set
     * @static
     * @return {string} The default prefix
     */
    static getDefaultPrefix() {
        return "id";
    }
}
