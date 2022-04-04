const INITIAL_STATE = {
    receptionist: {},
    activeTab: "dashboard",
    receptionists: []
}

const ReceptionistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SAVE_RECEPTIONIST_DATA':
            return {
                ...state,
                "receptionist": action.payload
            }
        break;
        case "SET_ACTIVE_TAB":
            return {
                ...state,
                "activeTab": action.payload
            }
        break;
        case "SAVE_RECEPTIONIST":
            return {
                ...state,
                "receptionists": action.payload
            }
        break;
        case "ADD_NEW_RECEPTIONIST": {
            let {receptionists} = state
            const checkId = receptionists.filter(receptionist => receptionist.id === action.payload.id)
            if(!checkId.length){
                receptionists.push(action.payload)
                return {
                    ...state,
                    "receptionists": [...receptionists]
                }
            }
        }
        break;
        case "ADD_NEW_RECEPTIONIST_BULK": {
            let {receptionists} = state
            receptionists = receptionists.concat(action.payload)
            return {
                ...state,
                "receptionists": [...receptionists]
            }
        }
        break;
        case "REMOVE_RECEPTIONIST": {
            let {receptionists} = state
            const checkId = receptionists.findIndex(receptionist => receptionist.id === action.payload)
            if(checkId > -1){
                receptionists.splice(checkId, 1)
                return {
                    ...state,
                    "receptionists": [...receptionists]
                }
            }
        }
        break;  
        case "EDIT_RECEPTIONIST": {
            let {receptionists} = state
            const checkId = receptionists.findIndex(contact => contact.id === action.payload.id)
            if(checkId > -1){
                receptionists.splice(checkId, 1, action.payload)
                return {
                    ...state,
                    "receptionists": [...receptionists]
                }
            }
        }
        break;
        
     default:
      return ReceptionistReducer
    }
}
export default ReceptionistReducer