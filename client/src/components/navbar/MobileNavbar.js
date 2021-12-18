import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import NavItem from "./NavItem";

function MobileNavbar() {
  const {user} = useContext(Context)
  const PublicFolder = "https://blogi-mern-app.herokuapp.com/images/";
  
  return (
    <div className="md:hidden bg-white px-5 py-8 space-y-3 text-2xl">
      <NavItem navItem="Home" path="/"  />
      <NavItem navItem="Posts" path="/posts"  />
      <NavItem navItem="About" path="/about" />
      <NavItem navItem="Write" path="/write" />
       {user ? (
        <NavItem navItem="Logout" path="/" onclick={onclick} />
      ) : (
        <NavItem navItem="Register" path="/register" onclick={onclick} />
      )}
     
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
                <NavItem navItem="Login" path="/login" />
                
              </div>
            )}
          </div>
    </div>
  );
}

export default MobileNavbar;
