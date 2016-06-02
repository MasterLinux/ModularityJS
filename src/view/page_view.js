import React from "react";
import {NavigationBar} from "./navigation_bar.js";
import {Button} from "./button.js";
import {Workspace, Line, Coordinate} from "./workspace";

export var PageView = React.createClass({

    render: function () {
        return (
            <div className="page">
                <NavigationBar title={this.props.title} backTitle="Back" canNavigateBack={true}>
                    <Button title="Bla" />
                </NavigationBar>
                {this.props.children}
                <Workspace>
                    <Line coordinates={[new Coordinate(0, 0), new Coordinate(25, 25), new Coordinate(100, 75)]} />
                </Workspace>
            </div>
        );
    }

});



