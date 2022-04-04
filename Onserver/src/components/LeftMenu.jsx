import React from 'react';
import { Menu } from 'antd';
import {setActiveTab} from "../actions/User"
import { connect } from 'react-redux';

const LeftMenu = (props) => {
    const setTab = (type) => {
        props.setActiveTab(type)
    }
    return (
        <Menu mode={props.type} defaultSelectedKeys={[props.activeTab]}>
		
            <Menu.Item key="dashboard" onClick={()=>setTab("dashboard")}>
                <a href="#">Dashboard</a>
            </Menu.Item>
            <Menu.Item key="contacts" onClick={()=>setTab("contacts")}>
                <a href="#">Contacts</a>
            </Menu.Item>
        </Menu>
    );
}

const mapDispatchToProps = dispatch => ({
    setActiveTab : (data) => dispatch(setActiveTab(data))
})
  
function mapStateToProps(state) {
    return {
        activeTab: state.UserReducer.activeTab,
    };
}

export default connect( mapStateToProps, mapDispatchToProps)(LeftMenu);