import React, { useState, useEffect } from 'react';
import TopNavbar from "./TopNavbar";
import { Modal, Table,Breadcrumb, Space,Layout,DatePicker ,Row, Col,Tag} from 'antd';
import {saveHayyacomEvents, removeHayyacomEvent} from "../actions/HayyacomEvent"
import {getHayyacomEventsApi} from "../api/hayyacomEvents"
import { connect } from 'react-redux';

import Loader from "./Loader"
import Alerts from "./Alert"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditHayyacomEvent from './EditHayyacomEvent';
import { APP_URL } from '../constant';
import moment from 'moment';
//import AddReceptionist from "../components/AddReceptionist"
const { confirm } = Modal;
const { Column } = Table;
const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const HayyacomEventPage = (props) => {
    const [selectedHayyacomEvent, setSelectedHayyacomEvent] = useState({})
	const [visible, setVisible] = useState(false); 
	const [message, setMessage] = useState('');
	const [fromdate, setFromdate] = useState('2018-10-12');
	const [todate, setTodate] = useState('2018-10-12');
		const [value, setValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

   

	const loadData=(value, dateString)=>{
			setFromdate(dateString[0])
		let enddate=moment(dateString[1], "YYYY-MM-DD").add('days', 1)
		setTodate(enddate)
        setLoading(true)
        let userData = localStorage.getItem("loginUser")
       // if(userData) {
            userData = JSON.parse(userData)
            getHayyacomEventsApi({"fromdate":dateString[0],"todate":enddate})
			.then(res => {
                const {data} = res			
                props.SaveHayyacomEvents(data)
                setLoading(false)
            }).catch(err => {
                console.log( err, "err")
                const {message} = err
                setMessageType('error')
                setMessage(message)
                setLoading(false)
            })
        //}
    }
	     const loadValue=(value, dateString) =>{
			
			setValue(value)
		}
	/*  useEffect(()=>{
        setLoading(true)
        let userData = localStorage.getItem("loginUser")
       // if(userData) {
            userData = JSON.parse(userData)
            getHayyacomEventsApi({"fromdate":fromdate,"todate":todate})
			.then(res => {
                const {data} = res			
                props.SaveHayyacomEvents(data)
				       console.log( res, "res")
                setLoading(false)
            }).catch(err => {
                console.log( err, "err")
                const {message} = err
                setMessageType('error')
                setMessage(message)
                setLoading(false)
            },[value])
    }) */
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

     const editHayyacomEvent = (hayyacomEvent) => {
			
            //let receptionstsLink = `/receptionists/${hayyacomEvent.id}`
            //window.open(receptionstsLink)
         setSelectedHayyacomEvent(hayyacomEvent)
		setVisible(true)  
   }



    return (
			<Layout>
		  <Header>
		<TopNavbar/>	  
		</Header>
		
		<Content className="site-layout" >
			  
			<Row style={{ paddingLeft:24,paddingRight:24}}>
			  <Col xs={24} sm={12} md={18} lg={18} xl={19}>
			  <Breadcrumb>
			  <Breadcrumb.Item>Receptionists</Breadcrumb.Item>
			<Breadcrumb.Item><a href="">Hayyacom Events</a></Breadcrumb.Item>
			</Breadcrumb>
			</Col>
      <Col xs={24} sm={12} md={6} lg={6} xl={5} >
    <RangePicker onChange={loadData}   format="YYYY/MM/DD "/>
</Col>
</Row>

 <Row>
  <Col span={24}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
				{/*<AddReceptionist />*/}
            {isLoading && <Loader />} 
            {message && <Alerts type={messageType} message={message}/>}
				{visible && <EditHayyacomEvent hayyacomEvent={selectedHayyacomEvent} visible={true} closeModal={()=>{setVisible(false)}}/>}
		
            <Table dataSource={props.hayyacomEvents}      scroll={{ x: 600 }}>
                <Column title="id" dataIndex="id" key="id" />
                <Column title="Title" dataIndex="eventtitle" key="eventtitle" />
				<Column title="Date" dataIndex="date" key="date" />
                <Column title="totalguest" dataIndex="totalguest" key="totalguest" />
				<Column title="packagetype" dataIndex="packagetype" key="packagetype" />
				<Column title="Notes" dataIndex="notes" key="notes" />
				{ <Column
                title="Inviters Number"
                key="inviters"
                render={(text, record) =>(
                       record.inviters.map(inviter=>(<Tag>{inviter.mobile}</Tag>))
               
                )} />}
				{ <Column
                title="PartyHall"
                key="partyhall"
                render={(text, record) => (                 
                       <span>{record.partyhall.name}</span>              
                )}
                />}
				{ <Column
                title="City"
                key="partyhall"
                render={(text, record) => (
                  
                       <span>{record.partyhall.city}</span>
               
                )}
                />}
				{ <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle" key={record.id}>
                       <a onClick={()=>editHayyacomEvent(record)}>Receptionists</a>
                    </Space>
                )}
                />}
            </Table>
        </div>
		</Col>
				</Row>
		</Content>

		 <Footer style={{ textAlign: 'center' }}>All right reserved © Hayyacom 2016-2021</Footer>
		 </Layout>
    )
    
}

const mapStateToProps = (state) => {
    return {
        hayyacomEvents: state.HayyacomEventReducer.hayyacomEvents,
    };
}

const mapDispatchToProps = dispatch => ({
    SaveHayyacomEvents : (data) => dispatch(saveHayyacomEvents(data)),
    RemoveHayyacomEvent: (id) => dispatch(removeHayyacomEvent(id))
})
export default connect( mapStateToProps, mapDispatchToProps)(HayyacomEventPage);