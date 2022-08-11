import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Input, Button,Alert, DatePicker, Card, Select, InputNumber, Spin,Row, Col, Modal, Layout, Menu, Breadcrumb } from 'antd';
import { API_URL } from '../constant';
import { addNewEvent } from "../actions/Event"
import { connect } from 'react-redux';
import validateMessages from "../utils/validationMessages"
import { addEventsApi } from "../api/events"
import Alerts from "./Alert"
import TopNavbar from "./TopNavbar";
import moment from 'moment';
import axios from 'axios';
import styled from 'styled-components';
const dateFormat = 'MM/DD/YYYY';
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Meta } = Card;
const InviteImage = styled.img`
    max-width: 100%;
    width: 100%;
`;
const AddSaveInviter = (props) => {
    let history = useHistory();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [showmodal, setShowmodal] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [base64image, setBase64image] = useState('');
    const [form] = Form.useForm();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const [selectedEvent, setSelectedEvent] = useState();
    const { match: { params } } = props;
    const id=params?.id

  const  fetchData=() => {
      
        let url = `${API_URL}/hayyacom/invitors/searchPreview`

         axios({
            method: 'post',
            url: url,
            data: {id:id},
            //headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res.data.data)
            setData(res.data.data)
        })
    }
    const [data, setData] = useState(fetchData);

    const onFinish = async (values) => {

        setMessage("")
        setLoading(true)
        values.event.date = values?.event?.date?.format("DD/MM/YYYY")
        const formData = new FormData();

        formData.append('file', selectedFile);
        formData.append("document", JSON.stringify(values.event));

        let url = `${API_URL}/hayyacom/invitors/create`

         axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            // addEventsApi(values.event)
            .then(res => {
                
                setLoading(false)
                setMessageType('success')
                setMessage("Inviter Added Successfully to add More inviter Change mobile and other required values and click save again")
                setVisible(false)
               // form.resetFields();
            })
            .catch(err => {
                console.log(err, "err")
                const { message } = err
                setMessageType('error')
                setMessage(err.response.data.message)
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
    const layout = {

        wrapperCol: {
            span: 12,
        },
    };

    return (
        <Layout className="layout">

            <Header>
                <TopNavbar />
            </Header>

            <Content style={{ padding: '0 50px' }}>

                <Spin spinning={isLoading} delay={500}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Invitor</Breadcrumb.Item>
                    </Breadcrumb>
                    {message && <Alerts type={messageType} message={message} />}
                    <Card>
                        <Modal
                            title={'Invitation Preview'}
                            centered
                            visible={showmodal}
                            onCancel={() => setShowmodal(false)}
                            footer={[]}
                        >
                            <InviteImage src={base64image ? `data:image/png;base64,${base64image}` : ''} />
                            {/* {base64image ? <img src={`data:image/png;base64,${base64image}`}/>: ''} */}
                        </Modal>


                     {data?   <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} layout="vertical" validateMessages={validateMessages}>
<p>Please note: On this page You may create/update inviter as many times as you want.
     when you change phone number it will create a new inviter because each inviter is unique by Phonenumer and event ID</p>
                     <Form.Item
                                name={['event', 'entranceURL']}
                                label="entranceURL"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                initialValue={data.entranceURL}
                                                               
                            >
                                <Input disabled/>
                            </Form.Item>
                            <Form.Item
                                name={['event', 'name']}
                                label="name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                initialValue={data.name}
                                                               
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={['event', 'mobile']}
                                label="mobile"
                                rules={[
                                    {
                                        required: true,
                                    }
                                ]}
                                initialValue={data.mobile}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={['event', 'password']}
                                label="password"
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                                initialValue={data.password}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={['event', 'totalguestallowed']}
                                label="totalguestallowed"
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                                initialValue={data.totalguestallowed}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={['event', 'eventid']}
                                label="eventid"
                                rules={[
                                    {
                                        required: true
                                    },
                                ]}
                                initialValue={data.eventid}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={['event', 'LocationURL']}
                                label="LocationURL"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ]}
                                initialValue={data.LocationURL}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="QR Settings" style={{ marginBottom: 0 }}>

                                <Form.Item
                                    name={['event', 'QRcolor']}
                                    label="QRcolor"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.QRcolor}
                                    style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['event', 'QRW']}
                                    label="QRW"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.QRW}
                                  
                                    style={{ display: 'inline-block', margin: '0 8px' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>

                                <Form.Item
                                    name={['event', 'QRH']}
                                    label="QRH"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.QRH}
                                    style={{ display: 'inline-block', margin: '0 8px' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>

                                <Form.Item
                                    name={['event', 'QRsize']}
                                    label="QRsize"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.QRsize}
                                    style={{ display: 'inline-block', width: 'calc(20% - 8px)', margin: '0 8px' }}
                                >
                                    <InputNumber min={1} max={600} />
                                </Form.Item>

                            </Form.Item>



                            <Form.Item label="Text Settings" style={{ marginBottom: 0 }}>
                                <Form.Item
                                    name={['event', 'Textcolor']}
                                    label="Textcolor"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.Textcolor}
                                    style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}
                                >
                                    <Input  />
                                </Form.Item>
                                <Form.Item
                                    name={['event', 'TextType']}
                                    label="TextType"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.TextType}
                                    style={{ display: 'inline-block', margin: '0 8 0 0px' }}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name={['event', 'TextW']}
                                    label="TextW"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.TextW}
                                    style={{ display: 'inline-block', margin: '0 8 0 0px' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>

                                <Form.Item
                                    name={['event', 'TextH']}
                                    label="TextH"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.TextH}
                                    style={{ display: 'inline-block', margin: '0 8 0 0px' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>

                            </Form.Item>
                            


                            <Form.Item
                                name={['event', 'textTitle']}
                                label="textTitle"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ]}
                                initialValue={data.textTitle}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="" style={{ marginBottom: 0 }}>
                                <Form.Item
                                    name={['event', 'SNW']}
                                    label="SNW"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.SNW}
                                    style={{ display: 'inline-block' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>
                                <Form.Item
                                    name={['event', 'SNH']}
                                    label="SNH"
                                    rules={[
                                        {
                                            required: false,
                                        }

                                    ]}
                                    initialValue={data.SNH}
                                    style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label="" style={{ marginBottom: 0 }}>
                                <Form.Item
                                    name={['event', 'NumberW']}
                                    label="NumberW"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={data.NumberW}
                                    style={{ display: 'inline-block' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>
                                <Form.Item
                                    name={['event', 'NumberH']}
                                    label="NumberH"
                                    rules={[
                                        {
                                            required: false,
                                        }

                                    ]}
                                    initialValue={data.NumberH}
                                    style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                name={['event', 'NumberMessage']}
                                label="NumberMessage"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ]}
                                initialValue={data.NumberMessage}
                            >
                                <Input />
                            </Form.Item>
                            
                            <Form.Item
                                name={['event', 'Message']}
                                label="Message"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ]}
                                initialValue={data.Message}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                   Save Inviter
                                </Button>
                            </Form.Item>
                        </Form>:''}
                        <Row>
                        <Button type="primary"  onClick={() => history.goBack()}>
                                   GoBack 
                                </Button>
                        </Row>

                    </Card>
                </Spin>
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

export default connect("", mapDispatchToProps)(AddSaveInviter);