const INITIAL_STATE = {
    invitations: []
}

const InvitationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SAVE_USER_INVITATIONS":
            return {
                ...state,
                "invitations": action.payload
            }
        break;
        case "ADD_NEW_INVITATION": {
            let {invitations} = state
            const checkId = invitations.filter(invitation => invitation.id === action.payload.id)
            if(!checkId.length){
                invitations.push(action.payload)
                return {
                    ...state,
                    "invitations": [...invitations]
                }
            }
        }
        break;
     default:
      return state
    }
}
export default InvitationReducer