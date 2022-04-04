import React, { useState, useEffect } from 'react';
//import QRCode from "react-qr-code";
import { Card, Col, Row } from 'antd';
import {getInvitationStats} from "../api/contacts"
import Alerts from "./Alert"
import styled from 'styled-components';
//const { Meta } = Card;

const CardsContainer = styled.div`
    padding-bottom: 30px;
`

const Stats = (props) => {
    const [data,  setData] = useState({})
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');
    useEffect(()=>{
        let userData = JSON.parse(localStorage.getItem("loginUser"))
        getInvitationStats(userData.id).then(res => {
            const {data} = res
			console.log( data)
            setData(data)
        }).catch(err => {
            console.log( err, "err")
            setMessageType('error')
            setMessage("Something went wrong please try again !!")
        })
    }, [])

    return (
        <CardsContainer>
            {message && <Alerts type={messageType} message={message}/>}
            <div className="site-card-wrapper">
                <Row gutter={16}>
    		<Col span={5}>
                    <Card title="Total GuestAllowed" bordered={false}>
                    {data && data.totalGuestAllowed}
                    </Card>
                </Col>
		<Col span={4}>
                    <Card title="Remaining " bordered={false}>
                    {data && data.totalGuestAllowed-data.totalCount}
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="Accepted" bordered={false}>
                        {data && data.acceptCount}
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="Declined" bordered={false}>
                    {data && data.declinedCount}
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="No Response" bordered={false}>
                    {data && data.nullCount}
                    </Card>
                </Col>
                </Row>
            </div>
        </CardsContainer>
    )
}

export default Stats;