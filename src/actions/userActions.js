// import { REGISTER_USER_SUCCESS } from "../constants/userConstants"
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,LOGOUT_SUCCESS,LOGOUT_FAIL, EDIT_USER_FAIL,EDIT_USER_REQUEST,EDIT_USER_SUCCESS,DELETE_USER_FAIL,DELETE_USER_SUCCESS,CLEAR_ERRORS } from "../constants/userConstants"
import { GET_ALL_USERS_FAIL,GET_ALL_USERS_SUCCESS,GET_ALL_USERS_REQUEST } from "../constants/userConstants";
import axios from "axios";
export const register = (formData) => async (dispatch) => {
    console.log("formData", formData);
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_BASEURL}users/register`, formData, config)
        console.log("data", data);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data })
    } catch (error) {
        console.log("error", error.response.data.errMessage)
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.errMessage })
    }
}

export const login = (formData) => async (dispatch) => {
    console.log("im in login");
    try {
        dispatch({ type: LOGIN_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_BASEURL}users/login`, formData, config)
        console.log("data", data);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data })
    } catch (error) {
        console.log("error", error);
        dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.errMessage })
    }
}



export const editProfile = (formData,token)=>async(dispatch)=>{
   try{
    console.log("token",token)
    dispatch({ type: EDIT_USER_REQUEST })
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token':`${token}`
        }
    }
    const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}users/edit`, formData, config)
    console.log("data", data);
    dispatch({ type: EDIT_USER_SUCCESS, payload: data })
   }catch(error){
    console.log("Errpr",error)
    dispatch({ type: EDIT_USER_FAIL, payload: error.response.data.errMessage })
   }
}

export const getAllUsers = (token) =>async(dispatch)=> {
    console.log("im in get all users")
    console.log("token",token);
    try{
        dispatch({ type: GET_ALL_USERS_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token':`${token}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}users/getAllUsers`, config)
        console.log("data", data);
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data })
        
    }catch(error){
        console.log("Error",error)
        dispatch({ type: GET_ALL_USERS_FAIL, payload: error.response.data.errMessage })
    }
}

export const deleteUser = (token,id) =>async(dispatch)=> {
    console.log("im in delete user");
    console.log("token",token);
    console.log("id",id);
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token':`${token}`
            }
        }
        const { data } = await axios.delete(`${process.env.REACT_APP_BASEURL}users/deleteUser/${id}`, config)
        console.log("data", data);
        dispatch({ type: DELETE_USER_SUCCESS, payload: data })
        
    }catch(error){
        console.log("Error",error)
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.errMessage })
    }
}

export const logoutUser = ()=>async(dispatch)=>{
   try{
dispatch({
    type:LOGOUT_SUCCESS
})
}catch(error){
    
    dispatch({
        type:LOGOUT_FAIL,
        payload:error.response.data.errMessage
    })
   }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}