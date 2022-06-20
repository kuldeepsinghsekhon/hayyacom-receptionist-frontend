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
import EditMobileEvent from './components/EditMobileEvent';
import InviterSearch from './components/InviterSearch';
import AddWhatsAppEvent from './components/AddWhatsAppEvent';
import { Helmet } from 'react-helmet';
import AddPartyHall from './components/AddPartyHall';
import GuestlistPage from './components/GuestlistPage';
function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={ReceptionistPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/hayyacom/addevent/:id?' component={AddMobileEvent} />
        <Route exact path='/hayyacom/editevent/:id' component={EditMobileEvent} />
        <Route exact path='/hayyacom/addinviter_preview/:eventid' component={AddInviterPreview} />
        <Route exact path='/hayyacom/save_inviter_preview/:id' component={AddSaveInviter} />
        <Route exact path='/hayyacom/inviter_search' component={InviterSearch} />
        <Route exact path='/hayyacom/addpartyhall' component={AddPartyHall} />
        <Route exact path='/hayyacom/editinviter/:eventid/:mobile' component={AddEditInviter} />
        <Route exact path='/hayyacom/add_wa_event' component={AddWhatsAppEvent} />
        <Route exact path='/hayyacom/events' component={HayyacomEventPage} />
        <Route exact path='/whatsapp/events' component={WhatsappEventPage} />
        <Route exact path='/hayyacom/event/:id' component={EditHayyacomEventPage} />
        <Route exact path='/guestlist/:invitermobile' component={GuestlistPage} />
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
