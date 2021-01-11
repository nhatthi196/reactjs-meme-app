import { ACCESS_TOKEN } from "../../constants";
import { ACT_LOGIN, ACT_LOGIN_FAILD, ACT_LOGOUT } from "./actions";

const initialState = {
    accessToken: localStorage.getItem(ACCESS_TOKEN) || '',
    currentUser: null,
    loginStatus: 'loading'
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type ) {
        case ACT_LOGIN:
            return {
                ...state,
                loginStatus: 'success',
                accessToken: action.payload.token,
                currentUser: action.payload.currentUser,
            }
        case ACT_LOGIN_FAILD:
            return {
                ...state,
                loginStatus: 'failed'
            }
        case ACT_LOGOUT:
            return {
                ...state,
                accessToken: '',
                currentUser: null,
                loginStatus: 'failed'
            }
        default:
            return state;
    }
}