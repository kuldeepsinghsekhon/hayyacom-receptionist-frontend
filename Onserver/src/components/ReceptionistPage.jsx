import React, { useState, useEffect } from 'react';
import TopNavbar from "./TopNavbar";
import { Modal, Table, Space,Layout} from 'antd';
import {saveContacts, removeContact} from "../actions/User"
import {saveReceptionists, removeReceptionist} from "../actions/Receptionist"
import {getContactsApi, deleteContactsApi, inviteContactsApi} from "../api/contacts"
import {getReceptionistApi} from "../api/receptionist"
import { connect } from 'react-redux';

import Loader from "./Loader"
import Alerts from "./Alert"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditReceptionist from './EditReceptionist';
import { APP_URL } from '../constant';
import AddReceptionist from "../components/AddReceptionist"
const { confirm } = Modal;
const { Column } = Table;
const { Header, Content, Footer } = Layout;
const ReceptionistPage = (props) => {
    const [selectedReceptionist, setSelectedReceptionist] = useState({})
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    useEffect(()=>{
        setLoading(true)
        let userData = localStorage.getItem("loginUser")
       // if(userData) {
            userData = JSON.parse(userData)
            getReceptionistApi().then(res => {
                const {data} = res			
                props.SaveReceptionists(data)
                setLoading(false)
            }).catch(err => {
                console.log( err, "err")
                const {message} = err
                setMessageType('error')
                setMessage(message)
                setLoading(false)
            })
        //}
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

    const editReceptionist = (receptionist) => {

        setSelectedReceptionist(receptionist)
        setVisible(true)
    }

   

    return (
		 <Layout>
		  <Header>
		<TopNavbar/>	  
		</Header>
			 <Content className="site-layout" >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
		 <AddReceptionist />
            {/* {isLoading && <Loader />} */}
            {message && <Alerts type={messageType} message={message}/>}
            {visible && <EditReceptionist receptionist={selectedReceptionist} visible={visible} closeModal={()=>{setVisible(false)}}/>}
		
            <Table dataSource={props.receptionists}      scroll={{ x: 1000 }}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="Phone Number" dataIndex="MobileNo" key="MobileNo" />
                <Column title="Name" dataIndex="Rname" key="Rname" />
                <Column title="City" dataIndex="city" key="city" />
				<Column title="Fees" dataIndex="fees" key="fees" />
				{ /*<Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle" key={record.id}>
                       <a onClick={()=>editReceptionist(record)}>Edit</a>
							 <a onClick={()=>showConfirm(record.id)}>Delete</a> 
                    </Space>
                )}
                />*/}
            </Table>
        </div>
		</Content>
		 <Footer style={{ textAlign: 'center' }}>All right reserved © Hayyacom 2016-2021</Footer>
		 </Layout>
    )
    
}

const mapStateToProps = (state) => {
    return {
        receptionists: state.ReceptionistReducer.receptionists,
    };
}

const mapDispatchToProps = dispatch => ({
    SaveReceptionists : (data) => dispatch(saveReceptionists(data)),
    RemoveReceptionist: (id) => dispatch(removeReceptionist(id))
})
export default connect( mapStateToProps, mapDispatchToProps)(ReceptionistPage);