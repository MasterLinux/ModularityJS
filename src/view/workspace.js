/**
 * Created by Christoph on 01/06/2016.
 */

import React from "react";
import {Point} from "../data/point";

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
        coordinates: React.PropTypes.arrayOf(Point)
    },

    onClick: function (event) {
        let coordinates = this.props.coordinates;
        coordinates.push(new Point(event.clientX, event.clientY));

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
