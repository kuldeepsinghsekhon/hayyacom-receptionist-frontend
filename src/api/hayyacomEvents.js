import { apiPost, apiPatch, apiGet, apiDelete } from '../utils/api';
import { API_URL } from '../constant';



//export const addReceptionistApi = data => apiPost(`${API_URL}/receptionist`, data)
export const addMobileEventsApi = data => apiPost(`${API_URL}/hayyacom/create`, data)
export const getHayyacomEventsApi = data => apiPost(`${API_URL}/hayyacom/events`, data)
export const editHayyacomEventsApi = (data) => apiPatch(`${API_URL}/hayyacom/event/${data.id}`, data)
export const getReceptionistApi = (data) => apiPost(`${API_URL}/receptionist/eventcity`, data)
export const assignReceptionistApi = (data) => apiPost(`${API_URL}/hayyacom/event/receptioninst/`, data)
export const getEventDetail = (id) => apiGet(`${API_URL}/hayyacom/events/${id}`)

/*

export const deleteContactsApi = data => apiDelete(`${API_URL}/contacts/${data}`)



export const editReceptionistApi = (data) => apiPatch(`${API_URL}/receptionist/${data.id}`, data)

export const getInvitations = (id) => apiGet(`${API_URL}/invitations/all/${id}`)

export const getInvitationDetail = (id) => apiGet(`${API_URL}/invitations/${id}`)

export const updateInvitation = (data) => apiPatch(`${API_URL}/invitations/${data.id}`, data)

export const getInvitationStats = (id) => apiGet(`${API_URL}/invitations/stats/${id}`)

*/