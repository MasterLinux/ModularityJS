import React from "react";

export var NavigationBar = React.createClass({

    render: function () {
        return (
            <div className="row navigation-bar">
                <div className="column size-small-2 navigation-items left">
                    {this.props.canNavigateBack ? <NavigationBar.BackButton title={this.props.backTitle} /> : <NavigationBar.MenuButton />}
                </div>
                <div className="column size-small-8 title">{this.props.title}</div>
                <div className="column size-small-2 navigation-items right">
                    {this.props.children}
                </div>
            </div>
        );
    }

});

NavigationBar.MenuButton = React.createClass({

    render: function () {
        return (
            <div className="button menu">
                <object className="icon" type="image/svg+xml" data="images/ic_menu.svg" />
            </div>
        );
    }

});

NavigationBar.BackButton = React.createClass({

    render: function () {
        return (
            <div className="button back">
                <object className="icon" type="image/svg+xml" data="images/ic_back.svg" />
                <div className="title">{this.props.title}</div>
            </div>
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
