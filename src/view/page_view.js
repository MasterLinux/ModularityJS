import React from "react";

export var PageView = React.createClass({

    render: function() {
        return (
            <div className="page">
                <NavigationBar title={this.props.title} />
                {this.props.children}
            </div>
        );
    }

});

export var NavigationBar = React.createClass({

    render: function() {
        return (
            <div className="navigation_bar">
                {this.props.title}
            </div>
        );
    }

});
