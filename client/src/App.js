import React, {useState, useEffect} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import UploadImage from './components/UploadImage';
import Account from './components/Account';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import ListImages from './components/ListImages';
import SearchImages from './components/SearchImages';
import HottestImages from './components/HottestImages';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import FooterPage from './components/FooterPage';


function App() {
  let userName="tejashree"

  return (
    <AuthProvider>
      <Router>
        
            <Navigation />
            
            <Switch>
            <Route exact path="/">
            <ListImages imageType={"All"}/>
            </Route>
            <Route path="/home">
            <ListImages imageType={"Home"}/>
            </Route>
            <Route path="/office">
            <ListImages imageType={"Office"}/>
            </Route>
            <Route path="/outdoor">
            <ListImages imageType={"Outdoor"}/>
            </Route>
            <Route path="/abstract">
            <ListImages imageType={"Abstract"}/>
            </Route>
            <Route path="/other">
            <ListImages imageType={"Other"}/>
            </Route>
            <Route path="/uploads">
            <ListImages imageType={"User-Uploaded"}/>
            </Route>
            <Route path="/search/:category/:keyword">
            <SearchImages/>
            </Route>
            <Route path="/hottest">
            <HottestImages/>
            </Route>
            
            
            <PrivateRoute exact path='/uploadimage' component={UploadImage} />
            <PrivateRoute path="/account" component={Account} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            </Switch>
            <Redirect to="/"/>
          
        
      </Router>
    </AuthProvider>
  );
}

export default App;
