import {AuthorParser} from "../parser/author_parser.js";
import {ParsingError} from "../error/parsing_error.js";

export class Author {

    constructor({name, email} = {}) {
        this._name = name;
        this._email = email;
    }

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

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    toString() {
        if (this.email) {
            return `${this.name}<${this.email}>`;
        } else {
            return this.name;
        }
    }
}
