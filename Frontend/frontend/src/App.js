import React from 'react';
import './App.css';
import ListImages from './components/ListImages';
import Images from './ImageList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink, Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  let officeImages=[];
  let homeImages=[];
  let outdoorImages=[];
  Images.map(re=>{
    
    if(re.CATEGORY==="office")
    {
       officeImages.push(re)
    }
    else if(re.CATEGORY==="home")
    {
      homeImages.push(re)
    }
    else if(re.CATEGORY==="outdoor")
    {
      outdoorImages.push(re)
    }
    
  })
  
  return (
    <Router>
    <nav>
    <ul>
    <li>
    <NavLink to="/all" activeClassName="active" style={{ textDecoration: 'none', color:'white' }}>ALL Backgrounds</NavLink>
    </li>
    <li>
    <NavLink to="/home" activeClassName="active" style={{ textDecoration: 'none', color:'white'  }}>Home Backgrounds</NavLink>
    </li>
    <li>
    <NavLink to="/office" activeClassName="active" style={{ textDecoration: 'none', color:'white'  }}>Office Backgrounds</NavLink>
    </li>
    <li>
    <NavLink to="/outdoor" activeClassName="active" style={{ textDecoration: 'none', color:'white'}}>Outdoor Backgrounds</NavLink>
    </li>
    <li>
    <NavLink to="/loginsignup" activeClassName="active" style={{ textDecoration: 'none', color:'white'  }}>Login/Signup</NavLink>
    </li>
    </ul>
    </nav>

    <Switch>
    <Route path="/all">
    <ListImages images={Images}/>
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
    <Route path="/loginsignup">
    <p>Login/signup</p>
    </Route>
    </Switch>
    <Redirect to="/all"/>
    </Router>
    
  );
}

export default App;
