import { apiPost, apiPatch, apiGet, apiDelete } from '../utils/api';
import { API_URL } from '../constant';


export const getGuestlistsApi = data => apiGet(`${API_URL}/hayyacom/invitors/guestlists/${data}`)

export const deleteguestlistApi = (SN,eventid) => apiGet(`${API_URL}/hayyacom/invitors/delete_invitations/${SN}/${eventid}`)


