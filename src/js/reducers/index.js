import { combineReducers } from "redux"

import { reviewRequests, reviews } from "./reviews"
import groups from "./groups"
import users from "./users"
import login from "./login"

export default combineReducers( { reviewRequests, groups, reviews, users, login } );