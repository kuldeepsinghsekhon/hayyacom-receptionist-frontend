import React, { useState, useEffect } from 'react';
import AddEvent from "../components/AddEvent";
import ShowEvent from "../components/ShowEvent";
import {saveEvents, removeEvents} from "../actions/Event";
import {getEventsApi} from "../api/events";
import { connect } from 'react-redux';
import Invitations from '../components/Invitations'
import Stats from '../components/Stats'

const Dashboard = (props) => {

    useEffect(()=>{
        let userData = localStorage.getItem("loginUser")
        if(userData) {
            userData = JSON.parse(userData)
            getEventsApi(userData.id).then(res => {
                const {data} = res
                props.SaveEvents(data)
                localStorage.setItem("event", JSON.stringify(data[0]))
            }).catch(err => {
                console.log( err, "err")
            })
        }
    }, [])

    const getEventComponent = () => {
        if(props.events && props.events.length){
            return <div><h2>Events</h2><ShowEvent events={props.events}/></div>
        } else {
            return <AddEvent />
        }

    }

    return (
        <div>
            {getEventComponent()}
            <h2> Stats </h2>
            <Stats />
            <h2>Invitations</h2>
            <Invitations />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        events: state.EventReducer.events,
    };
}

const mapDispatchToProps = dispatch => ({
    SaveEvents : (data) => dispatch(saveEvents(data)),
})
export default connect( mapStateToProps, mapDispatchToProps)(Dashboard);