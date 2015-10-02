import {Dictionary} from "./data/dictionary.js";

export class Page {

    constructor(parent = null, {id, title, pages = []} = {}) {
        this._id = id;
        this._title = title;
        this._nextPage = null;
        this._previousPage = parent;
        this._navigationStack = new Dictionary(pages);
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get navigationStack() {
        return this._navigationStack;
    }

    get nextPage() {
        return this._nextPage;
    }

    get previousPage() {
        return this._previousPage;
    }

    navigateTo(pageId) {
        let pageConfig = this.navigationStack.getItem(pageId);
        this._nextPage = new Page(this, pageConfig);
    }
}
