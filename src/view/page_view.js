import React from "react";

export var PageView = React.createClass({

    render: function () {
        return (
            <div className="page">
                <NavigationBar title={this.props.title} previousTitle="Back">
                    <NavigationBar.ActionButton title="test" />
                </NavigationBar>
                {this.props.children}
            </div>
        );
    }

});

export var NavigationBar = React.createClass({

    render: function () {
        return (
            <div className="row navigation-bar">
                <div className="column size-small-2 navigation-items left">
                    <NavigationBar.BackButton title={this.props.previousTitle} />
                </div>
                <div className="column size-small-8 title">{this.props.title}</div>
                <div className="column size-small-2 navigation-items right">
                    {this.props.children}
                </div>
            </div>
        );
    }

});

NavigationBar.BackButton = React.createClass({

    render: function () {
        return (
            <div className="back-button">{this.props.title}</div>
        );
    }

});

NavigationBar.ActionButton = React.createClass({

    render: function () {
        return (
            <div className="action-button">{this.props.title}</div>
        );
    }

});

