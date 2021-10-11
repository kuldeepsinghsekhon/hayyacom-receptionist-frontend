const INITIAL_STATE = {
    hayyacomEvent: {},
    activeTab: "dashboard",
    hayyacomEvents: [],
	receptionists:[]
}

const HayyacomEventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_ACTIVE_TAB":
            return {
                ...state,
                "activeTab": action.payload
            }
        break;
        case "SAVE_HAYYACOMEVENTS":
            return {
                ...state,
                "hayyacomEvents": action.payload
            }
        break;
		case "SAVE_CITY_RECEPTIONISTS":
            return {
                ...state,
                "receptionists": action.payload
            }
        break;
        case "ADD_NEW_HAYYACOMEVENT": {
            let {hayyacomEvents} = state
            const checkId = hayyacomEvents.filter(hayyacomEvent => hayyacomEvent.id === action.payload.id)
            if(!checkId.length){
                hayyacomEvents.push(action.payload)
                return {
                    ...state,
                    "hayyacomEvents": [...hayyacomEvents]
                }
            }
        }
        break;
        
        case "REMOVE_HAYYACOMEVENT": {
            let {hayyacomEvents} = state
            const checkId = hayyacomEvents.findIndex(hayyacomEvent => hayyacomEvent.id === action.payload)
            if(checkId > -1){
                hayyacomEvents.splice(checkId, 1)
                return {
                    ...state,
                    "hayyacomEvents": [...hayyacomEvents]
                }
            }
        }
        break;  
        case "EDIT_HAYYACOMEVENT": {
            let {hayyacomEvents} = state
            const checkId = hayyacomEvents.findIndex(hayyacomEvent => hayyacomEvent.id === action.payload.id)
            if(checkId > -1){
                hayyacomEvents.splice(checkId, 1, action.payload)
                return {
                    ...state,
                    "hayyacomEvents": [...hayyacomEvents]
                }
            }
        }
        break;
        
     default:
      return HayyacomEventReducer
    }
}
export default HayyacomEventReducer