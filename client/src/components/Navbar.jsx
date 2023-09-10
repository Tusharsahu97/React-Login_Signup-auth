import {Link} from "react-router-dom";
import './Navbar.css';
function Navbar() {
  return (
   <nav className="navbar">
     <Link to='/' className="link">Home</Link>
     <Link to='/register' className="link">Register</Link>
     <Link to='/login' className="link">Login</Link>
     
   </nav>
  )
}

export default Navbar;
