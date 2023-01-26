import Home from './Home'
import { useSelector } from 'react-redux';
const Landing = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    return (<>
        {!isAuthenticated ? <div className="home">
        </div> :
            <Home />
        }
    </>)
}
export default Landing;