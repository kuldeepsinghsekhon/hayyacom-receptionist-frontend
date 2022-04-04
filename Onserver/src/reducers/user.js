const INITIAL_STATE = {
    user: {},
    activeTab: "dashboard",
    contacts: []
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SAVE_USER_DATA':
            return {
                ...state,
                "user": action.payload
            }
        break;
        case "SET_ACTIVE_TAB":
            return {
                ...state,
                "activeTab": action.payload
            }
        break;
        case "SAVE_USER_CONTACTS":
            return {
                ...state,
                "contacts": action.payload
            }
        break;
        case "ADD_NEW_CONTACT": {
            let {contacts} = state
            const checkId = contacts.filter(contact => contact.id === action.payload.id)
            if(!checkId.length){
                contacts.push(action.payload)
                return {
                    ...state,
                    "contacts": [...contacts]
                }
            }
        }
        break;
        case "ADD_NEW_CONTACT_BULK": {
            let {contacts} = state
            contacts = contacts.concat(action.payload)
            return {
                ...state,
                "contacts": [...contacts]
            }
        }
        break;
        case "REMOVE_CONTACT": {
            let {contacts} = state
            const checkId = contacts.findIndex(contact => contact.id === action.payload)
            if(checkId > -1){
                contacts.splice(checkId, 1)
                return {
                    ...state,
                    "contacts": [...contacts]
                }
            }
        }
        break;  
        case "EDIT_CONTACT": {
            let {contacts} = state
            const checkId = contacts.findIndex(contact => contact.id === action.payload.id)
            if(checkId > -1){
                contacts.splice(checkId, 1, action.payload)
                return {
                    ...state,
                    "contacts": [...contacts]
                }
            }
        }
        break;
        
     default:
      return state
    }
}
export default UserReducer