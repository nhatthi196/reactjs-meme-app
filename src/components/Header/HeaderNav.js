import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actLogout } from '../../store/auth/actions';
import HeaderMenus from './HeaderMenus';

export default function HeaderNav() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.Auth.currentUser);

    function handleLogout() {
        dispatch(actLogout());
    }

    return (
        <div className="tcl-col-6">
            {/* Nav */}
            <div className="header-nav">
            <HeaderMenus />
            <ul className="header-nav__lists">
                <li className="user">
                {
                    !currentUser
                    ? <Link to="/login"><i className="icons ion-person" /> Tài khoản</Link>
                    : <Link to="/dashboard"><i className="icons ion-person" />{currentUser.user_name}</Link>
                }
                {
                    currentUser && (
                        <ul>
                            <li><span onClick={handleLogout}>Logout</span></li>
                        </ul>
                    )
                }
                </li>
            </ul>
            </div>
        </div>
    )
}