
import React, { useState, useEffect } from 'react';
import {saveInvitations} from "../actions/Invitaion"
import {getInvitations} from "../api/contacts"
import { connect } from 'react-redux';
import { Table, Space } from 'antd';
import Alerts from "./Alert"
import { APP_URL } from '../constant';

const { Column } = Table;

const InvitationList = (props) => {
    const [selectedContact, setSelectedContact] = useState({})
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    useEffect(()=>{
        setLoading(true)
        let userData = localStorage.getItem("loginUser")
        if(userData) {
            userData = JSON.parse(userData)
            getInvitations(userData.id).then(res => {
                const {data} = res
                props.SaveInvitations(data)
                setLoading(false)
            }).catch(err => {
                console.log( err, "err")
               
            })
        }
    }, [])
    const inviteContact = (invitation) => {
		let contact =invitation.contact
        let event = JSON.parse(localStorage.getItem("event"))

		let wtsappMessage =  "\n " + event.reminderMessage +"\n"+ '*بطاقة الدخول الخاصة بك*'+" \n "+ APP_URL+"/invite/"+invitation.id+ " \n "+'*موقع الحفل*'+"\n " + event.locationurl
		wtsappMessage = encodeURI(wtsappMessage)
            let wtsappLink = `https://wa.me/${contact.phoneNumber}?text=${wtsappMessage}`
        window.open(wtsappLink)
    }

const inviteThanks = (invitation) => {
		let contact =invitation.contact
        let event = JSON.parse(localStorage.getItem("event"))

		let wtsappMessage =  "\n  https://i.pinimg.com/736x/ed/1a/b8/ed1ab89f4a0cf7230422ddeed8185311.jpg" 
		wtsappMessage = encodeURI(wtsappMessage)
            let wtsappLink = `https://wa.me/${contact.phoneNumber}?text=${wtsappMessage}`
        window.open(wtsappLink)
    }
    return (
        <div>
            {message && <Alerts type={messageType} message={message}/>}
            <Table dataSource={props.invitations}        scroll={{ x: 1000 }}>
                <Column title="Name" dataIndex={["contact", "name"]} key="name" />
                <Column title="Phone Number" dataIndex={["contact", "phoneNumber"]} key="phoneNumber" />
                <Column title="No. of guests" dataIndex={["contact", "totalGuest"]} key="totalGuest" />
				<Column title="No. of guests attended" dataIndex={["attended"]} key="attended" />
                <Column title="No. of childern" dataIndex={["contact", "totalChildren"]} key="totalChildren" />
				<Column title="Status" dataIndex={[ "status"]} key="status" />

                <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle" key={record.id}>
                        {record.status!=="Decline" && <a onClick={()=>inviteContact(record)}>Remind</a>}
						{record.attended>=1 ? <a onClick={()=>inviteThanks(record)}>Thanks</a>:""}

                        {/* <a onClick={()=>editContacts(record)}>Edit</a>
                        <a onClick={()=>showConfirm(record.id)}>Delete</a> */}
                    </Space>
                )}
                />
            </Table>
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        invitations: state.InvitationReducer.invitations,
    };
}

const mapDispatchToProps = dispatch => ({
    SaveInvitations : (data) => dispatch(saveInvitations(data)),
    // RemoveContact: (id) => dispatch(removeContact(id))
})
export default connect( mapStateToProps, mapDispatchToProps)(InvitationList);