import {AuthorParser} from "../parser/author_parser.js";
import {ParsingError} from "../error/parsing_error.js";

export class Author {

    /**
     * Representation of an author
     * @author Christoph Grundmann
     * @class Author
     * @param {object} author
     * @param {string} version.name - The name of the author
     * @param {string} [version.email] - The email address of the author
     */
    constructor({name, email} = {}) {
        this._name = name;
        this._email = email;
    }

    /**
     * Parses an author string to an {@link Author}
     * @memberOf Author
     * @function parse
     * @param {string} author - The string to parse
     * @throws Throws an error if the given string cannot be parsed
     * @static
     * @return {Author} The {@link Author} representing the given author string
     * @example
     * let author = Author.parse("Max Mustermann<max.mustermann@mail.de>");
     *
     * console.log(author.name);
     * console.log(author.email);
     */
    static parse(author) {
        let name, email;

        try {
            let result = AuthorParser.parse(author);

            name = result.name;
            email = result.email;
        } catch (e) {
            throw new ParsingError("Author", author, e);
        }

        return new Author({
            name: name,
            email: email
        })
    }

    /**
     * Gets the name of the author
     * @name name
     * @memberOf Author
     * @type {string}
     * @readonly
     * @instance
     */
    get name() {
        return this._name;
    }

    /**
     * Gets the email address of the author
     * @name email
     * @memberOf Author
     * @type {string}
     * @readonly
     * @instance
     */
    get email() {
        return this._email;
    }

    /**
     * Gets the string representation of the author
     * @memberOf Author
     * @function toString
     * @instance
     * @return {string} The author as string
     */
    toString() {
        if (this.email) {
            return `${this.name}<${this.email}>`;
        } else {
            return this.name;
        }
    }
}
