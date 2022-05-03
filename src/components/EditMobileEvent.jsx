import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Card, Select, InputNumber, Modal, Layout, Menu, Breadcrumb } from 'antd';
import { addNewEvent } from "../actions/Event"
import { API_URL } from '../constant';
import { connect } from 'react-redux';
import validateMessages from "../utils/validationMessages"
import { addEventsApi } from "../api/events"
import Alerts from "./Alert"
import TopNavbar from "./TopNavbar";
import moment from 'moment';
import axios from 'axios';
const dateFormat = 'MM/DD/YYYY';
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Meta } = Card;


const EditMobileEvent = (props) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    const [form] = Form.useForm();
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    const  fetchData=() => {
        const { match: { params } } = props;
        const eventid=params.id
        let url = `${API_URL}/hayyacom/events/${eventid}`
    
         axios({
            method: 'get',
            url: url,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        }).then(res => {
            console.log('res.data',res.data)
            setData(res.data.data)
        })
    }
    const [data, setData] = useState(fetchData);
        const onFinish = async (values) => {
        console.log(values)
        setMessage("")
        setLoading(true)
        values.event.date = values.event.date.format("YYYY/MM/DD")
        values.event.id = data?.id
        //let url='https://hayyacom.net/WhatsappInvitation/hayyacom/events/create'
        let url = `${API_URL}/hayyacom/events/update`

        axios({
            method: 'post',
            url: url,
            data: values.event,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        }).then(res => {
            setLoading(false)
            setMessageType('success')
            setVisible(false)
            let ev = res.data.data
            console.log(' res.data', res.data)
            form.resetFields();///receptionists
            props.history.push(`/receptionists/hayyacom/addinviter_preview/${data?.id}`)
        })
            .catch(err => {
                console.log(err, "err")
                const { message } = err
                setMessageType('error')
                setMessage(message)
                setLoading(false)
                setVisible(false)
            })
    };
    const footer = () => {
        //  if (lang == 'en') {
        return <div><p> For more information  and customer support contact us via <a href="https://wa.me/966545676539">Whatsapp</a> </p> <p>All right reserved © Hayyacom 2016-2021</p></div>
        // } else {
        //     return <div><p>للحصول على مساعدة وللمزيد من المعلومات فضلاً  <a href="https://wa.me/966545676539">اضغط هنا للتواصل عبر الواتساب </a> </p><p>جميع الحقوق محفوظة لمؤسسة حيَِّاكم</p></div>
        // }
    }
    return (
        <Layout className="layout">

            <Header>
                <TopNavbar />
            </Header>

            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>STEP 1: CREATING EVENT</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                  {data? <Form name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>

                        <Form.Item
                            name={['event', 'eventtitle']}
                            label="Title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={data?.eventtitle}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['event', 'partyhallid']}
                            label="partyhallid"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                            initialValue={data?.partyhallid}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={['event', 'totalguest']}
                            label="totalguest"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                            initialValue={data?.totalguest}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['event', 'packagetype']}
                            label="packagetype"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                            initialValue={data?.packagetype}
                        >
                            <Select  >
                                <Option value="Regular">Regular</Option>
                                <Option value="Discounted">Discounted</Option>

                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['event', 'notes']}
                            label="notes"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                            initialValue={data?.notes}

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['event', 'type']}
                            label="Party Type"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                            initialValue={data?.type}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="DatePicker" name={['event', 'date']}
                            label="Event Date"
                            initialValue={data?.date?moment(data.date,"YYYY/MM/DD"):''}
                            rules={[
                                {
                                    required: true,
                                }
                            ]}>
                            <DatePicker defaultValue={data?.date?moment(data.date,"YYYY/MM/DD"):''} disabledDate={disabledDate} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                NEXT PREVIEW INVITER
                            </Button>
                        </Form.Item>
                    </Form>:''}
                </Card>
            </Content>
            <Footer style={{ textAlign: 'center' }}>{footer()}</Footer>

        </Layout>

    )
}
{/* const mapStateToProps = (state) => {
    return {
        invitations: state.InvitationReducer.invitations,
        locale: state.UserReducer.user.language ? state.UserReducer.user.language.locale : 'ar',

    };
} */}

const mapDispatchToProps = dispatch => ({
    AddNewEvent: (data) => dispatch(addNewEvent(data))
})

export default connect("", mapDispatchToProps)(EditMobileEvent);