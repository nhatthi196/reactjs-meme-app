import './assets/bootstrap-tcl.css';
import './assets/global.css';

import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import PostDetail from './pages/PostDetail';
import PageNotFound from './pages/PageNotFound';

import Header from './components/Header';
import Footer from './components/Footer';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchCategoriesAsync } from './store/categories/actions';
import PostSearch from './pages/PostSearch';

import './store/users/actions';
import { actCheckLogin } from './store/auth/actions';
import Loading from './common/Loading';
import { actFetchMainMenusAsync } from './store/menus/actions';

function App() {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(state => state.Auth.loginStatus);

  useEffect(() => {
    dispatch(actCheckLogin());
    dispatch(actFetchMainMenusAsync());
    dispatch(actFetchCategoriesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingStatus === 'loading') {
    return <Loading isFixed />
  }

  return (
    <BrowserRouter>
      <div className="wrapper-content">
        <Header />

        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/post/:slug" exact>
            <PostDetail />
          </Route>
          <Route path="/search" exact>
            <PostSearch />
          </Route>
          <Route path="/" exact>
            {/* <HomePage /> */}
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
        <div className="spacing"></div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
