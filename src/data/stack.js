import * as TypeUtilities from "../utility/type_utility.js";

export class Stack {

    /**
     * Implementation of an iterable stack
     * @author Christoph Grundmann
     * @class Stack
     * @param {(*[]|...*)} values - Values to add as initial values
     */
    constructor(...values) {
        if (values.length > 0 && TypeUtilities.isArray(values[0])) {
            this._values = values[0];
        } else {
            this._values = values;
        }

        this._index = 0;
    }

    get length() {
        return this._values.length;
    }

    get index() {
        return this._index;
    }

    get hasNext() {
        return this._index < this._values.length - 1;
    }

    get hasPrevious() {
        return this._index > 0;
    }

    get current() {
        return this._values[this.index];
    }

    get last() {
        let lastIndex = this._values.length - 1;
        return this._values[lastIndex];
    }

    get first() {
        return this._values[0];
    }

    push(value) {
        this._values.push(value);
    }

    pop() {
        return this._values.pop();
    }

    resetIndex() {
        this._index = 0;
    }

    next() {
        if (this.hasNext) {
            ++this._index;
            return true;
        }

        return false;
    }

    previous() {
        if (this.hasPrevious) {
            --this._index;
            return true;
        }

        return false;
    }
}