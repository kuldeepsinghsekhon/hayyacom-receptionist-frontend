import { apiPost, apiPatch, apiGet, apiDelete } from '../utils/api';
import { API_URL } from '../constant';

export const addContactsBulkApi = data => apiPost(`${API_URL}/contacts/bulk`, data)

export const addContactsApi = data => apiPost(`${API_URL}/contacts`, data)

export const getContactsApi = data => apiGet(`${API_URL}/contacts/all/${data}`)

export const deleteContactsApi = data => apiDelete(`${API_URL}/contacts/${data}`)

export const inviteContactsApi = (data) => apiPost(`${API_URL}/invitations`, data)

export const editContactsApi = (data) => apiPatch(`${API_URL}/contacts/${data.id}`, data)

export const getInvitations = (id) => apiGet(`${API_URL}/invitations/all/${id}`)

export const getInvitationDetail = (id) => apiGet(`${API_URL}/invitations/${id}`)

export const updateInvitation = (data) => apiPatch(`${API_URL}/invitations/${data.id}`, data)

export const getInvitationStats = (id) => apiGet(`${API_URL}/invitations/stats/${id}`)

