import React, { useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { saveGuestlists, removeGuestlist } from "../actions/Guestlist"
import { getGuestlistsApi, deleteguestlistApi } from "../api/guestlists"
import { connect } from 'react-redux';
import { Modal, Table, Space, Input, Tag, Button, Layout, Row, Col } from 'antd';
import Loader from "./Loader"
import Alerts from "./Alert"
import { APP_URL } from '../constant';
const { Column } = Table;


const GuestList = (props) => {

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
    })
    useEffect(() => {
        let { match: { params } } = props;
        let invitermobile = params?.invitermobile ? params?.invitermobile : '98';
        setLoading(true)
        let postdata = { invitermobile: invitermobile }
        getGuestlistsApi(postdata.invitermobile).then(res => {
            const { data } = res
            console.log('getGuestlistsApi',props)
            props.SaveGuestlists(data)
            setLoading(false)
        }).catch(err => {
            console.log(err, "err")
            // const {message} = err.response.data
            const { message } = err
            setMessageType('error')
            setMessage(message)
            setLoading(false)
        })

    }, [])




    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (

            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        let searchInput = node;
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
        /*     onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => searchInput.select(), 100);
              }
            }, */
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

    const handleReset = clearFilters => {
        clearFilters();
        setState({ searchText: '' });
    };


    const columns = [

        // {
        //     title: (props.locale == 'en' ? 'totalperguest' : 'الاسم'),
        //     dataIndex: 'totalperguest',
        //     key: 'guestname',
        //     ...getColumnSearchProps('guestname'),
        //     sorter: (a, b) => a.guestname?.localeCompare(b.guestname ? b.guestname : ''),

        //     width: 100,
        // },
        // {
        //     title: (props.locale == 'en' ? "totalperguest" : 'رقم الجوال'),
        //     dataIndex: 'totalperguest',
        //     key: 'totalperguest',
        //     ...getColumnSearchProps('totalperguest'),
        //     sorter: (a, b) => a.totalperguest?.localeCompare(b.totalperguest ? b.totalperguest : ''),

        //     width: 70,
        //  },
        // {
        //     title: (props.locale == 'en' ? "Action" : 'الإجراءات'),
        //     key: "action",
        //     render: (text, record) => (
        //         <Space size="middle" key={record.id} >
        //             Delete
        //         </Space>
        //     ),
        //     width: 100,
        // }
    ];

    let dataSource = props?.guestlists?.map(guestlist => guestlist)
    console.log('dataSource',props.guestlists)
    return (
        <div className="site-layout" >
            {/* {isLoading && <Loader />} */}
            {message && <Alerts type={messageType} message={message} />}
            <Row>
                <Col span={24}>
                     {/* <Table dataSource={dataSource} columns={columns} scroll={{ x: 700 }} />  */}
                     <Table dataSource={dataSource}      scroll={{ x: 1000 }}>
                <Column title="id" dataIndex="SN" key="SN" />
                <Column title="guestname" dataIndex="guestname" key="guestname" />

</Table>
                </Col>
            </Row>
        </div >
    )

}

const mapStateToProps = (state) => {
    return {
        guestlists: state.GuestlistReducer.guestlists,
        locale: 'en',
    };
}

const mapDispatchToProps = dispatch => ({
    SaveGuestlists: (data) => dispatch(saveGuestlists(data)),
    RemoveGuestlist: (id) => dispatch(removeGuestlist(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(GuestList);