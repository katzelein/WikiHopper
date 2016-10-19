import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOGIN = "LOGIN";

/* ------------   ACTION CREATORS     ------------------ */

const loginCreator = user => ({type: LOGIN, user})

/* ------------       REDUCER     ------------------ */

export default function login (user = null, action) {
  switch (action.type) {

    case LOGIN: 
      return action.user
    
    default: 
      return user;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const asyncLoginCreator = user => dispatch => {
  axios.post('/login', user)
    .then(res => dispatch(loginCreator(res.data)))
    .catch(err => console.error('That username and password doesn\'t exist in our database'))      
} 