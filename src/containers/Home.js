/* eslint-disable import/first */
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import Navbar from "../components/Navbar"
import { connect } from 'react-redux';
import Contacts from "./Contacts";
import Dashboard from "./Dashboad"
import { Helmet } from 'react-helmet';

const Home = (props) => {
    const loadContent = () => {
        if(props.activeTab === 'contacts')
            return <Contacts />
        if(props.activeTab === 'dashboard')
            return <Dashboard />
    }
    return (
        <Layout>
		<Helmet titleTemplate="%s - Hayacom " defaultTitle="Hayacom ">
      <meta name="description" content="Hayacom WhatsApp Invitaions" />
    </Helmet>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Navbar />
            </Header>
            <Content className="site-layout" >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                {loadContent()}
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>All right reserved © Hayyacom 2016-2021</Footer>
        </Layout>
    )
}
  
function mapStateToProps(state) {
    return {
        activeTab: state.UserReducer.activeTab,
    };
}

export default connect( mapStateToProps)(Home);