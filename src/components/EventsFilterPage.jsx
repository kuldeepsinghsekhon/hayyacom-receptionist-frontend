import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"
import { Modal, Table, Space,Layout} from 'antd';
import {saveContacts, removeContact} from "../actions/User"
import {getContactsApi, deleteContactsApi, inviteContactsApi} from "../api/contacts"
import { connect } from 'react-redux';

import Loader from "./Loader"
import Alerts from "./Alert"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditContact from './EditContact';
import { APP_URL } from '../constant';
import AddContacts from "../components/AddContacts"
const { confirm } = Modal;
const { Column } = Table;
const { Header, Content, Footer } = Layout;
const ContactList = (props) => {
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
            getContactsApi(userData.id).then(res => {
                const {data} = res
                props.SaveContacts(data)
                setLoading(false)
            }).catch(err => {
                console.log( err, "err")
                const {message} = err.response.data
                setMessageType('error')
                setMessage(message)
                setLoading(false)
            })
        }
    }, [])

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
    //         onOk() {
    //             deleteContacts(id)
    //         },
    //         onCancel() {
    //             console.log('Cancel');
    //         },
    //     });
    // }

    const editContacts = (contact) => {

        setSelectedContact(contact)
        setVisible(true)
    }

    const inviteContact = (contact) => {
        let event = localStorage.getItem('event')
        if(event){
            let data = {}
            data.contactId = contact.id
            data.userId = JSON.parse(localStorage.getItem('loginUser')).id
            data.eventId = JSON.parse(event).id
            if(contact.id && JSON.parse(event).id && JSON.parse(localStorage.getItem('loginUser')).id){
                inviteContactsApi(data).then(res => {
                    let event = JSON.parse(localStorage.getItem("event"))
                    let wtsappMessage =  "\n " + event.message +"\n "+' *نرجوا تأكيد الحضور أو الإعتذار عبر الرابط*'+" \n "+ APP_URL+"/invite/"+res.invitation.id+ " \n"+' *موقع الحفل*'+" \n " + event.locationurl
                    wtsappMessage = encodeURI(wtsappMessage)
                    let wtsappLink = `https://wa.me/${contact.phoneNumber}?text=${wtsappMessage}`
                    window.open(wtsappLink)
                }).catch(err => {
                    const {message} = err.response.data
                    setMessageType('error')
                    setMessage(message)
                    setLoading(false)
                })
            }
        } else {
            setMessageType('error')
            setMessage("Please add event first")
        }
        
    }

    return (
		 <Layout>
		 <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
		    <Navbar />
            </Header>
			 <Content className="site-layout" >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
		 <AddContacts />
            {/* {isLoading && <Loader />} */}
            {message && <Alerts type={messageType} message={message}/>}
            {visible && <EditContact contact={selectedContact} visible={visible} closeModal={()=>{setVisible(false)}}/>}
		
            <Table dataSource={props.contacts}      scroll={{ x: 1000 }}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                <Column title="No. of guests" dataIndex="totalGuest" key="totalGuest" />
                <Column title="No. of childern" dataIndex="totalChildren" key="totalChildren" />
                <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle" key={record.id}>
                        <a onClick={()=>inviteContact(record)}>Invite</a>
                        <a onClick={()=>editContacts(record)}>Edit</a>
                        {/* <a onClick={()=>showConfirm(record.id)}>Delete</a> */}
                    </Space>
                )}
                />
            </Table>
        </div>
		</Content>
		 <Footer style={{ textAlign: 'center' }}>All right reserved © Hayyacom 2016-2021</Footer>
		 </Layout>
    )
    
}

const mapStateToProps = (state) => {
    return {
        contacts: state.UserReducer.contacts,
    };
}

const mapDispatchToProps = dispatch => ({
    SaveContacts : (data) => dispatch(saveContacts(data)),
    RemoveContact: (id) => dispatch(removeContact(id))
})
export default connect( mapStateToProps, mapDispatchToProps)(ContactList);