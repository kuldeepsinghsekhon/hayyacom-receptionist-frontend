

export const addNewEvent = (data) => dispatch => {
    dispatch({
        type: 'ADD_NEW_EVENT',
        payload: data
    })
}
export const saveEvents = (data) => dispatch => {
    dispatch({
        type: 'SAVE_USER_EVENTS',
        payload: data
    })
}
export const editEvents = (data) => dispatch => {
    dispatch({
        type: 'EDIT_EVENT',
        payload: data
    })
}