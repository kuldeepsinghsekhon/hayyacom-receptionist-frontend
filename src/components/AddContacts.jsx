import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Modal } from 'antd';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { connect } from 'react-redux';
import {addNewContacts} from "../actions/User"
import validateMessages from "../utils/validationMessages"
import {addContactsApi} from "../api/contacts"
import Alerts from "./Alert"

const AddContacts = (props) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    const onFinish = (values) => {
        setMessage("")
        setLoading(true)
        addContactsApi(values)
        .then(res => {
            setLoading(false)
            setMessageType('success')
            setVisible(false)
            props.AddNewContacts(res.data)
        })
        .catch(err => {
            const {message} = err.response.data
            setMessageType('error')
            setMessage(message)
            setLoading(false)
        })
    };
    return (
        <div>
            {message && <Alerts type={messageType} message={message}/>}
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Contact
            </Button>
            <Modal
                title="Add new Contact"
                centered
                visible={visible}
                footer={[]} 
                onCancel={()=>setVisible(false)}
            >
                <div>
                <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name='name'
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
                        name='phoneNumber'
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
                        name='totalGuest'
                        label="Total No. of Guests"
                        initialValue={1}
                        rules={[
                            {
                                type: 'number',
                                min: 1,
                                required:true,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name='totalChildren'
                        label="Total No. of Children"
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
    AddNewContacts : (data) => dispatch(addNewContacts(data))
})
  
  export default connect( "", mapDispatchToProps)(AddContacts);