import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Home from './components/Home';
import Images from './components/Images';
import Account from './components/Account';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
          <br />
          <br />

          {/* <Link className='Home' to='/'>
              <Button name='Home' > 
                  Home
              </Button>
            </Link>
            <Link className='Images' to='/images'>
              <Button name='Images' > 
                Images
              </Button>
            </Link> */}

          <div className='App-body'>
            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/images' component={Images} />
            <PrivateRoute path="/account" component={Account} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
