var actions = require('../../actions/actions');
var Constants = require('../../Constants/Constants.js');
var PersonalInfo = require('./personalInfo');
var BankInfo = require('./bankInfo');

var Signup = React.createClass({

  getInitialState: function() {
    return {pane: 'personal'};
  },

  handleSubmit: function(event) {

    event.preventDefault();
    if (this.state.pane === 'personal'){
      personalResponseHandler();
    } else {
      Stripe.bankAccount.createToken({
        country: 'US',
        currency: 'USD',
        routing_number: this.refs.routing.getDOMNode().value.trim(),
        account_number: this.refs.account.getDOMNode().value.trim()
      }, bankResponseHandler).bind(this);
    }

    var personalResponseHandler = function() {
      var accountData = {};
      for (var field in this.refs) {
        accountData[field] = field.getDOMNode().value.trim();
      }

      // save accountData to state and render bank collection form
      this.setState({
        pane: 'bank',
        accountData: accountData
      });
    };

    var bankResponseHandler = function(status, response) {

      if (response.error) {
        // TODO let the user know somehow
        // response.error.message might be useful
      } else {
        // response contains id and bank_account, which contains additional bank account details
        this.state.accountData.token = response.id;
        // TODO post accountData to server
      }
    };

  },

  render: function() {
    var partial;
    if (this.state.pane === 'personal') {
      partial = <PersonalInfo />;
    }
    else if (this.state.pane === 'bank'){
      partial = <BankInfo />;
    }

    return (
      <div ref = 'form'>
        <form onSubmit ={this.handleSubmit}>
          {partial}
        </form>
      </div>
    );
  }
});

module.exports = Signup;
