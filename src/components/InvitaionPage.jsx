import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import QRCode from "react-qr-code";
import { Modal } from 'antd';
import {getInvitationDetail, updateInvitation} from "../api/contacts"
import Alerts from "./Alert"
import { Card } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Layout, Menu, Breadcrumb } from 'antd';
import logo from '../logo.png';
import TopNavbar from "./TopNavbar";
const { Header, Content, Footer ,Sider} = Layout;


const { Meta } = Card;

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const QRContainer = styled.div`
    display: flex;
    justify-content: center;
`

const InfoContainer = styled.div`
    text-align: center;
    padding: 10px;
    font-size: 18px;
`
const InviteImage = styled.img`
    max-width: 100%;
    width: 100%;
`
const InviteBody = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
	left:0;
`

const InvitationPage = (props) => {
    const [visible, setVisible] = useState(false);
    const [invite,  setInvite] = useState({})
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');
    useEffect(()=>{
        const { match: { params } } = props;

        getInvitationDetail(params.id).then(res => {
            const {data} = res
            setInvite(data)
        }).catch(err => {
            console.log( err, "err")
            setMessageType('error')
            setMessage("Something went wrong please try again !!")
        })
    }, [])

    useEffect(()=>{
       if (invite.event) {
        let elm = document.createElement("style")
        elm.innerHTML = `@font-face {
            font-family: myFont;
            src: url(${invite.event.fontUrl});
        }`
        document.head.appendChild(elm)
        return ()=>{
            document.head.removeChild(elm)
        }
       }
    }, [invite])

    const invitationAction = (type) => {
        let data = {
            id: invite.id,
            status: type
        }
        updateInvitation(data).then(res => {
            setMessageType('success')
            setMessage("Thanks for your response !!")
            if(type === "Accepted"){
                setVisible(true)
            }
        }).catch(err => {
            setMessageType('error')
            setMessage("Something went wrong please try again !!")
        })
    }
	   const renderChildrenMessage = () => {
      if (invite.contact && invite.contact.totalChildren>0) {
       return  <div>   <label>Childrens</label>: <span>{invite.contact && invite.contact.totalChildren || 0}</span></div>
      } else {
        return <span></span>;
      }
    }
 
    return (
		
	<Layout className="layout">
	
    <Header>
	<TopNavbar/>	  
    </Header>
	
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Invitation</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
            {message && <Alerts type={messageType} message={message}/>}
            <Card
                style={{ width: "100%" }}
                cover={
                <img
                    alt="example"
                    src={invite.event ? invite.event.invitationLink : ""}
                />
                }
                actions={[
                    <div onClick={()=> invitationAction("Accepted")}> <CheckOutlined /> <span>Accept</span></div>,

                    <div onClick={()=> invitationAction("Rejected")}> <CloseOutlined /> <span>Reject</span></div>
                ]}
            >
                <Meta
                    
                   description={invite.event ? invite.event.description : ""}
                />
            </Card>
            <Modal
                title="Please save QR code"
                centered
                visible={visible}
                onCancel={()=>setVisible(false)}
                footer={[]} 
            >
                <InviteImage src={invite.event ? invite.event.entranceLink:''} />
                <InviteBody className="invitebody">
                    <QRContainer><QRCode size={90} value={invite && invite.id}  fgColor={invite.event?invite.event.color:'fff'} /></QRContainer>
                    <InfoContainer style={{color: (invite.event ? invite.event.color:"#bebebe"), fontFamily:"myFont"}}>
					    
                        <div>
                            <span>{invite.contact && invite.contact.name || ""}</span>
                        </div>
                        <div>
                            <label>Total Guests</label>: <span>{invite.contact && invite.contact.totalGuest || ""}</span>
                        </div>
                        <div>

                        </div>{renderChildrenMessage()}
                    </InfoContainer>
                </InviteBody>
            </Modal>

	  </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
	<p> For more information  and customer support contact us via <a href="https://wa.me/966545676539">Whatsapp</a> </p>
	All right reserved © Hayyacom 2016-2021
	
	</Footer>
  </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        invitations: state.InvitationReducer.invitations,
    };
}

const mapDispatchToProps = dispatch => ({
    // SaveInvitations : (data) => dispatch(saveInvitations(data)),
    // RemoveContact: (id) => dispatch(removeContact(id))
})
export default connect( mapStateToProps, mapDispatchToProps)(InvitationPage);