import React from "react";

export var NavigationBar = React.createClass({

    render: function () {
        return (
            <div className="row navigation-bar">
                <div className="column size-small-2 navigation-items left">
                    {this.props.canNavigateBack ? <NavigationBar.Button type="back" title={this.props.backTitle} /> : <NavigationBar.Button type="menu" />}
                </div>
                <div className="column size-small-8 title">{this.props.title}</div>
                <div className="column size-small-2 navigation-items right">
                    {this.props.children}
                </div>
            </div>
        );
    }

});

NavigationBar.Button = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        type: React.PropTypes.string
    },

    render: function () {
        let hasIcon = !!this.props.type;
        let hasTitle = !!this.props.title || !hasIcon;
        let title = this.props.title || "Button";

        return (
            <div className="button">
                { hasIcon ? <div className={`icon ${this.props.type}`}></div> : null }
                { hasTitle ? <div className="title">{title}</div> : null }
            </div>
        );
    }
    
});
