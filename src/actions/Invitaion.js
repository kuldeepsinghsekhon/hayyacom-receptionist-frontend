export const saveInvitations = (data) => dispatch => {
    dispatch({
        type: 'SAVE_USER_INVITATIONS',
        payload: data
    })
}