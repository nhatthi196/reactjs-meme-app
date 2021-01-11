import { CategoriesService } from "../../services/categories";

export const ACT_FETCH_CATEGORIES = 'ACT_FETCH_CATEGORIES';

export function actSetCategories({ categories = [] } = {}) {
  return {
    type: ACT_FETCH_CATEGORIES,
    payload: { categories }
  }
}

export function actFetchCategoriesAsync() {
  return async function(dispatch) {
    try {
      const response = await CategoriesService.fetchCategories();
      const categories = response.data;
      dispatch(actSetCategories({ categories }))
      // TO DO: 
    } catch(e) {
      // Handle Error
    }
  }
}