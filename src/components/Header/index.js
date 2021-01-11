import AppContainer from '../../common/AppContainer';
import './Header.css';

import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';

function Header() {

  return (
    <header id="header">
      <AppContainer>
        <div className="tcl-row tcl-no-gutters header">
          <HeaderLogo />
          <HeaderSearch />
          <HeaderNav />
        </div>
      </AppContainer>
    </header>
  )
}

export default Header