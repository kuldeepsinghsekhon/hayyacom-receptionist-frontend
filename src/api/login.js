import { apiPost } from '../utils/api';
import { API_URL } from '../constant';

export const loginApi = data => apiPost(`${API_URL}/auth/login`, data)
