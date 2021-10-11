import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Modal } from 'antd';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { connect } from 'react-redux';
import {addNewReceptionist} from "../actions/Receptionist"
import validateMessages from "../utils/validationMessages"
import {addReceptionistApi} from "../api/receptionist"
import Alerts from "./Alert"
const { Option } = Select;
const AddReceptionist = (props) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    const onFinish = (values) => {
        setMessage("")
        setLoading(true)
        addReceptionistApi(values)
        .then(res => {
            setLoading(false)
            setMessageType('success')
            setVisible(false)
            props.AddNewReceptionist(res.data)
        })
        .catch(err => {
            const {message} = err
            setMessageType('error')
           setMessage(message)
            setLoading(false)
        })
    };
    return (
        <div>
            {message && <Alerts type={messageType} message={message}/>}
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Receptionist
            </Button>
            <Modal
                title="Add new Receptionist"
                centered
                visible={visible}
                footer={[]} 
                onCancel={()=>setVisible(false)}
            >
                <div>
                <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name='Rname'
                        label="Name"
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
                        name='MobileNo'
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                            }
                        ]}
                    >
					
                        <PhoneInput
                            country={'sa'}
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label="Password"
                        initialValue={1}
                        rules={[
                            {
                                min: 3,
                                required:true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='fees'
                        label="Fees"
                        initialValue={0}
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
    AddNewReceptionist : (data) => dispatch(addNewReceptionist(data))
})
  
  export default connect( "", mapDispatchToProps)(AddReceptionist);