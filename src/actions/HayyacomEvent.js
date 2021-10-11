export const saveHayyacomEvents = (data) => dispatch => {
    dispatch({
        type: 'SAVE_HAYYACOMEVENTS',
        payload: data
    })
}
export const saveReceptionists=(data)=>dispatch=>{
	dispatch({
			type: 'SAVE_CITY_RECEPTIONISTS',
			payload: data
		})	
}
export const addNewHayyacomEvent = (data) => dispatch => {
    dispatch({
        type: 'ADD_NEW_HAYYACOMEVENT',
        payload: data
    })
}
export const removeHayyacomEvent = (data) => dispatch => {
    dispatch({
        type: 'REMOVE_HAYYACOMEVENT',
        payload: data
    })
}

export const editHayyacomEvent = (data) => dispatch => {
    dispatch({
        type: 'EDIT_HAYYACOMEVENT',
        payload: data
    })
}








