import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/layouts/header'
import Home from './components/Home';
import Login from './components/user/login';
import Register from './components/user/register';
import Landing from './components/Landing';
import Admin from './components/Admin/admin';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/" component={Landing} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/admin" component={Admin} exact />
      </BrowserRouter>
    </div>
  );
}
export default App;
