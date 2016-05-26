import React from "react";
import {Button} from "./button.js";

export var NavigationBar = React.createClass({

    render: function () {
        return (
            <div className="row navigation-bar">
                <div className="column size-small-2 navigation-items left">
                    {this.props.canNavigateBack ? <Button type="back" title={this.props.backTitle} /> : <Button type="menu" />}
                </div>
                <div className="column size-small-8 title">{this.props.title}</div>
                <div className="column size-small-2 navigation-items right">
                    {this.props.children}
                </div>
            </div>
        );
    }

});
