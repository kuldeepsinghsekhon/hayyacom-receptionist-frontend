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

const AddMobileEvent = (props) => {
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
            let host_url = `${API_URL}/partyhall/search`
            axios.post(host_url, postdata).then(d => {
                console.log(d)
                if (currentValue === value) {
                    const result = d?.data?.data;
                    const data = [];
                    result.forEach(r => {
                        console.log(r)
                        data.push({
                            value: r.id,
                            text: r.name,
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
    const onFinish = async (values) => {
        console.log(values)
        setMessage("")
        setLoading(true)
        console.log('values.event.date',values.event.date)
        let fdate=moment.utc(values.event.date, 'MM-DD-YYYY').format("YYYY-MM-DD")
        console.log('fdae',fdate)
        values.event.date =fdate;// values.event.date.format("YYYY/MM/DD")
console.log(values.event)
        let url = `${API_URL}/hayyacom/events/create`

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
            props.history.push(`/receptionists/hayyacom/addinviter_preview/${ev.id}`)
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
                    <Form name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>

                        <Form.Item
                            name={['event', 'eventtitle']}
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
                            name={['event', 'partyhallid']}
                            label="partyhallid"
                            rules={[
                                {
                                    required: true,
                                }
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
                            name={['event', 'totalguest']}
                            label="totalguest"
                            rules={[
                                {
                                    required: true
                                },
                            ]}
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
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="DatePicker" name={['event', 'date']}
                            label="Event Date"

                            rules={[
                                {
                                    required: true,
                                }
                            ]}>
                            <DatePicker disabledDate={disabledDate} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                NEXT PREVIEW INVITER
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

export default connect("", mapDispatchToProps)(AddMobileEvent);