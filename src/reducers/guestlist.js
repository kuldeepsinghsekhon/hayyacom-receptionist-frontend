const INITIAL_STATE = {
    guestlist: {},
    activeTab: "dashboard",
    guestlists: []
}

const GuestlistsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SAVE_GUESTLIST_DATA':
            return {
                ...state,
                "guestlist": action.payload
            }
        break;
        case "SET_ACTIVE_TAB":
            return {
                ...state,
                "activeTab": action.payload
            }
        break;
        case "SAVE_GUESTLIST":
            console.log('action.payload',action.payload)
            return {
                ...state,
                "guestlists": action.payload
            }
        break;
        case "ADD_NEW_GUESTLIST": {
            let {guestlists} = state
            const checkId = guestlists.filter(guestlist => guestlist.id === action.payload.id)
            if(!checkId.length){
                guestlists.push(action.payload)
                return {
                    ...state,
                    "guestlists": [...guestlists]
                }
            }
        }
        break;
        case "ADD_NEW_GUESTLIST_BULK": {
            let {guestlists} = state
            guestlists = guestlists.concat(action.payload)
            return {
                ...state,
                "guestlists": [...guestlists]
            }
        }
        break;
        case "REMOVE_GUESTLIST": {
            let {guestlists} = state
            const checkId = guestlists.findIndex(guestlist => guestlist.SN === action.payload)
            if(checkId > -1){
                guestlists.splice(checkId, 1)
                return {
                    ...state,
                    "guestlists": [...guestlists]
                }
            }
        }
        break;  
        case "EDIT_GUESTLIST": {
            let {guestlists} = state
            const checkId = guestlists.findIndex(contact => contact.id === action.payload.id)
            if(checkId > -1){
                guestlists.splice(checkId, 1, action.payload)
                return {
                    ...state,
                    "guestlists": [...guestlists]
                }
            }
        }
        break;
        
     default:
      return GuestlistsReducer
    }
}
export default GuestlistsReducer