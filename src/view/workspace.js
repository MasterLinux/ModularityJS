/**
 * Created by Christoph on 01/06/2016.
 */

import React from "react";

export class Coordinate {

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

}

export var Workspace = React.createClass({

    propTypes: {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        children: React.PropTypes.oneOfType([
            React.PropTypes.instanceOf(Line)
        ])
    },

    getDefaultProps: function() {
        return {
            width: 100,
            height: 100
        };
    },

    render: function () {
        return (
            <svg className="workspace" height={`${this.props.height}px`} width={`${this.props.width}px`}>
                {this.props.children}
            </svg>
        );
    }

});

export var Line = React.createClass({

    propTypes: {
        coordinates: React.PropTypes.arrayOf(Coordinate)
    },

    onClick: function (event) {
        let coordinates = this.props.coordinates;
        coordinates.push(new Coordinate(event.clientX, event.clientY));

        this.setState({
            coordinates: coordinates
        });
    },

    render: function () {
        let points = this.props.coordinates.map((coordinate) => {
              return `${coordinate.x},${coordinate.y}`;
        }).join(" ");

        return <polyline className="line" points={points} onClick={this.onClick} />;
    }

});
