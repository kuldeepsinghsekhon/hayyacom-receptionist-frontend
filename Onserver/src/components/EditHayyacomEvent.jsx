import React, { useState,useEffect } from 'react';
import { Form,Table,Space, Input, Button,Select, InputNumber, Modal } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { connect } from 'react-redux'; 
import {editHayyacomEventsApi,getReceptionistApi,assignReceptionistApi} from "../api/hayyacomEvents";

import {editHayyacomEvent,saveReceptionists} from "../actions/HayyacomEvent";
import validateMessages from "../utils/validationMessages";
import styled from 'styled-components';
const { Option } = Select;
const { Column } = Table;
const Error = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
    color: #f70505;
`

const EditHayyacomEvent = (props) => {
   // const [phone, setPhone] = useState(props.hayyacomEvent && JSON.parse(props.hayyacomEvent.MobileNo) || "");
    const [error, setError] = useState("")
const [visible, setVisible] = useState(false);
const [receptionists,  setReceptionists] = useState(props.receptionists)
   useEffect(()=>{
        //setLoading(true)
		loadData()
    },[receptionists])
	const loadData=()=>{
		let city = props.hayyacomEvent.partyhall?props.hayyacomEvent.partyhall.city:"";
             getReceptionistApi({"city":city,"date":props.hayyacomEvent.date}).then(res => {
                const {data} = res						
                props.SaveReceptionists(data)
               // setLoading(false)
            }).catch(err => {
                console.log( err, "err")
               // const {message} = err
                //setMessageType('error')
                //setMessage(message)
                //setLoading(false)
            }) 
	}
	 const assignReceptionist=(values)=>{
		 
		 let eventID = props.hayyacomEvent.id;
		 let eventdate = props.hayyacomEvent.date;
		 console.log(eventdate)
		  console.log(eventID)
		  console.log(values.MobileNo)
		 
              assignReceptionistApi({"ReceptionistMobileNo": values.MobileNo,"date":eventdate,"eventID":eventID} ).then(res => {
				  console.log(res)
				  loadData()
                //const {data} = res						
               // props.SaveReceptionists(data)
               // setLoading(false)
            }).catch(err => {
                console.log( err, "err")
                const {message} = err
                //setMessageType('error')
                //setMessage(message)
                //setLoading(false)
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
        <div class="receptionists">
            <Modal
                title={props.hayyacomEvent.eventtitle +' ('+props.hayyacomEvent.date+')'}
                centered
                visible={true}
                footer={[]} 
                onCancel={()=>props.closeModal(false)}
				style={{ width: "100%", resize: "none" }}
            >
                <div>
				 
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
						{record.booked?<a onClick={()=>{assignReceptionist(record)}}>Booked for {record.booking.eventID==props.hayyacomEvent.id?'this event':'Other'}</a>:<a onClick={()=>{assignReceptionist(record)}}>Available</a>}
							  
                    </Space>
                )}
                />
            </Table>
               
                </div>
            </Modal>
        </div>

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
  
  export default connect( mapStateToProps, mapDispatchToProps)(EditHayyacomEvent);