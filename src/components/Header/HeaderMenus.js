import cls from 'classnames';
import { useSelector } from 'react-redux';

function RecursiveHeaderMenus({ isRoot, menus }) {
  if (!menus) {
    return null;
  }

  const classes = cls({
    'header-nav__lists': isRoot
  })

  return (
    <ul className={classes}>
      {
        menus.map(menu => (
          <li key={menu.id}>
            <a href={menu.url}>{menu.title}</a>
            <RecursiveHeaderMenus menus={menu.child_items} />
          </li>
        ))
      }
    </ul>
  )
}

function HeaderMenus() {
  const mainMenus = useSelector(state => state.Menus.mainMenus);
  return (
    <RecursiveHeaderMenus isRoot menus={mainMenus} />
    // <ul className="header-nav__lists">
    //   {
    //     mainMenus.map((menu) => (
    //       <li key={menu.id}>
    //         <a href={menu.url}>{menu.title}</a>
    //         {
    //           menu.child_items && (
    //             <ul>
    //               {
    //                 menu.child_items.map(_menu => (
    //                   <li key={_menu.id}>
    //                     <a href={_menu.url}>{_menu.title}</a>
    //                     {
    //                       _menu.child_items && (
    //                         <ul>
    //                           {
    //                             _menu.child_items.map(__menu => (
    //                               <li key={__menu.id}>
    //                                 <a href={__menu.url}>{__menu.title}</a>
    //                               </li>
    //                             ))
    //                           }
    //                         </ul>
    //                       )
    //                     }
    //                   </li>
    //                 ))
    //               }
    //             </ul> 
    //           )
    //         }
    //       </li>
    //     ))
    //   }
    // </ul>
  )
}

export default HeaderMenus;