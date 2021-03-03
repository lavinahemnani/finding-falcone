/**
 * Author: Lavina Hemnani
 * Description: This functional component is used to show header, containing navigation links, throughout the application
 */

import React from 'react';
import { Link} from 'react-router-dom';

/**
 * This functional component is used to show header, containing navigation links, throughout the application
 */
const Header = ()=>{
return(
    <header className="header">
    <nav>
      <Link to='/' >Home</Link> {" | "}
      <Link to='/result' >Result</Link>
    </nav>
  </header>
 );
}
/** export the component */
export default Header;