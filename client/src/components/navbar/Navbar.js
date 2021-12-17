import React, { useContext, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import logo from "../../images/blogi.png";
import NavbarList from "./NavbarList";
import MobileNavbar from "./MobileNavbar";
import { Context } from "../../context/Context";

function Navbar() {
  const { user, dispatch } = useContext(Context);
  const PublicFolder = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  //mobile menu
  const [open, setOpen] = useState(false);

  return (
    <div className=" ">
      <div className="sticky top-0 z-10 flex justify-between px-5 md:px-10 lg:px-20 py-3 items-center md:shadow-md bg-white">
        <div className="">
          <Link to="/">
            <img src={logo} alt="" className="h-10 w-auto cursor-pointer" />
          </Link>
        </div>

        <NavbarList onclick={handleLogout} />

        <div className="hidden md:flex items-center justify-end space-x-3">
          <FaSearch size="1.2em" className="cursor-pointer text-gray-500" />
          <div>
            {user ? (
              <Link to="/profile">
                <img
                  className="cursor-pointer h-12 w-12 border rounded-full p-1 object-cover min-w-[30px]"
                  src={
                    PublicFolder+user.profilePic ||
                    "https://icon-library.com/images/default-profile-icon/default-profile-icon-8.jpg"
                  }
                  alt=""
                />
              </Link>
            ) : (
              <div>
                <NavItem  navItem="Login" path="/login" />
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden space-x-3 md:space-x-8 sm:text-lg md:text-xl justify-center">
          <button className="mobileMenuButton" onClick={() => setOpen(!open)}>
            <FaBars className="text-gray-700 text-2xl cursor-pointer" />
          </button>
        </div>
      </div>
      {open && <MobileNavbar />}
    </div>
  );
}

export default Navbar;
