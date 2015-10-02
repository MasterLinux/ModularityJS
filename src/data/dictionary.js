import {MissingIdentifierError} from "../error/missing_identifier_error.js";
import * as TypeUtilities from "../utility/type_utility.js";

export class Dictionary {

    constructor(items = []) {
        this._items = items;

        this._mapping = {};
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            let id = item.id;

            if (TypeUtilities.isString(id) && id.length > 0) {
                this._mapping[item.id] = item;
            } else {
                throw new MissingIdentifierError(`Unable to create dictionary because of an invalid or missing identifier. Each item must contain an "id" of type <String> and should not be empty but is currently <${id}>`);
            }
        }
    }

    get length() {
        return this._items.length;
    }

    get isEmpty() {
        return this.length == 0;
    }

    get isNotEmpty() {
        return this.length > 0;
    }

    getItem(id) {
        return this._mapping[id];
    }
}
