import React, { useState, useEffect } from 'react';
import TopNavbar from "./TopNavbar";
import { Modal, Table,Breadcrumb, Space,Tabs,Layout,DatePicker ,Input, Button ,Row, Col,Tag} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {getHayyacomEventsApi} from "../api/hayyacomEvents"
import {saveEvents,saveUpcomingEvents,saveLastmonthsEvents, removeEvents} from "../actions/Event"
import {getEvents} from "../api/events"
import { connect } from 'react-redux';

import Loader from "./Loader"
import Alerts from "./Alert"
import { APP_URL } from '../constant';
import moment from 'moment';
//import AddReceptionist from "../components/AddReceptionist"
const { confirm } = Modal;
const { Column } = Table;
const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const WhatsappEventPage = (props) => {
    const [selectedHayyacomEvent, setSelectedHayyacomEvent] = useState({})
	const [visible, setVisible] = useState(false); 
	const [message, setMessage] = useState('');
	const [fromdate, setFromdate] = useState('2018-10-12');
	const [todate, setTodate] = useState('2018-10-12');
		const [value, setValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  })
   
   useEffect(()=>{
        setLoading(true)
        //let userData = localStorage.getItem("loginUser")
       // if(userData) {
           // userData = JSON.parse(userData)
            getEvents().then(res => {
                let {data,upcoming,lastmonths} = res		
                props.SaveEvents(data)
                props.SaveUpcomingEvents(upcoming)
                props.SaveLastmontsEvents(lastmonths)
                
                setLoading(false)
            }).catch(err => {
                console.log( err, "err")
               
            })
        //}
    }, []) 
	const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
	
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
          let  searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>

        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

 const  handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };
	
	const columns = [
	{
   title: "ID",
   dataIndex: 'id',
   key: 'id',
     ...getColumnSearchProps('id'),
  sorter: (a, b) =>a.id?.localeCompare(b.id?b.id:'') ,
  },
 {
   title:"title",
   dataIndex: 'title',
   key: 'title',
     ...getColumnSearchProps('title'),
  sorter: (a, b) =>a.title?.localeCompare(b.title?b.title:'') ,
  },
  
  {
   title: "type",
   dataIndex: 'type',
   key: 'type',
  sorter: (a, b) =>a.type?.localeCompare(b.type?b.type:'') ,
  },
  {
   title: "eventDate",
   dataIndex: 'eventDate',
   key: 'eventDate',
   ...getColumnSearchProps('eventDate'),
  //sorter: (a, b) =>a.eventDate?.localeCompare(b.eventDate?b.eventDate:'') ,
  },
  {
   title: "notes",
   dataIndex: 'notes',
   key: 'notes',
  //sorter: (a, b) =>a.eventDate?.localeCompare(b.eventDate?b.eventDate:'') ,
  },
  //record.partyhall.locationURL
  { title:"partyhall",
    dataIndex: 'partyhall',
   render: (partyhall) => partyhall?.name,
     // sorter: (a, b) =>(a.contact?.totalChildren)-(b.contact?.totalChildren),
  },
  { title:"locationURL",
    dataIndex: 'partyhall',
   render: (partyhall) => partyhall?.locationURL,
     // sorter: (a, b) =>(a.contact?.totalChildren)-(b.contact?.totalChildren),
  },
  { title:"city",
    dataIndex: 'partyhall',
   render: (partyhall) => partyhall?.city,
     // sorter: (a, b) =>(a.contact?.totalChildren)-(b.contact?.totalChildren),
  },

];
let  dataSource=props.events.map(contact=> contact)
let dataSourceUpcoming=props.upcoming.map(contact=>contact)
let dataSourceLastmonths=props.lastmonths.map(contact=>contact)
 return (
      
			<Layout>
		  <Header>
		<TopNavbar/>	  
		</Header>
			<Content className="site-layout" >
				<Row style={{ paddingLeft:24,paddingRight:24}}>		
			  <Col xs={24} sm={12} md={18} lg={18} xl={19}>
			  <Breadcrumb>
			  <Breadcrumb.Item>Receptionists</Breadcrumb.Item>
			<Breadcrumb.Item><a href="">Whatsapp Events</a></Breadcrumb.Item>
			</Breadcrumb>
			</Col>
      
</Row>
            {message && <Alerts type={messageType} message={message}/>}
            <Row>
		<Col span={24}>		
    <Tabs defaultActiveKey="1">	
    <TabPane tab={props.locale=='ar'?'Upcoming':'Upcoming'} key="1">
			 <Table dataSource={dataSourceUpcoming}   columns={columns} scroll={{ x: 200 }}   />
       </TabPane>
       <TabPane tab={props.locale=='ar'?'Last Monts':'Last Monts'} key="2">
			 <Table dataSource={dataSourceLastmonths}   columns={columns} scroll={{ x: 200 }}   />
       </TabPane>
       <TabPane tab={props.locale=='ar'?'ALL':'ALL'} key="3">
			 <Table dataSource={dataSource}   columns={columns} scroll={{ x: 200 }}   />
       </TabPane>
       </Tabs>
      </Col>      
         </Row>  
		 </Content>

		 <Footer style={{ textAlign: 'center' }}>All right reserved © Hayyacom 2016-2021</Footer>
		  </Layout>
        
    )	
   
   }

const mapStateToProps = (state) => {
    return {
        events: state.EventReducer.events,
        upcoming: state.EventReducer.upcoming,
        lastmonths:state.EventReducer.lastmonths
    };
}

const mapDispatchToProps = dispatch => ({
    SaveEvents : (data) => dispatch(saveEvents(data)),
    SaveUpcomingEvents : (data) => dispatch(saveUpcomingEvents(data)),
    SaveLastmontsEvents : (data) => dispatch(saveLastmonthsEvents(data)),
})
export default connect( mapStateToProps, mapDispatchToProps)(WhatsappEventPage);