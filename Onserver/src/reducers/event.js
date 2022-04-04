const INITIAL_STATE = {
    events: [],
    lastmonths: [],
    upcoming: [],
}

const EventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SAVE_USER_EVENTS":
            return {
                ...state,
                "events": action.payload
            }
        break;
        case "SAVE_USER_LASTMONTHS_EVENTS":
            return {
                ...state,
                "lastmonths": action.payload
            }
        break;
        case "SAVE_USER_UPCOMING_EVENTS":
            return {
                ...state,
                "upcoming": action.payload
            }
        break;
        case "ADD_NEW_EVENT": {
            let {events} = state
            const checkId = events.filter(event => event.id === action.payload.id)
            if(!checkId.length){
                events.push(action.payload)
                localStorage.setItem("event",action.payload)
                return {
                    ...state,
                    "events": [...events]
                }
            }
        }
        break;
        case "REMOVE_EVENT": {
            let {events} = state
            const checkId = events.findIndex(event => event.id === action.payload)
            if(checkId > -1){
                events.splice(checkId, 1)
                return {
                    ...state,
                    "events": [...events]
                }
            }
        }
        break;  
        case "EDIT_EVENT": {
            let {events} = state
            const checkId = events.findIndex(event => event.id === action.payload.id)
            if(checkId > -1){
                events.splice(checkId, 1, action.payload)
                return {
                    ...state,
                    "events": [...events]
                }
            }
        }
        break;
        
     default:
      return state
    }
}
export default EventReducer