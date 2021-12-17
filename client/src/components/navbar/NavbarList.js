import { useContext } from "react";
import { Context } from "../../context/Context";
import NavItem from "./NavItem";

function NavbarList({ onclick }) {
  const {user} = useContext(Context)
  return (
    <div className="hidden md:flex space-x-3 md:space-x-8 sm:text-lg md:text-xl justify-center">
      <NavItem navItem="Home" path="/" />
      <NavItem navItem="Posts" path="/posts" />
      <NavItem navItem="About" path="/about" />
      <NavItem navItem="Write" path="/write" />

      {user ? (
        <NavItem navItem="Logout" path="/" onclick={onclick} />
      ) : (
        <NavItem navItem="Register" path="/register" onclick={onclick} />
      )}
    </div>
  );
}

export default NavbarList;
