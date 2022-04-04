import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
//import Signup from "./components/Signup";
import Home from "./containers/Home";

import ReceptionistPage from './components/ReceptionistPage';
import HayyacomEventPage from './components/HayyacomEventPage';
import WhatsappEventPage from './components/WhatsappEventPage';
import EditHayyacomEventPage from './components/EditHayyacomEventPage';
import { Helmet } from 'react-helmet';
function App() {
  return (
    <div>
       <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={ReceptionistPage} />    
			<Route  path={`${process.env.PUBLIC_URL}/hayyacom/events`}component={HayyacomEventPage} />  
			<Route exact path={`${process.env.PUBLIC_URL}/whatsapp/events`} component={WhatsappEventPage} /> 				
			<Route exact path={`${process.env.PUBLIC_URL}/hayyacom/event/:id`} component={EditHayyacomEventPage} />  			
       </Switch>
    </div>
  );
}
const checkRoute = () => {
  let token = localStorage.getItem("token")
  if (token) {
    return <Home />
  } else {
    return <Login />
  }
}
export default App;
