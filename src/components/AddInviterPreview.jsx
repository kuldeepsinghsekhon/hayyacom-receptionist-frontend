import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, DatePicker, Card, Select, InputNumber, Spin,Row, Col, Modal, Layout, Menu, Breadcrumb } from 'antd';
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
const AddInviterPreview = (props) => {
    let history = useHistory();
    const [visible, setVisible] = useState(false);
    const [showmodal, setShowmodal] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [base64image, setBase64image] = useState('');
    const { match: { params } } = props;
    const eventid=params.eventid
    const [prviewid, setPrviewid] = useState(0);
    const [hevent, setHevent] = useState({});
    const [form] = Form.useForm();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const [selectedEvent, setSelectedEvent] = useState();
    let timeout;
    let currentValue;
   
    const [value, setValue] = useState(undefined);

    useEffect(async() => {
        let url = `${API_URL}/hayyacom/invitors/${eventid}`
let result = await axios({
            method: 'get',
            url: url,
            headers: {  "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json', 
        }
        });
         result = result?.data;
         setHevent(result.data)
    }, [])
    const handleImagePreview = async (res_data) => {

        setLoading(true)
        let url = `${API_URL}/invitations/preview_invitation`

        let postData = {"id":res_data.data.id, "eventid": res_data.data.eventid, "mobileNumber": res_data.data.mobile, "SN": "22", "name": "Test Namme", "childrenperguest": "2", "guests": "2" }

        let result = await axios({
            method: 'post',
            url: url,
            data: postData,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            }
        });
        result = result?.data;
        console.log('result?.data',result.image)
        setBase64image(result.image)
        setLoading(false)
        setShowmodal(true)
    };


    const onFinish = async (values) => {

        setMessage("")
        setLoading(true)
        values.event.date = values?.event?.date?.format("DD/MM/YYYY")
        const formData = new FormData();

        formData.append('file', selectedFile);
        formData.append("document", JSON.stringify(values.event));

        // formData.append('eventtitle'values.event)
        //        
        // formData.append('image', bannerImage)
        // formData.append('name', bannerName)
        //let url='https://hayyacom.net/WhatsappInvitation/hayyacom/events/create'
        let url = `${API_URL}/hayyacom/invitors/create_inviter_preview`

         axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            // addEventsApi(values.event)
            .then(res => {
                console.log('res.data',res.data)
                setPrviewid(res.data.id)
                handleImagePreview(res)
                setLoading(false)
                setMessageType('success')
               // setVisible(false)
                //form.resetFields();
               
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
    const layout = {

        wrapperCol: {
            span: 12,
        },
    };

    
// Change this to target your element and add it wherever you need it to appear
//document.modalimage.appendChild(iosImg);
    return (
        <Layout className="layout">

            <Header>
                <TopNavbar />
            </Header>

            <Content style={{ padding: '0 50px' }}>
                <Spin spinning={isLoading} delay={500}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Invitation</Breadcrumb.Item>
                    </Breadcrumb>

                    <Card>
                        <Modal
                            title={'Invitation Preview'}
                            centered
                            visible={showmodal}
                            onCancel={() => setShowmodal(false)}
                            footer={[]}
                        >
											
											<InviteImage src={base64image+'?'+Math.random()} />
                            {/* <InviteImage src="https://hayyacom.net/public/photo/iflowerinvitation/entrance555.jpg"/> */}
                        </Modal>


                    <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} layout="vertical" validateMessages={validateMessages}>

                            <input type="file" name="file" onChange={changeHandler} />
                            {isFilePicked ? (
                                <div>
                                    <p>Filename: {selectedFile.name}</p>
                                    <p>Filetype: {selectedFile.type}</p>
                                    <p>Size in bytes: {selectedFile.size}</p>
                                   
                                </div>
                            ) : (
                                <p>Select a file to show details</p>
                            )}
                            <Form.Item
                                name={['event', 'name']}
                                label="name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                               
                                                               
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
                               initialValue={eventid}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name={['event', 'LocationURL']}
                                label="LocationURL"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ]}
                               
                            >
                                <Input />
                            </Form.Item>
                            <p>packagetype {hevent?.packagetype}</p>
                            <Form.Item label="QR Settings" style={{ marginBottom: 0 }}>

                                <Form.Item
                                    name={['event', 'QRcolor']}
                                    label="QRcolor"
                                    rules={[
                                        {
                                            required: false,
                                        }
                                    ]}
                                    initialValue={'#333333'}
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
                                    initialValue={0.3}
                                  
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
                                    initialValue={0.3}
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
                                    initialValue={400}
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
                                    initialValue={'#333333'}
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
                                    initialValue={0.3}
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
                                    initialValue={0.3}
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
                                    initialValue={0.3}
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
                                    initialValue={0.3}
                                    style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                name={['event', 'numberMessage']}
                                label="numberMessage"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ]}
                                
                            >
                                <Input />
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
                                   // initialValue={data.NumberW}
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
                                   // initialValue={data.NumberH}
                                    style={{ display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px' }}
                                >
                                    <InputNumber min={0} max={100} />
                                </Form.Item>
                            </Form.Item>

   
                            

                            <Form.Item
                                name={['event', 'Message']}
                                label="Message"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ]}
                               
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Preview
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={()=>{ props.history.push(`/receptionists/hayyacom/save_inviter_preview/${prviewid}`)}}>
                                    Verify & Save
                                </Button>
                            </Form.Item>
                        </Form>
                        <Row>
                        <Button type="primary" onClick={() => history.goBack()}>
                                   Back To Event
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

export default connect("", mapDispatchToProps)(AddInviterPreview);