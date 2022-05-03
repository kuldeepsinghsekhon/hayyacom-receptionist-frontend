import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Card, Select, InputNumber, Modal, Layout, Menu, Breadcrumb, Row } from 'antd';
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

const InviterSearch = (props) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [form] = Form.useForm();
    let timeout;
    let currentValue;
    const [data, setData] = useState([]);
    const [inviterdata, setInviterdata] = useState([]);
    const [value, setValue] = useState(undefined);
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    function fetch(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            const postdata = { code: 'utf-8', q: value }
            let host_url = `${API_URL}/hayyacom/invitors/serach_by_mobile`
            axios.post(host_url, postdata).then(d => {
                console.log(d)
                if (currentValue === value) {
                    const result = d?.data?.data;
                    setInviterdata(result)
                    const data = [];
                    result.forEach(r => {
                        console.log(r)
                        data.push({
                            value: r,
                            text: r.mobile+' ( Event id '+r.eventid+' Name:'+r.name+' ) ',
                        });
                    });
                    callback(data);
                }
            });
        }

        timeout = setTimeout(fake, 300);
    }
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

    const options = data.map(d => <Option key={d.value}>{d.text}</Option>);
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
                    <Breadcrumb.Item>Search</Breadcrumb.Item>
                </Breadcrumb>

                <Card>
                <Form.Item
                            name={['event', 'partyhallid']}
                           // label="partyhallid"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                value={value}
                                placeholder={'phone number Or Event id Or Name'}
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
                  
                  {data?.map(d =><Row style={{border:'1px solid green',padding:'0.5rem',margin:'0.5rem',wordSpacing:'1rem'}} >
                       <p><label>Name:</label> {d?.value?.name}
                       <label> mobile:</label> {d?.value?.mobile}  
                       <label>EventId:</label> {d?.value?.eventid} 
                       <a href={`/receptionists/hayyacom/editinviter/${d?.value.eventid}/${d.value?.mobile}`}> EditInviter </a>
                        <a href={`/receptionists/hayyacom/editevent/${d?.value.eventid}`}> EditEvent </a>
                        <a href={`/receptionists/hayyacom/addinviter_preview/${d?.value.eventid}`}> AddMoreInviter </a>
                        
                       </p></Row>)}
                 
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

export default connect("", mapDispatchToProps)(InviterSearch);