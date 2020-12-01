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
//import Images from './ImageList';
import 'bootstrap/dist/css/bootstrap.min.css'; 


function App() {

  const [appState, setAppState] = useState()

  useEffect(() =>{
    fetch('/api/images', {
      accept: 'application/json',
    }).then(res => res.json())
      .then(pic => {
        setAppState(pic)
        console.log('APP.JS - ')
        console.log(pic)
      })
      .catch(err => console.log(err));
  }, [])


  let officeImages=[];
  let homeImages=[];
  let outdoorImages=[];
  appState.map((re) => {
    if(re.CATEGORY == 'office'){
      officeImages.push(re)
    }
    if(re.CATEGORY == 'home'){
      homeImages.push(re)
    }
    if(re.CATEGORY == 'outdoor'){
      outdoorImages.push(re)
    }
  })
  // appState.map(re=>{
    
  //   if(re.CATEGORY==="office")
  //   {
  //      officeImages.push(re)
  //   }
  //   else if(re.CATEGORY==="home")
  //   {
  //     homeImages.push(re)
  //   }
  //   else if(re.CATEGORY==="outdoor")
  //   {
  //     outdoorImages.push(re)
  //   }
    
  // })
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
          <br />
          <br />
          <div className='App-body'>
            <Switch>
            <Route exact path="/">
            <ListImages images={appState}/>
            </Route>
            <Route path="/home">
            <ListImages images={homeImages}/>
            </Route>
            <Route path="/office">
            <ListImages images={officeImages}/>
            </Route>
            <Route path="/outdoor">
            <ListImages images={outdoorImages}/>
            </Route>
            <PrivateRoute exact path='/uploadimage' component={UploadImage} />
            <PrivateRoute path="/account" component={Account} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            </Switch>
            <Redirect to="/"/>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
