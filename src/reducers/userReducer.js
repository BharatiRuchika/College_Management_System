
import { REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST, CLEAR_ERRORS, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAIL,EDIT_USER_RESET,DELETE_USER_RESET } from "../constants/userConstants"
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS, } from '../constants/userConstants'
import { GET_ALL_USERS_FAIL, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_REQUEST } from "../constants/userConstants"
import { DELETE_USER_SUCCESS, DELETE_USER_FAIL } from "../constants/userConstants"

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
            return { ...state, loading: true, isAuthenticated: false }
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            console.log("im in login user success");
            console.log("token", action.payload.token)
            return { ...state, loading: false, user: action.payload.user, isAuthenticated: true, token: action.payload.token }
        case EDIT_USER_REQUEST:
            return { ...state, loading: true }
        case EDIT_USER_SUCCESS:
            console.log("im in edit user success")
            return { ...state, user: { ...state.user, firstName: action.payload.firstName, lastName: action.payload.lastName, dateOfBirth: action.payload.dateOfBirth, lastQualification: action.payload.lastQualification }, isUpdated: true }

        case EDIT_USER_FAIL:
            return { ...state, error: action.payload.error }
        case REGISTER_USER_FAIL:
        case LOGIN_USER_FAIL:
            // payload: error.response.data.errMessage
            console.log("im in register user fail");
            console.log("payload", action.payload);
            return { ...state, loading: false, error: action.payload, isAuthenticated: false, user: null }
        case LOGOUT_SUCCESS: {
            console.log("im in logoutsuccess")
            return { ...state, loading: false, isAuthenticated: false, user: null, token: null }
        }
        case DELETE_USER_FAIL:
            return { ...state, error: action.payload.error }
        case DELETE_USER_SUCCESS:
            return { ...state, isDeleted: true }
        case DELETE_USER_RESET:
            return { ...state, isDeleted: false }
        case LOGOUT_FAIL: {
            return { ...state, error: action.payload }
        }
        case EDIT_USER_RESET:
            return {
                ...state,
                isUpdated:false
            }
        case CLEAR_ERRORS: {
            return { ...state, error: null }
        }
        default:
            return state;
    }
}


export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return { ...state, loading: false }
        case GET_ALL_USERS_SUCCESS:
            console.log("im in GET_ALL_USERS_SUCCESS")
            return { ...state, users: action.payload.users, loading: true }
        case GET_ALL_USERS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;

    }
}