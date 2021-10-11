import React, {useState} from 'react'
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {saveUserData} from "../actions/User";
import {loginApi} from "../api/login";
import Loader from "./Loader";
import Alerts from "./Alert";
import PhoneInput from 'react-phone-input-2';


const LoginContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoginContent = styled.div`
    padding: 50px;
    box-shadow: 3px 4px 10px #9c9999;
    text-align: center;
`
const SignupLink = styled.a`
    padding: 10px;
`
const Heading = styled.h1`
    margin-bottom : 15px;
`
const Login = (props) => {

    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    const onFinish = (values) => {
        setMessage("")
        setLoading(true)
        loginApi(values)
        .then(res => {
            setLoading(false)
            setMessageType('success')
            const { data, token } = res;
            localStorage.setItem('loginUser', JSON.stringify(data));
            localStorage.setItem('token', token);
            props.saveUserData(data)
            props.history.push('/home');
        })
        .catch(err => {
            console.log("err", err)
            const {message} = err.message
			console.log(err);
            setMessageType('error')
            setMessage(message)
            setLoading(false)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <LoginContainer>
        {isLoading && <Loader />}
        {message && <Alerts type={messageType} message={message}/>}
        <LoginContent>
            <Heading>Login</Heading>  
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="phone Number"
                name="phoneNumber"
                rules={[
                    {
                        required: true,
                        message: 'Please input your number!',
                    }
                ]}
            >
                <PhoneInput
                    country={'sa'}
                />
            </Form.Item>

            <Form.Item
                label="password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'test',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
            </Form>
            {/* <SignupLink href="/signup" >Not a member yet! Signup</SignupLink> */}
        </LoginContent>
        </LoginContainer>
    );
};

const mapDispatchToProps = dispatch => ({
  saveUserData : (data) => dispatch(saveUserData(data))
 })

export default connect( "", mapDispatchToProps)(Login);
