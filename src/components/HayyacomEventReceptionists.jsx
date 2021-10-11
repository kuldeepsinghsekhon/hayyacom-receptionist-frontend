import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import {editEventsApi} from "../api/events"
import {editHayyacomEvent} from "../actions/HayyacomEvent"
import { connect } from 'react-redux';
import validateMessages from "../utils/validationMessages"
import Alerts from "./Alert"

const HayyacomEventReceptionists = (props) => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const onFinish = (values) => {
        setMessage("")
        let data = props.hayyacomEvent
        data.title = values.event.title
        data.description = values.event.description
        data.locationurl = values.event.locationurl
        data.message = values.event.message
        editEventsApi(data)
        .then(res => {
            setMessageType('success')
            props.closeModal(false)
            props.HayyacomEvent(data)
        })
        .catch(err => {
            console.log(err, "err")
        })
    };
    return (
        <div>
            {message && <Alerts type={messageType} message={message}/>}
            <Modal
                title="Edit Events"
                centered
                visible={true}
                footer={[]} 
                onCancel={()=>props.closeModal(false)}
            >
                <div>
                <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['event', 'title']}
                        label="Title"
                        initialValue={(props.hayyacomEvent && props.hayyacomEvent.title) || ""}
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
                        initialValue={(props.hayyacomEvent && props.hayyacomEvent.description) || ""}
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
                        initialValue={(props.hayyacomEvent && props.hayyacomEvent.locationurl) || ""}
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
                        initialValue={(props.hayyacomEvent && props.hayyacomEvent.invitationLink) || ""}
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
                        initialValue={(props.hayyacomEvent && props.hayyacomEvent.message) || ""}
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
                        initialValue={(props.hayyacomEvent && props.hayyacomEvent.reminderMessage) || ""}
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
    HayyacomEvent : (data) => dispatch(editHayyacomEvent(data))
})
  
  export default connect( "", mapDispatchToProps)(HayyacomEventReceptionists);