import React from 'react';
import { connect } from'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {
  constructor(props) {
    super(props);
    
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
            <form onSubmit={this.onSignupSubmit}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email" 
                    type="email" 
                    className="form-control" 
                    ref={(inputElement) => {
                      this.newEmailSearch = inputElement
                    }}
                    required 
                  />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input 
                      name="password"
                      type="password" 
                      className="form-control" 
                      ref={(inputElement) => {
                        this.newPasswordSearch = inputElement
                      }}
                      required 
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary">{message}</button>
            </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a target="_self"
               href="/auth/google"
               className="btn btn-social btn-google">
            <i className="fa fa-google"></i>
            <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onSignupSubmit(event) {
    event.preventDefault();
    const enteredEmail = this.newEmailSearch.value;
    const enteredPassword = this.newPasswordSearch.value;
    const user = {email: enteredEmail, password: enteredPassword}
    const {asyncSignupCreator} = this.props;
    var newUser = asyncSignupCreator(user)();
    console.log("ONSIGNUPSUBMIT", newUser)
    if (!newUser) {
      alert("Congratulations, you've just created your account!")
      browserHistory.push("/")
    }
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' })
const mapDispatch = {asyncSignupCreator}

export default connect(mapState, mapDispatch)(Signup);

/* -----------------    ACTION-CREATOR     ------------------ */

const SIGNUP = "SIGNUP";

function signupCreator (user) {
  return {
    type: SIGNUP, 
    user
  }
}

const asyncSignupCreator = user => dispatch => {
  axios.post('/signup', user)
  .then(res => {
    console.log("We're inside the res now")
    dispatch(signupCreator(res.data))})
  .catch(err => console.error('That user already exists'))
}

/* -----------------    REDUCER     ------------------ */

export function signup (user = null, action) {
  switch (action.type) {
    case SIGNUP: return action.user;
    default: return user;
  }
}
