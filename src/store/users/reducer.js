import { ACT_FETCH_USER_BY_ID } from "./actions";

const initState = {
  hashUser: {}
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ACT_FETCH_USER_BY_ID:
      const user = action.payload.user;

      return {
        ...state,
        hashUser: {
          ...state.hashUser,
          [user.id]: user
        }
      }    
  
    default:
      return state;
  }
}