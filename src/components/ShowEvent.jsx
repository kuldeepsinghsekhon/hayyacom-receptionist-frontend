import React, { useState, useEffect } from 'react';
import {saveEvents, removeEvents} from "../actions/Event"
import {getEventsApi} from "../api/events"
import { connect } from 'react-redux';
import { Modal, Table, Space } from 'antd';
import Loader from "./Loader"
import Alerts from "./Alert"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditEvent from './EditEvent';
const { confirm } = Modal;
const { Column } = Table;

const ContactList = (props) => {
    const [selectedEvent, setSelectedEvent] = useState({})
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
console.log("show event props",props)
    // useEffect(()=>{
    //     setLoading(true)
    //     let userData = localStorage.getItem("loginUser")
    //     if(userData) {
    //         userData = JSON.parse(userData)
    //         getEventsApi(userData.id).then(res => {
    //             const {data} = res
    //             props.SaveEvents(data)
    //             setLoading(false)
    //         }).catch(err => {
    //             console.log( err, "err")
    //             const {message} = err.response.data
    //             setMessageType('error')
    //             setMessage(message)
    //             setLoading(false)
    //         })
    //     }
    // }, [])

    // const deleteContacts = (id) => {
    //     deleteContactsApi(id).then(res => {
    //         props.RemoveContact(id)
    //         setLoading(false)
    //     }).catch(err => {
    //         const {message} = err.response.data
    //         setMessageType('error')
    //         setMessage(message)
    //         setLoading(false)
    //     })
    // }

    // const showConfirm = (id) => {
    //     confirm({
    //         title: 'Do you Want to delete these items?',
    //         icon: <ExclamationCircleOutlined />,
    //         content: 'Some descriptions',
    //         onOk() {
    //             deleteContacts(id)
    //         },
    //         onCancel() {
    //             console.log('Cancel');
    //         },
    //     });
    // }

    const editEvents = (event) => {
        setSelectedEvent(event)
        setVisible(true)
    }

    return (
        <div>
            {/* {isLoading && <Loader />} */}
            {visible && <EditEvent event={selectedEvent} visible={visible} closeModal={()=>{setVisible(false)}}/>}
            <Table dataSource={props.events}  pagination={false}
      scroll={{ x: 1000 }}>
                <Column title="Title" dataIndex="title" key="title" />
                { <Column
                title="Title"
                key="User_Event"
                render={(text, record) =>(
                       record.User_Event.map(User_Event=>(<Tag>{User_Event.title}</Tag>))
               
                )} />}
                <Column title="Description" dataIndex="description" key="description" />
                <Column title="Location URL" dataIndex="locationurl" key="locationurl" />
                <Column title="Message" dataIndex="message" key="message" />
                <Column title="Reminder message" dataIndex="reminderMessage" key="reminderMessage" />
                {/* <Column title="Invitation Link" dataIndex="invitationLink" key="invitationLink" /> */}
                <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle" key={record.id}>
                        <a onClick={()=>editEvents(record)}>Edit</a>
                    </Space>
                )}
                />
            </Table>
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
export default connect( mapStateToProps, mapDispatchToProps)(ContactList);