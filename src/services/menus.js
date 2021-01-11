import api from '.';

export const MenusService = {
  getMenusBySlug: (slug = 'main-menu') => api.get(`/menus/v1/menus/${slug}`)
}