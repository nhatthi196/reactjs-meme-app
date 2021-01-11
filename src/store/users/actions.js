import { UserService } from "../../services/users";


export const ACT_FETCH_USER_BY_ID = 'ACT_FETCH_USER_BY_ID';

export function actFetchUserById({ user }) {
  return {
    type: ACT_FETCH_USER_BY_ID,
    payload: { user }
  }
}

// Async

export function actFetchUserByIdAsync({ userId }) {
  return async (dispatch, getRootState) => {
    try {
      const rootState = getRootState();
      const hashUser = rootState.Users.hashUser;

      if (hashUser[userId]) {
        return {
          ok: true,
          user: hashUser[userId]
        }
      }

      const response = await UserService.getUserById(userId)
      const user = response.data;      
      dispatch(actFetchUserById({ user }));

      return {
        ok: true,
        user: user
      }

    } catch(e) {
      return {
        ok: false,
        error: e
      }
    }
  }
}