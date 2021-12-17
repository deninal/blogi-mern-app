import { Link } from "react-router-dom";

function AuthCard({ authName, authPic, link, postsNr }) {
  return (
    <Link to={link}>
      <div className="flex bg-white rounded-xl border border-gray-200 p-5 justify-center hover:shadow-lg hover:bg-gray-50">
        <div className="mx-auto text-center">
          <img
            className="h-20 w-20 rounded-full object-cover mb-5 mx-auto"
            src={authPic}
            alt=""
          />
          <p className="text-lg sm:text-2xl text-gray-800 font-bold mb-2">
            {authName}
          </p>
          <p className="text-gray-400 font-medium">{postsNr} Articles</p>
        </div>
      </div>
    </Link>
  );
}

export default AuthCard; 
