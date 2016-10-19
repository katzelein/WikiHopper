import React from 'react';
import { connect } from'react-redux';
import { browserHistory } from 'react-router';
import {store} from '../store';
// import axios from 'axios';

import { asyncLoginCreator } from '../../redux/login';


/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {

  constructor(props) {
    super(props);
    
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
      {/* Does this need to be called? */}
            <form onSubmit={this.onLoginSubmit}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email" 
                    type="email" 
                    className="form-control" 
                    ref={(inputElement) => {
                      this.emailSearch = inputElement
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
                        this.passwordSearch = inputElement
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

  onLoginSubmit(event) {

     // must call asyncactioncreator

    event.preventDefault();
    const enteredEmail = this.emailSearch.value;
    const enteredPassword = this.passwordSearch.value;
    const user = {email: enteredEmail, password: enteredPassword}
    const {asyncLoginCreator} = this.props;
    var userFromDB = asyncLoginCreator(user);
    if(!userFromDB) {
      alert("You need to sign up");
    }else{
      alert("You're logged in!")
      browserHistory.push("/");
    }
      
  }
}

/* -----------------    CONTAINER     ------------------ */


const mapState = () => ({ message: 'Log in' })
const mapDispatch = {asyncLoginCreator};

export default connect(mapState, mapDispatch)(Login);

/* -----------------    ACTION-CREATOR     ------------------ */

const LOGIN = "LOGIN";

function loginCreator (user) {
  return {
    type: LOGIN, 
    user
  }
}

  
const asyncLoginCreator = user => dispatch => {
  axios.post('/login', user)
  .then(res => dispatch(loginCreator(res.data)))
  .catch(err => console.error('That username and password doesn\'t exist in our database'))      
}   


/* -----------------    REDUCER     ------------------ */

export function login (user = null, action) {
  switch (action.type) {
    case LOGIN: return action.user;
    default: return user;
  }
}


