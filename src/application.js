import {EventResponder} from "./event_responder.js";
import {Version} from "./data/version.js";
import {Author} from "./data/author.js";
import {Stack} from "./data/stack.js";
import {Page} from "./page.js";
import {Dictionary} from "./data/dictionary.js";
import {Renderer} from "./renderer.js";

export class Application extends EventResponder {

    /**
     * Representation of an application
     * @author Christoph Grundmann
     * @class Application
     * @param {EventResponder} responder - The next event responder in chain
     * @param {object} info - An object with all information about the application
     * @param {string} info.name - The name of the application
     * @param {string} info.version - The version number of the application
     * @param {string} info.author - The author who published the application
     * @param {string} info.company - The company behind the application
     */
    constructor(responder, {name, version, author, company} = {}) {
        super(responder);

        this._pages = new Dictionary();
        this._name = name;
        this._company = company;
        this._setVersion(version);
        this._setAuthor(author);
        this._renderer = new Renderer(this, "body");
    }

    /**
     * Gets the name of the application
     * @name name
     * @memberOf Application
     * @type {string}
     * @readonly
     * @instance
     */
    get name() {
        return this._name;
    }

    /**
     * Gets the version number of the application
     * @name version
     * @memberOf Application
     * @type {Version}
     * @readonly
     * @instance
     */
    get version() {
        return this._version;
    }

    /**
     * Gets the author who published the application
     * @name author
     * @memberOf Application
     * @type {Author}
     * @readonly
     * @instance
     */
    get author() {
        return this._author;
    }

    /**
     * Gets the company behind the application
     * @name company
     * @memberOf Application
     * @type {string}
     * @readonly
     * @instance
     */
    get company() {
        return this._company;
    }

    get pages() {
        return this._pages;
    }

    registerPage({id, title}) {
        let page = Page.create(this, {
            title: title,
            id: id
        });

        this.pages.insert(page);
    }

    /**
     * @memberOf Application
     * @function _setVersion
     * @instance
     * @private
     */
    _setVersion(version) {
        try {
            this._version = Version.parse(version);
        } catch(e) {
            this._version = new Version();
            this.propagateError(e);
        }
    }

    /**
     * @memberOf Application
     * @function _setAuthor
     * @instance
     * @private
     */
    _setAuthor(author) {
        try {
            this._author = Author.parse(author);
        } catch(e) {
            this._author = null;
            this.propagateError(e);
        }
    }

    // TODO: refactoring required. This is just for testing purposes
    render() {
        let page = Page.create(null, {
            id: "id"
        });

        this._renderer.render({
            type: "PageView",
            attributes: {
                name: "test"
            },
            children: [{
                type: "PageView",
                attributes: {
                    name: "test"
                },
                children: [{
                    type: "PageView",
                    attributes: {
                        name: "test"
                    }
                }]
            },{
                type: "PageView",
                attributes: {
                    name: "test"
                }
            }]
        });
    }
}

// TODO: Remove the following lines. These are just for testing purposes
let app = new Application(null, {
    name: "app_name"
});

app.render();
