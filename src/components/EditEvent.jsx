import React, { useState } from 'react';
import { Form, Input, Button,Select, InputNumber, Modal } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { connect } from 'react-redux'; 
import {editHayyacomEventsApi} from "../api/hayyacomEvents";
import {editHayyacomEvent} from "../actions/HayyacomEvent";
import validateMessages from "../utils/validationMessages";
import styled from 'styled-components';
const { Option } = Select;
const Error = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
    color: #f70505;
`

const EditEvent = (props) => {
    const [phone, setPhone] = useState(props.hayyacomEvent && JSON.parse(props.hayyacomEvent.MobileNo) || "");
    const [error, setError] = useState("")

    const onFinish = (values) => {
        console.log(values, "values")
        if(!phone) {
            setError("Number is required")
            return
        }
        let data = props.hayyacomEvent
        data.Rname = values.hayyacomEvent.Rname
        data.MobileNo = phone
        data.fees = values.hayyacomEvent.fees
        data.city = values.hayyacomEvent.city
        editHayyacomEventsApi(data)
        .then(res => {
            props.closeModal(false)
            props.EditHayyacomEvent(data)
        })
        .catch(err => {
            console.log(err, "err")
			setError("can not add hayyacomEvent")
        })
    };
    return (
        <div>
            <Modal
                title="Edit Whats app Event"
                centered
                visible={true}
                footer={[]} 
                onCancel={()=>props.closeModal(false)}
            >
                <div>
                <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['hayyacomEvent', 'Rname']}
                        label="Name"
                        initialValue={props.hayyacomEvent && props.hayyacomEvent.Rname || ""}
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
					<Form.Item
					name="city"
					label="City"
					 initialValue={props.hayyacomEvent && props.hayyacomEvent.city || ""}
					   rules={[
                        {
                            required: true,
                        },
                        ]}
					>
					  <Select defaultValue="Select" style={{ width: 120 }} >
					  <Option value="Makkah">Makkah</Option>
					  <Option value="Makkah">Makkah</Option>
					  <Option value="Almadinah">Almadinah</Option>
					  <Option value="Taif">Taif</Option>
					  <Option value="Abha">Abha</Option>
					  <Option value="Tabuk">Tabuk</Option>
					  <Option value="Dammam">Dammam</Option>
					  <Option value="Dawadmi">Dawadmi</Option>
					  <Option value="Riyadh">Riyadh</Option>
					  <Option value="Jizan">Jizan</Option>
					  <Option value="alahsaa">alahsaa</Option>
					  <Option value="Alqasim">Alqasim</Option>
					  <Option value="Hail">Hail</Option>
					  <Option value="Alzulfi">Alzulfi</Option>
					  <Option value="Alkharj">Alkharj</Option>
					  <Option value="Hafralbatin">Hafralbatin</Option>
					</Select>
					
					</Form.Item>
                    <Form.Item
                        name={['hayyacomEvent', 'MobileNo']}
                        label="Phone Number"
                    >
                        <PhoneInput
                            inputProps={{
                                name: ['hayyacomEvent', 'MobileNo'],
                                value: phone,
                            }}

                            onChange= {(e) => {
                                setPhone(e)  
                                setError("")
                            }}
                        />
                        {error && <Error>{error}</Error>}
                    </Form.Item>
					  <Form.Item
                        name={['hayyacomEvent', 'password']}
                        label="Name"
                        initialValue={props.hayyacomEvent && props.hayyacomEvent.password || ""}
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                 
                    <Form.Item
                        name={['contact', 'fees']}
                        label="Fees"
                        initialValue={props.hayyacomEvent && props.hayyacomEvent.fees || 0}
                        rules={[
                        {
                            type: 'number',
                            required:true
                        },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </Modal>
        </div>

    )
}


const mapDispatchToProps = dispatch => ({
    EditHayyacomEvent : (data) => dispatch(editHayyacomEvent(data))
})
  
  export default connect( "", mapDispatchToProps)(EditEvent);