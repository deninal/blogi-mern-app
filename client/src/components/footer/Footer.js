import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../images/blogi.png";

function Footer() {
  return (
    <footer className="flex justify-between px-5 md:px-10 lg:px-20 items-center border-t-2 py-7">
      <Link to="/">
        <img src={logo} alt="" className="h-10 w-auto cursor-pointer" />
      </Link>
      <div className="flex items-center space-x-3">
          <h1 className="hidden md:flex text-xl font-semibold">Follow us</h1>
          <FaFacebookF className="social"/>
          <FaInstagram className="social"/>
          <FaTwitter className="social"/>
          <FaLinkedinIn className="social"/>
      </div>

    </footer>
  );
}

export default Footer;
