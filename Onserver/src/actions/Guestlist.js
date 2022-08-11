export const saveGuestlists = (data) => dispatch => {
    dispatch({
        type: 'SAVE_GUESTLIST',
        payload: data
    })
}

export const addNewGuestlist = (data) => dispatch => {
    dispatch({
        type: 'ADD_NEW_GUESTLIST',
        payload: data
    })
}
export const removeGuestlist = (data) => dispatch => {
    dispatch({
        type: 'REMOVE_GUESTLIST',
        payload: data
    })
}

export const editGuestlist = (data) => dispatch => {
    dispatch({
        type: 'EDIT_GUESTLIST',
        payload: data
    })
}










