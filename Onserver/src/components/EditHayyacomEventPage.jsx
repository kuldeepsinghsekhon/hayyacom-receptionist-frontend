import React, { useState,useEffect } from 'react';
import { Form,Table,Space, Input,Breadcrumb, Button,Select, InputNumber, Modal,Layout,Row, Col,Tag } from 'antd';
import Loader from "./Loader"
import Alerts from "./Alert"
import TopNavbar from "./TopNavbar";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { connect } from 'react-redux'; 
import {editHayyacomEventsApi,getReceptionistApi,assignReceptionistApi,getEventDetail} from "../api/hayyacomEvents";

import {editHayyacomEvent,saveReceptionists} from "../actions/HayyacomEvent";
import validateMessages from "../utils/validationMessages";
import styled from 'styled-components';
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Column } = Table;
const Error = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
    color: #f70505;
`

const EditHayyacomEventPage = (props) => {
   // const [phone, setPhone] = useState(props.hayyacomEvent && JSON.parse(props.hayyacomEvent.MobileNo) || "");
       const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
	const [message, setMessage] = useState('');
    const [error, setError] = useState("")
const [visible, setVisible] = useState(false);
  const [webevent,  setWebevent] = useState({})
  
      useEffect(()=>{
        const { match: { params } } = props;
	console.log(params.id)
        getEventDetail(params.id).then(res => {
            const {data} = res
            setWebevent(data)
			console.log(data)
        }).catch(err => {
           // console.log( err, "err")
          //  setMessageType('error')
          //  setMessage("Something went wrong please try again !!")
        })
    }, [])
	
  useEffect(()=>{
        setLoading(true)
		loadData()	
     }, [webevent])
	 const loadData=()=>{
					if (webevent.partyhall) {
		let city = webevent.partyhall?webevent.partyhall.city:"";
		console.log(webevent)
             getReceptionistApi({"city":city,"date":webevent.date}).then(res => {
                const {data} = res						
                props.SaveReceptionists(data)
                setLoading(false)
            }).catch(err => {
                console.log( err, "err")
               // const {message} = err
                //setMessageType('error')
                //setMessage(message)
                //setLoading(false)
            })
}
	 }
	 const assignReceptionist=(values)=>{
		         setLoading(true)
		 let eventID = webevent.id;
		 let eventdate = webevent.date;
              assignReceptionistApi({"ReceptionistMobileNo": values.MobileNo,"date":eventdate,"eventID":eventID} ).then(res => {
				  console.log(res)
                const {data} = res	
				loadData();
                setLoading(false)
            }).catch(err => {
                console.log( err, "err")
                const {message} = err
                setMessageType('error')
                setMessage(message)
                setLoading(false)
            })  
	 }
    const onFinish = (values) => {
        console.log(values, "values")
		/* getReceptionistApi().then(res => {
                const {data} = res	
					console.log(data)
               // props.SaveReceptionists(data)
               // setLoading(false)
            }).catch(err => {
                console.log( err, "err")
                const {message} = err
                //setMessageType('error')
                //setMessage(message)
                //setLoading(false)
            }) */
       /*  if(!phone) {
            setError("Number is required")
            return
        } */
       // let data = props.hayyacomEvent
        /* data.Rname = values.hayyacomEvent.Rname
        data.MobileNo = phone
        data.fees = values.hayyacomEvent.fees
        data.city = values.hayyacomEvent.city */
       // editHayyacomEventsApi(data)
/*         .then(res => {
            props.closeModal(false)
            props.EditHayyacomEvent(data)
        })
        .catch(err => {
            console.log(err, "err")
			setError("can not add hayyacomEvent")
        }) */
    };
	const checkBooked = (record) => {
  if (record.booked==true) {
    return <a onClick={()=>{console.log(record)}}>UnAssign</a>
  } else {
    return <a onClick={()=>{assignReceptionist(record)}}>Assign</a>
  }
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
			<Breadcrumb.Item><a href="">{webevent.title}</a></Breadcrumb.Item>
			</Breadcrumb>
			</Col>

</Row>

 <Row>
  <Col span={24}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
				{/*<AddReceptionist />*/}
            {isLoading && <Loader />} 
            {message && <Alerts type={messageType} message={message}/>}

            
				 
				 <Table dataSource={props.receptionists}      scroll={{ x:600 }}>
                <Column title="Phone Number" dataIndex="MobileNo" key="MobileNo" />
                <Column title="Name" dataIndex="Rname" key="Rname" />
                <Column title="City" dataIndex="city" key="city" />
				<Column title="Fees" dataIndex="fees" key="fees" />
				<Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle" key={record.id}>
						{record.booked?<a onClick={()=>{console.log(record)}}>UnAssign</a>:<a onClick={()=>{assignReceptionist(record)}}>Assign</a>}
							  
                    </Space>
                )}
                />
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
        receptionists: state.HayyacomEventReducer.receptionists,
    };
}
const mapDispatchToProps = dispatch => ({
    EditHayyacomEvent : (data) => dispatch(editHayyacomEvent(data)),
	 SaveReceptionists : (data) => dispatch(saveReceptionists(data))
})
  
  export default connect( mapStateToProps, mapDispatchToProps)(EditHayyacomEventPage);