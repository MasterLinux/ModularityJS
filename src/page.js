import {Dictionary} from "./data/dictionary.js";
import {EventResponder} from "./event_responder.js";
import {MissingIdentifierError} from "./error/missing_identifier_error.js";
import {NavigationError} from "./error/navigation_error.js";
import * as TypeUtilities from "./utility/type_utility.js";

export class Page extends EventResponder {

    /**
     *
     * @param {(Page|EventResponder)} parent
     * @param {String} id
     * @param {String} [title]
     * @param {Dictionary} [children]
     */
    constructor(parent, id, title = null, children = new Dictionary()) {
        super(parent);

        this._id = id;
        this._title = title;
        this._nextPage = null;
        this._previousPage = parent instanceof Page ? parent : null;
        this._children = children;
    }

    static create(parent = null, {id, title, children = []} = {}) {
        if (TypeUtilities.isString(id) && id.length > 0) {
            try {
                return new Page(parent, id, title, new Dictionary(children));
            } catch (error) {
                throw new MissingIdentifierError(`Unable to create child of page <${id}> because of an invalid or missing identifier. id must be a <String> and not empty`);
            }
        } else {
            throw new MissingIdentifierError(`Unable to create page because of an invalid or missing identifier. id must be a <String> and not empty but is currently <${id}>`);
        }
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get children() {
        return this._children;
    }

    get nextPage() {
        return this._nextPage;
    }

    get previousPage() {
        return this._previousPage;
    }

    /**
     * Renders the page with the given ID
     * @param {String} pageId - ID of the page to render
     * @returns {Boolean} true if a page with the given ID exists and navigation was successful, false otherwise
     */
    navigateTo(pageId) {
        let pageConfig = this.children.getItem(pageId);
        let canNavigate = !!pageConfig;

        if (canNavigate) {
            this._nextPage = Page.create(this, pageConfig);
        } else {
            this.propagateError(new NavigationError(this.id, pageId));
        }

        return canNavigate;
    }
}
