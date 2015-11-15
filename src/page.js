import {Dictionary} from "./data/dictionary.js";
import {EventResponder} from "./event_responder.js";
import {MissingIdentifierError} from "./error/missing_identifier_error.js";
import {NavigationError} from "./error/navigation_error.js";
import * as TypeUtilities from "./utility/type_utility.js";
import {PageView} from "./view/page_view.js";

export class Page extends EventResponder {

    /**
     * Initializes the page. This constructor should not be used directly.
     * Use the {@link Page#create} function instead
     * @param {(Page|EventResponder)} parent - The parent page or an event responder
     * @param {String} id - The ID of the page used for navigation
     * @param {String} [title] - An optional title
     * @param {Dictionary} [children]
     */
    constructor(parent, id, title = null, children = new Dictionary()) {
        super(parent);

        this._id = id;
        this._title = title;
        this._nextPage = null;
        this._previousPage = parent instanceof Page ? parent : null;
        this._children = children;
        this._isRendered = false;
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

    // TODO: implement solution for dynamic view selection
    get view() {
        return null;
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

    get isRendered() {
        return this._isRendered;
    }

    get nextPage() {
        return this._nextPage;
    }

    get previousPage() {
        return this._previousPage;
    }

    addToDOM() {
        this._isRendered = true;

        // TODO: add page to DOM
    }

    removeFromDOM() {
        // TODO: remove from DOM

        this._isRendered = false;
    }

    onNavigatedBack(page) {
        if (this.nextPage === page) {
            this.nextPage.removeFromDOM();
            this.addToDOM();

            // remove page from navigation stack
            this._nextPage = null;
        }
    }

    navigateBack() {
        if (this.previousPage instanceof Page) {
            this.previousPage.onNavigatedBack(this);
        } else {
            // TODO propagate error
        }
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

            this.removeFromDOM();
            this.nextPage.addToDOM();

        } else {
            this.propagateError(new NavigationError(this.id, pageId));
        }

        return canNavigate;
    }
}
