import { combineReducers } from 'redux';
import users from './users';
import stories from './stories';
import {login} from '../components/Login';
import {signup} from '../components/Signup';

export default combineReducers({ users, stories, login, signup });