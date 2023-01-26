import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { DELETE_USER_RESET } from "../../constants/userConstants";
const Admin = ({ history }) => {
    const { isAuthenticated, token, loading, isDeleted,error } = useSelector(state => state.user)
    const { users } = useSelector(state => state.allUsers)
    const dispatch = useDispatch();
    const alert = useAlert();
    const [new_users, setUsers] = useState(users)
    if (!isAuthenticated) {
        history.push('/');
    }
    if (isDeleted) {
        alert.success('User Deleted Successfully');
        dispatch({type:DELETE_USER_RESET});
        // history.push("/admin")
        // dispatch(getAllUsers(token  ))
    }
    useEffect(() => {
        console.log("im in get all users");
        dispatch(getAllUsers(token));
    }, [error,alert,dispatch,history,isDeleted])
    const removeUser = (id) => {
        console.log("im in delete user");

        dispatch(deleteUser(token, id))
        const updated_users = new_users.map((user) => {
            return user.id !== id
        })
        setUsers(updated_users)
    }
    return (<>
        <h1 style={{ textAlign: 'center' }}>All Users</h1>
        <div className="conatiner">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Date Of Birth</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Last Qualification</th>
                        <th scope="col">Registartion Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (<>
                            {user.role == 'user' && <tr>
                                <td></td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                                <td>{user.phoneNo}</td>
                                <td>{user.gender}</td>
                                <td>{user.lastQualification}</td>
                                <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                                <td><i onClick={() => removeUser(user._id)} style={{ color: "red" }} className="fa fa-remove"></i></td>
                            </tr>}

                        </>)
                    })}
                </tbody>
            </table>
        </div>

    </>)
}
export default Admin;