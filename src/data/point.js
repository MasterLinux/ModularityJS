/**
 * Created by Christoph on 03/06/2016.
 */
import {Stack} from "./stack";

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

    contains(point) {
        let pStart = this._points.first;
        let pEnd = this._points.last;

        let res = (pEnd.x - pStart.x) * (point.y - pStart.y) - (point.x - pStart.x) * (pEnd.y - pStart.y);
        return res == 0;
    }

    toPolyline() {
        return this._points.map((point) => `${point.toPolylinePoint()}`).join(" ");
    }

}
