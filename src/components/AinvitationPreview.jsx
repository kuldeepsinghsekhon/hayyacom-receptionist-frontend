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

const { Meta } = Card;
const AinvitationPreview = (props) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [base64image, setBase64image] = useState('');
    
    useEffect(async() => {
        let url = `${API_URL}/invitations/preview_invitation`
        console.log(url)
let postData={ "eventid":"145", "mobileNumber":"599113731", "SN":"22","name":"name","childrenperguest":"2","guests":"2"}
console.log(postData)
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
    }, [base64image])

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
                    <Breadcrumb.Item>Add Event</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                {base64image ? <img src={`data:image/png;base64,${base64image}`}/>: ''}
               
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

export default connect("", mapDispatchToProps)(AinvitationPreview);