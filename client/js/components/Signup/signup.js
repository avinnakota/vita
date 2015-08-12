var actions = require('../../actions/actions');
var Constants = require('../../Constants/constants.js');

var Signup = React.createClass({
  
  handleSubmit: function(event) {
    console.log('in handleSubmit, signup.js');
 
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var pass = this.refs.pass.getDOMNode().value.trim();
    var promise = new Promise(function (resolve, reject) {
        actions.signUp({username: username, password: pass}),function (err, res) {
        if (err) reject(err);
        else resolve(res);
      };
    });
    promise.then(function(resp) {
      console.log('in promise then, signup.js');
      actions.switchPage('WELCOME');
    });
  },

  render: function() {

    return (

      <div id = 'form'>

        <form onSubmit ={this.handleSubmit}><h1>Create your account</h1>
          <div class ='input'><input placeholder='email' type ='text' ref ='email' /></div>
          <div class ='input'><input placeholder='username' type = 'text' ref ='username' /></div>
          <div class ='input'><input type = 'password' placeholder= 'password' ref = "pass" /></div>
          <div class ='input'><input type = 'password' placeholder= 'Re-enter password' ref = "pass" /></div>
          <input type ="submit" />
        </form>
      </div>
    );
  }
});

module.exports = Signup;