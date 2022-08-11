import React, { useState, useEffect } from 'react';
import TopNavbar from "./TopNavbar";
import { Modal, Table, Space,Layout} from 'antd';
import {saveGuestlists, removeGuestlist} from "../actions/Guestlist"
import {getGuestlistsApi,deleteguestlistApi} from "../api/guestlists"
import { connect } from 'react-redux';
import Loader from "./Loader"
import Alerts from "./Alert"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditReceptionist from './EditReceptionist';
import { APP_URL } from '../constant';
import AddReceptionist from "./AddReceptionist"
const { confirm } = Modal;
const { Column } = Table;
const { Header, Content, Footer } = Layout;
const GuestlistPage = (props) => {
    const [selectedReceptionist, setSelectedReceptionist] = useState({})
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    useEffect(()=>{
        setLoading(true)
        let userData = localStorage.getItem("loginUser")
       // if(userData) {
        let { match: { params } } = props;
        let invitermobile = params?.invitermobile ? params?.invitermobile : '98';
            userData = JSON.parse(userData)
            let postdata = { invitermobile: invitermobile }
        getGuestlistsApi(postdata.invitermobile).then(res => {
                const {data} = res	
                if(res?.data.length>0){
                    props.SaveGuestlists(data)
                }		
                
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

    const deleteContacts = (SN,eventid) => {
        deleteguestlistApi(SN,eventid).then(res => {
            console.log('resresres',res);

            props.RemoveGuestlist(SN,eventid)
            setLoading(false)
        }).catch(err => {
            const {message} = err.response.data
            setMessageType('error')
            console.log('resresres',err.response);
            setMessage(message)
            setLoading(false)
        })
    }

    const showConfirm = (SN,eventid) => {
        confirm({
            title: `Do you Want to delete SN ${SN}?`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteContacts(SN,eventid)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

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
		
            {/* {isLoading && <Loader />} */}
            {message && <Alerts type={messageType} message={message}/>}
            {visible && <EditReceptionist receptionist={selectedReceptionist} visible={visible} closeModal={()=>{setVisible(false)}}/>}
           
            <Table dataSource={props.guestlists}    scroll={{ x:320 }}>
                <Column title="SN" dataIndex="SN" key="SN" />
                <Column title="Name" dataIndex="guestname" key="guestname" />
			<Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle" key={record.SN}>
                    
							 <a onClick={()=>showConfirm(record.SN,record.eventid)}>Delete</a> 
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
        guestlists: state.GuestlistsReducer.guestlists,
    };
}

const mapDispatchToProps = dispatch => ({
    SaveGuestlists : (data) => dispatch(saveGuestlists(data)),
    RemoveGuestlist: (SN,eventid) => dispatch(removeGuestlist(SN,eventid))
})
export default connect( mapStateToProps, mapDispatchToProps)(GuestlistPage);