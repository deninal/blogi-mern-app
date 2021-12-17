import { Link } from "react-router-dom";

function NavItem({ navItem, path, onclick }) {
  return (
    <div onClick={onclick} className="py-1 cursor-pointer  text-gray-500  hover:text-indigo-600 transition transform duration-300 ease-out">
      <Link to={path}><p>{navItem}</p></Link>
    </div>
  );
}

export default NavItem;
