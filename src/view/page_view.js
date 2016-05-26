import React from "react";
import {NavigationBar} from "./navigation_bar.js";
import {Button} from "./button.js";

export var PageView = React.createClass({

    render: function () {
        return (
            <div className="page">
                <NavigationBar title={this.props.title} backTitle="Back" canNavigateBack={true}>
                    <Button />
                </NavigationBar>
                {this.props.children}
            </div>
        );
    }

});



