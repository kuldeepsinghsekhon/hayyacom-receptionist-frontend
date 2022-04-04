import styled from "styled-components"
import AddContacts from "../components/AddContacts"
import ContactsList from "../components/ContactsList"
import UploadContacts from "../components/UploadContacts"
import { Row, Col} from 'antd';
const ContactButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
`

const Contacts = (props) => {
      
    return (
        <Row>
        <Col span={24}>
        <UploadContacts />
            <ContactButtonsContainer>
                <AddContacts />
            </ContactButtonsContainer>
            <ContactsList />
                  
       </Col>
      </Row>
		
    )
}

export default Contacts;