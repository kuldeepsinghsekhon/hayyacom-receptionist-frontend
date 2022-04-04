import React, { useState } from 'react';

import TopRightMenu from './TopRightMenu'
import { Drawer, Button,Image} from 'antd';
import logo from '../logo.png';

const TopNavbar = (props) => {
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
                <div className="rightMenu">
                    <TopRightMenu type="horizontal"/>
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
                   
                    <TopRightMenu type="inline"/>
                </Drawer>
            </div>
        </nav>
    );
}
export default TopNavbar;
