import api from '.';

export const CategoriesService = {
  fetchCategories: ({ per_page = 100, page = 1, ...restParams } = {}) => {
    return api.get('/wp/v2/categories', {
      params: {
        page,
        per_page,
        ...restParams
      }
    })
  }
}