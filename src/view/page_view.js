import React from "react";

export var PageView = React.createClass({

    render: function() {
        return (
            <div className="page">
                {this.props.children}
            </div>
        );
    }

});
