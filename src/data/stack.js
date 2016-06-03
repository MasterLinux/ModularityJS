import * as TypeUtilities from "../utility/type_utility.js";
import "babel-polyfill";

export class Stack {

    /**
     * All allowed value data-types for {@link Stack}
     * @typedef {(number|string|boolean|object)} StackValueType
     */

    /**
     * Implementation of an iterable stack
     * @author Christoph Grundmann
     * @class Stack
     * @param {(StackValueType[]|...StackValueType)} values - Values to add as initial values
     * @example
     * let stack = new Stack(1, 2, 3);
     * stack.resetIndex();
     *
     * while(stack.hasNext) {
     *     console.log(stack.current);
     *     stack.next();
     * }
     *
     */
    constructor(...values) {
        if (values.length > 0 && TypeUtilities.isArray(values[0])) {
            this._values = values[0];
        } else {
            this._values = values;
        }

        this._index = 0;
    }

    /**
     * Gets the number of values in stack
     * @name length
     * @memberOf Stack
     * @type {number}
     * @readonly
     * @instance
     */
    get length() {
        return this._values.length;
    }

    /**
     * Gets the current iteration index
     * @name index
     * @memberOf Stack
     * @type {number}
     * @readonly
     * @instance
     */
    get index() {
        return this._index;
    }

    /**
     * Gets whether the stack has a next value or not
     * @name hasNext
     * @memberOf Stack
     * @type {boolean}
     * @readonly
     * @instance
     */
    get hasNext() {
        return this._index < this._values.length - 1;
    }

    /**
     * Gets whether the stack has a previous value or not
     * @name hasPrevious
     * @memberOf Stack
     * @type {boolean}
     * @readonly
     * @instance
     */
    get hasPrevious() {
        return this._index > 0;
    }

    /**
     * Gets the current value in the iteration
     * @name current
     * @memberOf Stack
     * @type {StackValueType|undefined}
     * @readonly
     * @instance
     */
    get current() {
        return this._values[this.index];
    }

    /**
     * Gets the last value in stack
     * @name last
     * @memberOf Stack
     * @type {StackValueType|undefined}
     * @readonly
     * @instance
     */
    get last() {
        let lastIndex = this._values.length - 1;
        return this._values[lastIndex];
    }

    /**
     * Gets the first value in stack
     * @name first
     * @memberOf Stack
     * @type {StackValueType|undefined}
     * @readonly
     * @instance
     */
    get first() {
        return this._values[0];
    }

    /**
     * Adds a new value to the stack
     * @memberOf Stack
     * @function push
     * @instance
     * @param {StackValueType} value - The value to push
     */
    push(value) {
        this._values.push(value);
    }

    /**
     * Removes the last value from stack
     * @memberOf Stack
     * @function pop
     * @instance
     * @return {StackValueType} The removed value
     */
    pop() {
        return this._values.pop();
    }

    /**
     * Resets the iteration index. This function should be
     * called before each iteration
     * @memberOf Stack
     * @function resetIndex
     * @instance
     */
    resetIndex() {
        this._index = 0;
    }

    /**
     * Iterates to the next value in stack
     * @memberOf Stack
     * @function next
     * @instance
     * @return {boolean} Returns true if stack has a next value and the iteration was successful, otherwise false
     */
    next() {
        if (this.hasNext) {
            ++this._index;
            return true;
        }

        return false;
    }

    /**
     * Iterates to the previous value in stack
     * @memberOf Stack
     * @function previous
     * @instance
     * @return {boolean} Returns true if stack has a previous value and the iteration was successful, otherwise false
     */
    previous() {
        if (this.hasPrevious) {
            --this._index;
            return true;
        }

        return false;
    }

    /**
     * @param {function(T=, number=, Array.<T>=)} callback
     * @param {*} [thisArg]
     * @return {Array}
     */
    map(callback, thisArg) {
        return this._values.map(callback, thisArg);
    }

    get values() {
        let instance = this;

        return {
            [Symbol.iterator]: function*() {
                instance.resetIndex();

                do {
                    yield instance.current;
                } while (instance.next());
            }
        }
    }
}
