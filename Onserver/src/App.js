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
import AddInviterPreview from './components/AddInviterPreview';
import AddSaveInviter from './components/AddSaveInviter';
import AddEditInviter from './components/AddEditInviter';
import AddMobileEvent from './components/AddMobileEvent';
import InviterSearch from './components/InviterSearch';
import AddWhatsAppEvent from './components/AddWhatsAppEvent';
import EditMobileEvent from './components/EditMobileEvent';
import AddPartyHall from './components/AddPartyHall';
import { Helmet } from 'react-helmet';
function App() {
  return (
    <div>
       <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={ReceptionistPage} />    
			<Route  path={`${process.env.PUBLIC_URL}/hayyacom/events`}component={HayyacomEventPage} />  
			<Route exact path={`${process.env.PUBLIC_URL}/whatsapp/events`} component={WhatsappEventPage} /> 				
			<Route exact path={`${process.env.PUBLIC_URL}/hayyacom/event/:id`} component={EditHayyacomEventPage} />  
			<Route exact path={`${process.env.PUBLIC_URL}/hayyacom/addevent`} component={AddMobileEvent} /> 
			<Route exact path={`${process.env.PUBLIC_URL}/hayyacom/editevent/:id`} component={EditMobileEvent} />
			 <Route exact path={`${process.env.PUBLIC_URL}/hayyacom/addpartyhall`} component={AddPartyHall} />
			   <Route exact path={`${process.env.PUBLIC_URL}/hayyacom/inviter_search`} component={InviterSearch} />
        <Route exact path={`${process.env.PUBLIC_URL}/hayyacom/addinviter_preview/:eventid`} component={AddInviterPreview} />
        <Route exact path={`${process.env.PUBLIC_URL}/hayyacom/save_inviter_preview/:id`} component={AddSaveInviter} />
        <Route exact path={`${process.env.PUBLIC_URL}/hayyacom/editinviter/:eventid/:mobile`} component={AddEditInviter} />
          <Route exact path={`${process.env.PUBLIC_URL}/hayyacom/add_wa_event`} component={AddWhatsAppEvent} /> 			
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
