import React, { useState } from 'react';
import { Menu,Radio } from 'antd';
import ar_EG from 'antd/lib/locale/ar_EG';
import en_US from 'antd/lib/locale/en_US';
import moment from 'moment';
import instagram from '../Instagram.png';
import whatsapp from '../whatsapp.png';
import hayyacom from '../hayyacom.png';
const RightMenu = (props) => {
	    const [locale, setlocale] =  useState("en")

    const logout = () => {
      localStorage.removeItem('loginUser')
	  localStorage.removeItem('token')
    }
	const  changeLocale = () => {
    setlocale("en")
  };
  
    return (
      <Menu mode={props.type} >        
		 <Menu.Item key="Instagram">
		 <a href="https://www.instagram.com/hayyacomapp/"><img src={instagram} className="social-icons" /></a>
		</Menu.Item>
				 <Menu.Item key="Website">
		 <a href="https://www.hayyacom.com/"><img src={hayyacom} className="social-icons" /></a>
		</Menu.Item>
				 <Menu.Item key="Whatsapplink">
		 <a href="https://wa.me/966545676539" ><img src={whatsapp} className="social-icons" /></a>
		</Menu.Item>
<Menu.Item key="signout">
          <a href="./login" onClick={()=>logout()}>Sign Out</a>
        </Menu.Item>          
          <Radio.Group value={locale} onChange={()=>changeLocale}>
            <Radio.Button key="en" value={en_US}>
              English
            </Radio.Button>
            <Radio.Button key="cn" value={ar_EG}>
              عربى
            </Radio.Button>
          </Radio.Group>
        
      </Menu>
    );
}

export default RightMenu;