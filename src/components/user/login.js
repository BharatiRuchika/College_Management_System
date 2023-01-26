import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { login, clearErrors } from "../../actions/userActions";
const Login = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user, isAuthenticated, loading, error: loginError } = useSelector(state => state.user)
    const [data, setData] = useState({
        phoneNo: '',
        dateOfBirth: ''
    });
    if (isAuthenticated) {
        
        if (user.role == 'admin') {
            alert.success("admin logged in successfully")
            history.push("/admin");
        } else {
            alert.success("user logged in successfully")
            history.push("/");
        }
    }
    useEffect(() => {
        if (loginError) {
            alert.error(loginError);
            dispatch(clearErrors())
        }
    }, [loginError, isAuthenticated, dispatch, history])
    const [errors, setErrors] = useState({
        phoneNo: '',
        dateOfBirth: ''
    })
    const submitHandler = (e) => {
        e.preventDefault();
        const { phoneNo, dateOfBirth } = data;
        const formData = new FormData();
        formData.append('phoneNo', phoneNo)
        formData.append('dateOfBirth', dateOfBirth);
        dispatch(login(formData));
    }
    const handleChange = (e) => {
        let { phoneNo, dateOfBirth } = errors;
        switch (e.target.name) {
            case 'phoneNo': {
                if (e.target.value.length == 0) {
                    setErrors({ ...errors, phoneNo: 'phone Number cant be empty' })
                } else {
                    setErrors({ ...errors, phoneNo: '' })
                }
                break;
            }
            case 'dateOfBirth': {
                if (e.target.value.length == 0) {
                    setErrors({ ...errors, dateOfBirth: 'date of birth cant be empty' })
                } else {
                    setErrors({ ...errors, dateOfBirth: '' })
                }
                break;
            }
            default:
                setErrors({ phoneNo: '', dateOfBirth: '' })
        }
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (<>

        <div className='row wrapper'>
            <div className="col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">Login</h1>
                    <div className="form-group">
                        <label htmlFor="phoneNo">Mobile Number</label>
                        <input type="tel" id="phoneNo" name="phoneNo" className="form-control" onChange={handleChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={data.phoneNo} />
                    </div>
                    <span style={{ color: 'red' }}>{errors.phoneNo}</span>
                    <div className="form-group">
                        <label htmlFor="password">Date Of Birth</label>
                        <input type="date" id="number-field" className="form-control" name="dateOfBirth" value={data.dateOfBirth} onChange={handleChange} />
                    </div>
                    <span style={{ color: 'red' }}>{errors.dateOfBirth}</span>

                    <button id="login_btn" className="btn btn-block py-3" disabled={(errors.phoneNo == '' && errors.dateOfBirth == '') ? false : true}>Login</button>
                    <Link style={{ color: 'grey' }} className="float-right mt-3" to="/register">New User?</Link>
                </form>
            </div>
        </div>
    </>)
}
export default Login;