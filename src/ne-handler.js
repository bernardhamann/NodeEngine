var React = require('react');
var neHandler = {

    msg: function (self) {
        return self.props.data.message && React.createElement(
            'div',
            { className: 'state-message-div' },
            React.createElement(
                'p',
                { className: 'state-message-p' },
                self.props.data.message
            )
        )
    }

};


module.exports = neHandler;