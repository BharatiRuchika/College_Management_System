import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from '../../actions/userActions'

const Register = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { isAuthenticated, error: registerError, loading } = useSelector(state => state.user)
    if (isAuthenticated) {
        alert.success("User Registered Successfully")
        history.push('/');
    }
    useEffect(() => {
        if (registerError) {
            alert.error(registerError);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, registerError, isAuthenticated, history])
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        dateOfBirth: "",
        gender: "",
        lastQualification: "",
    })
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",
        dateOfBirth: "",
        gender: "",
        lastQualification: ""
    })

    const handleChange = (e) => {
        console.log("im here");
        console.log("name", e.target.name)
        console.log("name", e.target.value)
        switch (e.target.name) {
            case 'firstName': {
                if (e.target.value == '') {
                    setError({ ...error, firstName: "first name name cant be empty" })
                } else {
                    setError({ ...error, firstName: "" })
                }
                break;
            }
            case 'lastName': {
                if (e.target.value == '') {
                    setError({ ...error, lastName: "last name cant be empty" })
                } else {
                    setError({ ...error, lastName: "" })
                }
                break;
            }
            case 'phoneNo': {
                if (e.target.value == '') {
                    setError({ ...error, phoneNo: "phone number cant be empty" })
                } else {
                    setError({ ...error, phoneNo: "" })
                }
                break;
            }
            case 'gender': {
                if (e.target.value == '') {
                    setError({ ...error, gender: "gender cant be empty" })
                } else {
                    setError({ ...error, gender: "" })
                }
                break;
            }
            case 'dateOfBirth': {
                if (e.target.value == '') {
                    setError({ ...error, dateOfBirth: "date of birth cant be empty" })
                } else {
                    setError({ ...error, dateOfBirth: "" })
                }
            }
            case 'lastQualification': {
                if (e.target.value == '') {
                    setError({ ...error, lastQualification: "Last Qualificationcant be empty" })
                } else {
                    setError({ ...error, lastQualification: "" })
                }
                break;
            }
        }
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            console.log("image", e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                if (reader.readyState == 2) {
                    console.log("result", reader.result);
                    setAvatarPreview(reader.result);
                }
            }
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log("user", user);
        const { firstName, lastName, phoneNo, gender, dateOfBirth, lastQualification } = user;
        console.log("avatarPreview", avatarPreview)
        formData.set('firstName', firstName);
        formData.set('lastName', lastName);
        formData.set('phoneNo', phoneNo);
        formData.set('gender', gender);
        formData.set('dateOfBirth', dateOfBirth);
        formData.set('lastQualification', lastQualification);
        formData.set('avatar', avatarPreview);
        dispatch(register(formData))
    }
    return (<>

        <div className="row wrapper">
            <div className="col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                    <h1>Register</h1>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" value={user.firstName} id="firstName" name="firstName" onChange={handleChange} />
                    </div>
                    <span style={{ color: 'red' }}>{error.firstName}</span>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" value={user.lastName} id="lastName" name="lastName" onChange={handleChange} />
                    </div>
                    <span style={{ color: 'red' }}>{error.lastName}</span>

                    <div className="form-group">
                        <label htmlFor="password_field">Mobile Number</label>
                        <input type="tel" className="form-control" id="phoneNo" value={user.phoneNo} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="333-444-5555" name="phoneNo" onChange={handleChange} />
                    </div>
                    <span style={{ color: 'red' }}>{error.phoneNo}</span>

                    {/* <div className="form-group">
                        <label htmlFor="gender_field">Gender</label>
                        <select className="form-control" id="gender" name="gender" value={user.gender} onChange={(e)=>setUser({...user,gender:e.target.value})}>
                             <option key={'Female'} value={'Female'}>Female</option>
                             <option key={'Male'} value={'Male'}>Male</option>
                             <option key={'Other'} value={'Other'}>Other</option>
                        </select>
                    </div> */}


                    <div className="form-group">
                        <label htmlFor="gender_field">Gender</label>
                        <select className="form-control" id="gender" name="gender" value={user.gender} onChange={handleChange}>
                            <option key={'Female'} value={'Female'}>Female</option>
                            <option key={'Male'} value={'Male'}>Male</option>
                            <option key={'Other'} value={'Other'}>Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_field">Date Of Birth</label>
                        <input type="date" className="form-control" id="dateOfBirth" value={user.dateOfBirth} name="dateOfBirth" onChange={handleChange} />
                    </div>
                    <span style={{ color: 'red' }}>{error.dateOfBirth}</span>

                    <div className="form-group">
                        <label htmlFor="password_field">Last Qualification</label>
                        <input type="text" className="form-control" id="lastQualification" value={user.lastQualification} name="lastQualification" onChange={handleChange} />
                    </div>
                    <span style={{ color: 'red' }}>{error.lastQualification}</span>


                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar avatar-pic mr-3 item-rtl'>
                                    <img
                                        src={avatarPreview}
                                        className='rounded-circle'
                                        alt='Avatar Preview'
                                    />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    className='custom-file-input'
                                    id='customFile'
                                    accept="images/*"
                                    onChange={handleChange}
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={(error.firstName == '' && error.lastName == '' && error.phoneNo == '' && error.dateOfBirth == '' && error.gender == '' && error.lastQualification == '') ? false : true}
                    >
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    </>)
}
export default Register;