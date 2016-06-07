/**
 * Created by Christoph on 03/06/2016.
 */
import {Stack} from "./stack";
import {number} from "../utility/number_utility";

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

    /**
     * Checks whether the given point lays on this line
     * @param {Point} point
     * @param {number} tolerance
     * @return {boolean} Returns true if the given point lays on line
     */
    containsPoint(point, tolerance = 0) {
        let pStart = this._points.first;
        let pEnd = this._points.last;

        let areCollinear = (pEnd.x - pStart.x) * (point.y - pStart.y) - (point.x - pStart.x) * (pEnd.y - pStart.y);
        if (areCollinear > tolerance || areCollinear < -tolerance) {
            return false;
        }

        if (pStart.x - pEnd.x > tolerance || pEnd.x - pStart.x > tolerance) {
            return number(point.x).isInRange(pStart.x, pEnd.x, tolerance);
        }

        return number(point.y).isInRange(pStart.y, pEnd.y, tolerance);
    }

    toPolyline() {
        return this._points.map((point) => `${point.toPolylinePoint()}`).join(" ");
    }

}
