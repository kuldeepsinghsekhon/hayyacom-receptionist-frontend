import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Card, Select, InputNumber,Spin, Col, Modal, Layout, Menu, Breadcrumb } from 'antd';
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
const AddInviter = (props) => {
    const [visible, setVisible] = useState(false);
    const [showmodal, setShowmodal] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [base64image, setBase64image] = useState('');
    const [form] = Form.useForm();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    const [selectedEvent, setSelectedEvent] = useState();
    let timeout;
    let currentValue;
    const [data, setData] = useState([]);
    const [value, setValue] = useState(undefined);

    function fetch(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            const postdata = { code: 'utf-8', q: value }
            let host_url = `${API_URL}/hayyacom/events/search`
            axios.post(host_url, postdata).then(d => {
                    console.log(d)
                    
                    if (currentValue === value) {
                        const result = d?.data?.data;
                        const data = [];
                        result.forEach(r => {
                            console.log(r)
                            data.push({
                                value: r.id,
                                text: r.eventtitle,
                            });
                        });
                        callback(data);
                    }
                });
        }

        timeout = setTimeout(fake, 300);
    }

   const handleImagePreview=async(res_data) => {
 
    setLoading(true)
        let url = `${API_URL}/invitations/preview_invitation`
       
let postData={ "eventid":res_data.data.eventid, "mobileNumber":res_data.data.mobile, "SN":"22","name":"Test Namme","childrenperguest":"2","guests":"2"}

let result = await axios({
            method: 'post',
            url: url,
            data: postData,
            headers: {  "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json', 
        }
        });
         result = result?.data;
         //console.log('result?.data',result.image)
         setBase64image(result.image)
         setLoading(false)
         setShowmodal(true)
    };

    const handleSearch = value => {
        if (value) {
            fetch(value, data => setData(data));
        } else {
            setData([]);
        }
    };

    const handleChange = value => {
        setValue(value);
    };
   // const dateFormat = 'YYYY/MM/DD';
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    useEffect(() => {

    }, [])

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
        let url = `${API_URL}/hayyacom/invitors/create`

        await axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        // addEventsApi(values.event)
        .then(res => {
            handleImagePreview(res)
            setLoading(false)
            setMessageType('success')
            setVisible(false)
            //form.resetFields();
        })
        .catch(err => {
            console.log(err, "err")
          const {message} = err
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
    const options = data.map(d => <Option key={d.value}>{d.text}</Option>);
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
                         <InviteImage src={base64image ? `data:image/png;base64,${base64image}`: ''} />
{/* {base64image ? <img src={`data:image/png;base64,${base64image}`}/>: ''} */}
                    </Modal>


                    <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} layout="vertical" validateMessages={validateMessages}>
                        <input type="file" name="file" onChange={changeHandler} />
                        {isFilePicked ? (
                            <div>
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.type}</p>
                                <p>Size in bytes: {selectedFile.size}</p>
                                <p>
                                    lastModifiedDate:{' '}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </p>
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
                        >
                            <Select
                                showSearch
                                value={value}
                                //placeholder={props.placeholder}
                                //style={props.style}
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={handleSearch}
                                onChange={handleChange}
                                notFoundContent={null}
                            >
                                {options}
                            </Select>
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

                        <Form.Item label="QR Settings" style={{ marginBottom: 0 }}>

                            <Form.Item
                                name={['event', 'QRcolor']}
                                label="QRcolor"
                                rules={[
                                    {
                                        required: false,
                                    }
                                ]}
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
                                initialValue={0.35}
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
                                initialValue={0.62}
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
                                initialValue={430}
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
                                initialValue={'#8E6548'}
                                style={{ display: 'inline-block', width: 'calc(25% - 8px)' }}
                            >
                                <Input />
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
                                initialValue={1.0}
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
                                initialValue={1.9}
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
                                Submit & Preview
                            </Button>
                        </Form.Item>
                    </Form>
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

export default connect("", mapDispatchToProps)(AddInviter);