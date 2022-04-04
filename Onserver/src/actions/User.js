export const saveUserData = (data) => dispatch => {
    dispatch({
        type: 'SAVE_USER_DATA',
        payload: data
    })
}

export const setActiveTab = (data) => dispatch => {
    dispatch({
        type: 'SET_ACTIVE_TAB',
        payload: data
    })
}

export const saveContacts = (data) => dispatch => {
    dispatch({
        type: 'SAVE_USER_CONTACTS',
        payload: data
    })
}

export const addNewContacts = (data) => dispatch => {
    dispatch({
        type: 'ADD_NEW_CONTACT',
        payload: data
    })
}

export const addNewContactsBulk = (data) => dispatch => {
    dispatch({
        type: 'ADD_NEW_CONTACT_BULK',
        payload: data
    })
}

export const removeContact = (data) => dispatch => {
    dispatch({
        type: 'REMOVE_CONTACT',
        payload: data
    })
}

export const editContact = (data) => dispatch => {
    dispatch({
        type: 'EDIT_CONTACT',
        payload: data
    })
}



