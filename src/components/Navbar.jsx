import React, { useState } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import { Drawer, Button,Image} from 'antd';
import logo from '../logo.png';

const Navbar = (props) => {
    const [visible, setvisible] =  useState(false)
    const showDrawer = () => {
        setvisible(true)
    };
    const onClose = () => {
        setvisible(false)
    };
    return (
        <nav className="menuBar">
            <div className="logo">
			  
            </div>
            <div className="menuCon">
                <div className="leftMenu">    
                    <LeftMenu type="horizontal"/>
                </div>
                <div className="rightMenu">
                    <RightMenu type="horizontal"/>
                </div>
                <Button className="barsMenu" type="primary" onClick={()=>showDrawer()}>
                    <span className="barsBtn"></span>
                </Button>
                <Drawer
                    title="Hayyacom"
                    placement="right"
                    closable={true}
                    onClose={()=>onClose()}
                    visible={visible}
                >
                    <LeftMenu type="inline"/>
                    <RightMenu type="inline"/>
                </Drawer>
            </div>
        </nav>
    );
}
export default Navbar;
