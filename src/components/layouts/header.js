import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import { useAlert } from "react-alert";
const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const handleLogin = () => {
        history.push('/login')
    }
    const logoutHandler = () => {
        dispatch(logoutUser());
        alert.success('User Logged out successfully')
    }
    const { isAuthenticated, user } = useSelector(state => state.user)
    return (<>
        <nav className="navbar bg-dark text-white row">
            <div className="col-2 col-sm-2 col-lg-2 col-md-2 col-xl-2">
                <div className="navbar-brand">
                    <Link to="/">
                        <img src="/images/shopit_logo.png" />
                    </Link>
                </div>
            </div>
            <div className="offset-md-2 offset-sm-2 offset-2 offset-lg-2 offset-xl-2 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <ul className="components list-unstyled">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">About Us</Link></li>
                    <li><Link to="/">Contact Us</Link></li>

                </ul>
            </div>
            <div className="offset-md-2 offset-sm-2 offset-2 offset-lg-2 offset-xl-2 col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                {!isAuthenticated ? <button onClick={() => history.push('/login')} id="login_btn">Login</button> : <>
                    <div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <figure className="avatar avatar-nav">
                                <img
                                    src={"/images/default_avatar.jpg"}
                                    alt={user && user.name}
                                    className="rounded-circle"
                                />
                            </figure>
                            <span>{user && user.name}</span>
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                            <Link to="/" className="dropdown-item">Dashboard</Link>
                            <Link to="/" className="dropdown-item">Profile</Link>
                            <Link className="dropdown-item text-danger" onClick={logoutHandler} to="/">
                                Logout
                            </Link>
                        </div>
                    </div>
                </>}
            </div>
        </nav>
    </>)
}
export default Header;