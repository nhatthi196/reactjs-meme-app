import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import AuthReducer from './auth/reducer';
import CommentsReducer from './comments/reducer';
import PostsReducer from './posts/reducer';
import CategoriesReducer from './categories/reducer';
import UsersReducer from './users/reducer';
import MenusReducer from './menus/reducer';

const rootReducer = combineReducers({
    Auth: AuthReducer,
    Comments: CommentsReducer,
    Posts: PostsReducer,
    Categories: CategoriesReducer,
    Users: UsersReducer,
    Menus: MenusReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
);

export default store;