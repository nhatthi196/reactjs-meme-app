import { ACT_FETCH_CATEGORIES } from "./actions";

const initialState = {
  hashList: {}
}

function CategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case ACT_FETCH_CATEGORIES:
      return {
        ...state,
        hashList: action
          .payload
          .categories.reduce((prevObj, category) => ({
            ...prevObj,
            [category.id]: category
          }), {})
      }
    default:
      return state;
  }
    
}

export default CategoriesReducer;