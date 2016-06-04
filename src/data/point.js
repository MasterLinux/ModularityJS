/**
 * Created by Christoph on 03/06/2016.
 */
import {Stack} from "./stack";

export function number(number) {
    return {
        between: function (x1, x2, tolerance = 0) {
            return number + tolerance > Math.min(x1, x2) &&
                number - tolerance < Math.max(x1, x2);
        }    
    };
}

export class Point {

    /**
     * Initializes the coordinate
     * @param x {number} Position on x-axis
     * @param y {number} Position on y-axis
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    /**
     * Gets the position on x-axis
     * @returns {number}
     */
    get x() {
        return this._x;
    }

    /**
     * Gets the position on y-axis
     * @returns {number}
     */
    get y() {
        return this._y;
    }

    /**
     * Represents the coordinate as svg polyline point
     * @returns {string} The coordinate as polyline point
     */
    toPolylinePoint() {
        return `${this.x},${this.y}`;
    }

}

export class Line {

    /**
     * Initializes the line
     * @param points {...Point} A list of points
     */
    constructor(...points) {
        this._points = new Stack(points);
    }

    contains(point, tolerance = 0) {
        let pStart = this._points.first;
        let pEnd = this._points.last;

        let areCollinear = (pEnd.x - pStart.x) * (point.y - pStart.y) - (point.x - pStart.x) * (pEnd.y - pStart.y);
        return areCollinear == 0 || number(areCollinear).between(0, 0, tolerance);
    }

    toPolyline() {
        return this._points.map((point) => `${point.toPolylinePoint()}`).join(" ");
    }

}
