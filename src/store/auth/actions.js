import { ACCESS_TOKEN, mapErrorRegister } from '../../constants';
import { parseJwt } from '../../helpers';
import { AuthService } from "../../services/auth";
import { actFetchUserByIdAsync } from "../users/actions";

export const ACT_LOGIN = 'ACT_LOGIN';
export const ACT_LOGOUT = 'ACT_LOGOUT';
export const ACT_LOGIN_FAILD = 'ACT_LOGIN_FAILD';
export const ACT_REGISTER = 'ACT_REGISTER';

export function actLogin({ token, currentUser }) {
  return {
    type: ACT_LOGIN,
    payload: {
      token,
      currentUser
    }
  }
}

export function actLogout() {
  localStorage.removeItem(ACCESS_TOKEN);
  return { type: ACT_LOGOUT }
}

export function actLoginFailed() {
  return { type: ACT_LOGIN_FAILD }
}

export function actCheckLogin() {
  return async (dispatch, getRootState) => {
    try {
      const rootState = getRootState();
      const token = rootState.Auth.accessToken;
      const tokenObj = parseJwt(token);
      const userId = tokenObj.data.user.id;
      const fetchUserRes = await dispatch(actFetchUserByIdAsync({ userId }));
      dispatch(actLogin({ token, currentUser: fetchUserRes.user }));
    } catch (e) {
      dispatch(actLoginFailed());
    }
  }
}

export function actLoginAsync({ email, password }) {
  return async dispatch => {
    try {
      const response = await AuthService.login(email, password);
      const token = response.data.token;
      const tokenObj = parseJwt(token);
      const userId = tokenObj.data.user.id;

      localStorage.setItem(ACCESS_TOKEN, token);
      const fetchUserRes = await dispatch(actFetchUserByIdAsync({ userId }));
      
      dispatch(actLogin({ token, currentUser: fetchUserRes.user }));

      return {
        ok: true
      }
    } catch (e) {
      let errorText = '';
      const errorRes = e.response;
      errorText = errorRes.data.code;
      // switch (errorCode) {
      //   case '[jwt_auth] incorrect_password':
      //     errorText = 'Mật khẩu không hợp lệ';
      //     break;
      //   case '[jwt_auth] invalid_email':
      //     errorText = 'email không hợp lệ';
      //     break;
      //   default:
      //     errorText = 'Có lỗi xảy ra. Vui lòng kiểm tra lại';
      //     break;
      // }
      dispatch(actLoginFailed());
      return {
        ok: false,
        error: errorText
      }
    }
  }
}

export function actRegisterAsync({
  email,
  password,
  repassword
}) {
  return async dispatch => {
    try {
      await AuthService.register({
        email,
        password,
        repassword
      });
      await dispatch(actLoginAsync({ email, password }));

      return {
        ok: true,
      }
  
    } catch (e) {
      const errorRes = e.response;
      const errorCode = errorRes.data.code;
      const errorText = mapErrorRegister[errorCode] || 'Có lỗi xảy ra. Vui lòng kiểm tra lại'
      return {
        ok: false,
        error: errorText
      }
    }
  }
}