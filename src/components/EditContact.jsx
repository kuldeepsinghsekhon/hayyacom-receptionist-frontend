import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Modal } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { connect } from 'react-redux'; 
import {editContactsApi} from "../api/contacts";
import {editContact} from "../actions/User";
import validateMessages from "../utils/validationMessages";
import styled from 'styled-components';

const Error = styled.p`
    margin-top: 5px;
    margin-bottom: 0px;
    color: #f70505;
`

const EditContact = (props) => {
    const [phone, setPhone] = useState(props.contact && JSON.parse(props.contact.phoneNumber) || "");
    const [error, setError] = useState("")

    const onFinish = (values) => {
        console.log(values, "values")
        if(!phone) {
            setError("Number is required")
            return
        }
        let data = props.contact
        data.name = values.contact.name
        data.phoneNumber = phone
        data.totalGuest = values.contact.totalGuest
        data.totalChildren = values.contact.totalChildren
        editContactsApi(data)
        .then(res => {
            props.closeModal(false)
            props.EditContacts(data)
        })
        .catch(err => {
            console.log(err, "err")
			setError("can not add "+data.totalGuest+" more guest")
        })
    };
    return (
        <div>
            <Modal
                title="Edit Contact"
                centered
                visible={true}
                footer={[]} 
                onCancel={()=>props.closeModal(false)}
            >
                <div>
                <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['contact', 'name']}
                        label="Name"
                        initialValue={props.contact && props.contact.name || ""}
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['contact', 'phoneNumber']}
                        label="Phone Number"
                    >
                        <PhoneInput
                            inputProps={{
                                name: ['contact', 'phoneNumber'],
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
                        name={['contact', 'totalGuest']}
                        label="Total No. of Guests"
                        initialValue={props.contact && props.contact.totalGuest || 1}
                        rules={[
                        {
                            type: 'number',
                            required:true
                        },
                        ]}
                    >   
                            <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={['contact', 'totalChildren']}
                        label="Total No. of Children"
                        initialValue={props.contact && props.contact.totalChildren || 0}
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
    EditContacts : (data) => dispatch(editContact(data))
})
  
  export default connect( "", mapDispatchToProps)(EditContact);