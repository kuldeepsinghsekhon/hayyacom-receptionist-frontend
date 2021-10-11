import { apiPost, apiPatch, apiGet, apiDelete } from '../utils/api';
import { API_URL } from '../constant';

export const addEventsApi = data => apiPost(`${API_URL}/events`, data)

export const getEventsApi = data => apiGet(`${API_URL}/events/all/${data}`)

export const deleteEventsApi = data => apiDelete(`${API_URL}/events/${data}`)

export const editEventsApi = (data) => apiPatch(`${API_URL}/events/${data.id}`, data)
