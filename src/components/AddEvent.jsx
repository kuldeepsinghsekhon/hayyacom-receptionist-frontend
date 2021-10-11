import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Modal } from 'antd';
import {addNewEvent} from "../actions/Event"
import { connect } from 'react-redux';
import validateMessages from "../utils/validationMessages"
import {addEventsApi} from "../api/events"
import Alerts from "./Alert"

const AddEvent = (props) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    const onFinish = (values) => {
        setMessage("")
        setLoading(true)
        addEventsApi(values.event)
        .then(res => {
            setLoading(false)
            setMessageType('success')
            setVisible(false)
            props.AddNewEvent(res.data)
        })
        .catch(err => {
            console.log(err, "err")
          const {message} = err.response.data
            setMessageType('error')
            setMessage(message)
            setLoading(false)
            setVisible(false) 
        })
    };
    return (
        <div>
            {message && <Alerts type={messageType} message={message}/>}
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Event
            </Button>
            <Modal
                title="Add new Event"
                centered
                visible={visible}
                footer={[]} 
                onCancel={()=>setVisible(false)}
            >
                <div>
                <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['event', 'title']}
                        label="Title"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['event', 'description']}
                        label="Description"
                        rules={[
                        {
                            required: true,
                        }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['event', 'locationurl']}
                        label="Location Url"
                        rules={[
                            {
                                required:true
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['event', 'invitationLink']}
                        label="Invitation Url"
                        rules={[
                            {
                                required:true
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['event', 'message']}
                        label="Message"
                        rules={[
                        {
                            required:true
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['event', 'reminderMessage']}
                        label="Reminder Message"
                        rules={[
                        {
                            required: true,
                        }
                        ]}
                    >
                        <Input />
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
    AddNewEvent : (data) => dispatch(addNewEvent(data))
})
  
  export default connect( "", mapDispatchToProps)(AddEvent);