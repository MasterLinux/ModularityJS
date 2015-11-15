import React from "react";
import {NavigationBar} from "./navigation_bar.js";

export var PageView = React.createClass({

    render: function () {
        return (
            <div className="page">
                <NavigationBar title={this.props.title} backTitle="Back" canNavigateBack={true}>
                    <NavigationBar.ActionButton title="test" />
                </NavigationBar>
                {this.props.children}
            </div>
        );
    }

});



