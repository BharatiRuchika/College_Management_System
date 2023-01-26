import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editProfile } from "../actions/userActions";
import { useAlert } from "react-alert";
import { EDIT_USER_RESET } from "../constants/userConstants";
const Home = () => {
    const alert = useAlert();
    const { isAuthenticated, user, token, isUpdated } = useSelector(state => state.user);
    const [new_user, setUser] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNo: user.phoneNo,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        lastQualification: user.lastQualification,
        registrationDate: user.registrationDate,
        avatar: {
            url: user.avatar.url
        }
    })
    const dispatch = useDispatch();
    useEffect(() => {
        
        if (isUpdated) {
            alert.success("User Edited Successfully");
            dispatch({type:EDIT_USER_RESET})
        }

    }, [isUpdated, dispatch.history, isAuthenticated])
    //    if(isUpdated){
    //     alert.success("User Edited Successfully");
    //    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("im in submit handler")
        console.log("ne_user", new_user);
        const { firstName, lastName, dateOfBirth, lastQualification } = new_user;
        const formData = new FormData();
        formData.set('firstName', firstName);
        formData.set('lastName', lastName);
        formData.set('dateOfBirth', dateOfBirth);
        formData.set('lastQualification', lastQualification);
        dispatch(editProfile(formData, token))
    }
    const handleChange = (e) => {
        console.log("im here")
        console.log("name", e.target.name);
        console.log("value", e.target.value)
        setUser({ ...new_user, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        console.log("im here")
        console.log("isAuthenticated", isAuthenticated)
        if (isAuthenticated) {
            //   dispatch(viewUser());
            console.log("user", user);
        }
    }, [])
    return (<>

        <div className="container">
            <div className="row">
                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 leftProfile">
                    {/* <img src="/images/default_avatar.jpg"/> */}
                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar avatar-pic mr-3 item-rtl'>
                                    <img
                                        src={new_user.avatar.url}
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
                                //   onChange={handleChange}
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>

                    <div />

                    <div>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label for="formGroupExampleInput">First Name</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" value={new_user.firstName} onChange={handleChange} name="firstName" />
                            </div>

                            <div className="form-group">
                                <label for="formGroupExampleInput">Last Name</label>
                                <input type="text" className="form-control" id="formGroupExampleInput" value={new_user.lastName} onChange={handleChange} name="lastName" />
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Gender</label>
                                <input type="text" className="form-control" id="formGroupExampleInput2" value={new_user.gender} readOnly />
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Phone Number</label>
                                <input type="text" className="form-control" id="formGroupExampleInput2" value={new_user.phoneNo} name="phoneNo" readonly />
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Date Of Birth</label>
                                
                                <input type="date" className="form-control" id="formGroupExampleInput2" value={new_user.dateOfBirth} onChange={handleChange} name="dateOfBirth" />
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Last Qualification</label>
                                <input type="text" className="form-control" id="formGroupExampleInput2" value={new_user.lastQualification} onChange={handleChange} name="lastQualification" />
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Registration Date</label>
                                <input type="text" className="form-control" id="formGroupExampleInput2" value={new Date(new_user.registrationDate).toLocaleDateString()} readonly />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg">Save Profile</button>

                        </form>
                    </div>

                </div>


                {/* <div className="offset-md-2 offset-sm-2 offset-lg-2 offset-xl-2 col-sm-4 col-md-4 col-lg-4 col-xl-4">
        <button type="submit" className="btn btn-primary btn-lg save_btn">Save Profile</button>
        </div> */}
            </div>
        </div>


    </>)
}
export default Home;