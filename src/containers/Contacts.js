import styled from "styled-components"
import AddContacts from "../components/AddContacts"
import ContactsList from "../components/ContactsList"
import UploadContacts from "../components/UploadContacts"

const ContactButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
`

const Contacts = (props) => {
      
    return (
        <div>
		<UploadContacts />
            <ContactButtonsContainer>
                <AddContacts />
            </ContactButtonsContainer>
            <ContactsList />
        </div>
    )
}

export default Contacts;