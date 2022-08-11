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
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Meta } = Card;

const AddPartyHall = (props) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(values)
        setMessage("")
        setLoading(true)

        //let url='https://hayyacom.net/WhatsappInvitation/hayyacom/events/create'
        let url = `${API_URL}/partyhall/create`

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
                    <Breadcrumb.Item>CREATING PARTYHALL</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                    <Form name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>

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
                            name={['event', 'city']}
                            label="city"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Select defaultValue="HafrAlbatin" style={{ width: 120 }} >
                                <Option value="HafrAlbatin">HafrAlbatin</Option>
                                <Option value="Albaha">Albaha</Option>
                                <Option value="Alqasim">Alqasim</Option>
                                <Option value="Abha & KhamisMushit">Abha & KhamisMushit</Option>
                                <Option value="Alqatif & Sihat">Alqatif & Sihat</Option>
                                <Option value="Aldawadmi">Aldawadmi</Option>
                                <Option value="Yanbu">Yanbu</Option>
                                <Option value="Riyadh">Riyadh</Option>
                                <Option value="Alkarj">Alkarj</Option>
                                <Option value="AlThuraya">AlThuraya</Option>
                                <Option value="Kuwit">Kuwit</Option>
                                <Option value="Alahsa">Alahsa</Option>
                                <Option value="Tabuk">Tabuk</Option>
                                <Option value="AlAmmariah">AlAmmariah</Option>
                                <Option value="Albajadiah">Albajadiah</Option>
                                <Option value="Alafif">Alafif</Option>
                                <Option value="Alkhafji">Alkhafji</Option>
                                <Option value="Abudabi">Abudabi</Option>
                                <Option value="Dubia">Dubia</Option>
                                <Option value="Altaif">Altaif</Option>
                                <Option value="Almajmaah">Almajmaah</Option>
                                <Option value="AlDammam">AlDammam</Option>
                                <Option value="AlDahran">AlDahran</Option>
                                <Option value="Alkubar">Alkubar</Option>
                                <Option value="Hail">Hail</Option>
                                <Option value="Alkhafji">Alkhafji</Option>
                                <Option value="Makkah">Makkah</Option>
                                <Option value="Almadinah">Almadinah</Option>
                                <Option value="Taif">Taif</Option>
                                <Option value="Abha">Abha</Option>
                                <Option value="Dammam">Dammam</Option>
                                <Option value="Dawadmi">Dawadmi</Option>
                                <Option value="Jizan">Jizan</Option>
                                <Option value="alahsaa">alahsaa</Option>
                                <Option value="Alzulfi">Alzulfi</Option>
                                <Option value="Alkharj">Alkharj</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['event', 'country']}
                            label="country"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['event', 'locationURL']}
                            label="locationURL"
                            rules={[
                                {
                                    required: false
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add PartyHall
                            </Button>
                        </Form.Item>
                    </Form>
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

export default connect("", mapDispatchToProps)(AddPartyHall);