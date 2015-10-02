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
        this._previousPage = parent;
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

    get navigationStack() {
        return this._children;
    }

    get nextPage() {
        return this._nextPage;
    }

    get previousPage() {
        return this._previousPage;
    }

    navigateTo(pageId) {
        let pageConfig = this.navigationStack.getItem(pageId);

        if (pageConfig) {
            this._nextPage = Page.create(this, pageConfig);
            return true;
        } else {
            this.propagateError(new NavigationError(this.id, pageId));
            return false;
        }
    }
}
