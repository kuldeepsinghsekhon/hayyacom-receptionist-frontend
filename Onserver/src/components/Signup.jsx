import React from 'react'
import { Form, Input, Button, Select, InputNumber } from 'antd';
import validateMessages from "../utils/validationMessages"
import styled from 'styled-components'
const { Option } = Select;

const SignupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SignupContent = styled.div`
    padding: 50px;
    box-shadow: 3px 4px 10px #9c9999;
    text-align: center;
`
const LoginLink = styled.a`
    padding: 10px
`
const Heading = styled.h1`
    margin-bottom : 15px
`

const Signup = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  
  return (
    <SignupContainer>
      <SignupContent>
        <Heading>Register</Heading>  
        <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'name']}
                label="Name"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                {
                    type: 'email',
                },
                {
                    required: true,
                }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Select
                placeholder="Select a option and change input text above"
                allowClear
                >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={['user', 'age']}
                label="Age"
                rules={[
                {
                    type: 'number',
                    min: 18,
                    max: 99,
                    required:true
                },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
        <LoginLink href="/login">Already a member! Signin</LoginLink>
      </SignupContent>
    </SignupContainer>
  );
};

export default Signup