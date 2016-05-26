import React from 'react';

export var Button = React.createClass({

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
                { hasIcon ? <div className={"icon " + this.props.type} /> : null }
                { hasTitle ? <div className="title">{title}</div> : null }
            </div>
        );
    }

});
