import { combineReducers } from 'redux';
import UserReducer from './user';
import ReceptionistReducer from './receptionist';
import HayyacomEventReducer from './hayyacomevent';
import EventReducer from './event';
import InvitationReducer from "./invitation"
export default combineReducers({
    UserReducer: UserReducer,
	ReceptionistReducer: ReceptionistReducer,
	HayyacomEventReducer: HayyacomEventReducer,
	EventReducer: EventReducer,
	InvitationReducer: InvitationReducer
});