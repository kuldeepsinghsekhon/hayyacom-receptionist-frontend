export const saveReceptionists = (data) => dispatch => {
    dispatch({
        type: 'SAVE_RECEPTIONIST',
        payload: data
    })
}

export const addNewReceptionist = (data) => dispatch => {
    dispatch({
        type: 'ADD_NEW_RECEPTIONIST',
        payload: data
    })
}
export const removeReceptionist = (data) => dispatch => {
    dispatch({
        type: 'REMOVE_RECEPTIONIST',
        payload: data
    })
}

export const editReceptionist = (data) => dispatch => {
    dispatch({
        type: 'EDIT_RECEPTIONIST',
        payload: data
    })
}


export const addNewContactsBulk = (data) => dispatch => {
    dispatch({
        type: 'ADD_NEW_RECEPTIONIST_BULK',
        payload: data
    })
}







