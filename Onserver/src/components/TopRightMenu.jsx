import React, { useState } from 'react';
import { Menu,Radio } from 'antd';
import moment from 'moment';
import instagram from '../Instagram.png';
import whatsapp from '../whatsapp.png';
import hayyacom from '../hayyacom.png';
const TopRightMenu = (props) => {
    return (
      <Menu mode={props.type} >    
	  <Menu.Item key="receptionists">
		 <a href={`https://hayyacom.net/AdminsLogin `}>AdminsLogin</a>
		</Menu.Item>
<Menu.Item key="receptionists">
		 <a href={`${process.env.PUBLIC_URL}/`}>Receptionists</a>
		</Menu.Item>
		
<Menu.Item key="hayyacomevents">
		 <a href={`${process.env.PUBLIC_URL}/hayyacom/events/`}>Hayyacom Events</a>
		</Menu.Item>
		<Menu.Item key="addevent">
		 <a href={`${process.env.PUBLIC_URL}/hayyacom/addevent/`}>Hayyacom Create Events</a>
		</Menu.Item>
		<Menu.Item key="inviter_search">
		 <a href={`${process.env.PUBLIC_URL}/hayyacom/inviter_search`}>Hayyacom Search</a>
		</Menu.Item>
		<Menu.Item key="inviter_search">
		 <a href={`${process.env.PUBLIC_URL}/hayyacom/addpartyhall`}>Addpartyhall</a>
		</Menu.Item>
<Menu.Item key="whatsapp">
		 <a href={`${process.env.PUBLIC_URL}/whatsapp/events/`}>whatsapp Events</a>
		</Menu.Item>		
		 <Menu.Item key="Instagram">
		 <a href="https://www.instagram.com/hayyacomapp/"><img src={instagram} className="social-icons" /></a>
		</Menu.Item>
				 <Menu.Item key="Website">
		 <a href="https://www.hayyacom.com/"><img src={hayyacom} className="social-icons" /></a>
		</Menu.Item>
				 <Menu.Item key="Whatsapplink">
		 <a href="https://wa.me/966545676539" ><img src={whatsapp} className="social-icons" /></a>
		</Menu.Item>     
      </Menu>
    );
}

export default TopRightMenu;