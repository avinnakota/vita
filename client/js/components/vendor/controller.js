var actions = require('../../actions/vendorActions');
var Constants = require('../../constants/Constants.js');
var PersonalInfo = require('./personalInfo');
var BankInfo = require('./bankInfo');
var Welcome = require('./welcome');
var Login = require('../login');

var Signup = React.createClass({

  getInitialState: function() {
    return {pane: 'personal'};
  },

  show: function(pane, data){
    console.log
    this.setState({
      pane: pane,
      balance: data.balance
    });
  },

  // Render different form pane
  changePane: function(pane, data) {
    var vendorAccount = data;
    this.setState({
      pane: pane,
      business: vendorAccount.business_name,
      type: vendorAccount.type, 
    });
    console.log(this.state.type, "is the type");
  },

  handleClick: function() {
    // TODO set login anchor class to 'hidden', or something
    this.setState({
      pane: 'login'
    });
  },

  // Save data from personal form to state, bundle with bank form, POST to server
  handleSubmit: function(event) {
    event.preventDefault();
    if (this.state.pane === 'login') {
      loginResponseHandler.bind(this)();
    } else if (this.state.pane === 'personal'){
        personalResponseHandler.bind(this)();
    } else if (this.state.pane === 'bank') {
        var bankAccount = this.refs.partial.getFields();
        Stripe.bankAccount.createToken({
          country: 'US',
          currency: 'USD',
          routing_number: bankAccount.routing,
          account_number: bankAccount.account
        }, bankResponseHandler.bind(this));
    }

    function loginResponseHandler() {
      var loginData = this.refs.partial.getFields();
      // actions.logIn(loginData, (function(pane, business) {
      //   this.changePane.call(this, pane, business);
      // }).bind(this));
      actions.logIn(loginData, this.changePane);
    }

    // Save personal info to state for later bundling with bank info
    function personalResponseHandler() {
      var accountData = this.refs.partial.getFields();

      // Render bank collection form
      this.setState({
        pane: 'bank',
        accountData: accountData
      });
    }

    // Bundle bank info with personal info and POST to server
    function bankResponseHandler(status, response) {
      if (response.error) {
        // TODO let the user know somehow
        // response.error.message might be useful
        console.log('error in bankResponseHandler! | ' + response.error.message);
      } else {
        // response contains id and bank_account, which contains additional bank account details
        this.state.accountData.token = response.id;
        actions.signUp(this.state.accountData, this.changePane);
      }
    }

  },

render: function() {
    var partial;
    if (this.state.pane === 'login') {
      partial = <Login ref='partial' />;
    } else if (this.state.pane === 'bank') {
      partial = <BankInfo ref='partial' />;
    } else if (this.state.pane === 'welcome') {
      partial = <Welcome business = {this.state.business} type = {this.state.type} balance = {this.props.appState.balance} ref='partial' />;
    } else {
      // default to signup page
      partial = <PersonalInfo ref='partial' />;
    }

    return (
      <div ref = 'form'>
        <form onSubmit ={this.handleSubmit}>
          {partial}
        </form>
        <a onClick={this.handleClick}>Already have an account? Log in here.</a>
      </div>
    );
  }
});

module.exports = Signup;
