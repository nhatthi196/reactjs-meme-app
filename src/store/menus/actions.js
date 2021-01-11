import { helperRecursiveMenus } from "../../helpers";
import { MenusService } from "../../services/menus"

export const ACT_SET_MAIN_MENUS = 'ACT_SET_MAIN_MENUS';

export const actSetMainMenus = ({ menus }) => {
  return {
    type: ACT_SET_MAIN_MENUS,
    payload: { menus }
  }
}

export const actFetchMainMenusAsync = () => {
  return async dispatch => {
    try {
      const response = await MenusService.getMenusBySlug();
      const menus = response.data.items.map(helperRecursiveMenus)
      dispatch(actSetMainMenus({ menus }))
    } catch(e) { }
  }
}