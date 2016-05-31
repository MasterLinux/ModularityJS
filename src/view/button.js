import React from 'react';

export var Button = React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function () {
        return <button>{this.props.title}</button>;
    }

});
