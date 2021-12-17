import { Link } from "react-router-dom";


function Join() {
  return (
    <div className=" md:flex w-full bg-indigo-100 rounded-xl py-10 px-5 sm:px-10 md:px-10 xl:px-20 items-center">
      <div className="text-center md:text-left md:h-full lg:w-1/2">
        <h1 className="font-bold text-2xl text-gray-800 md:text-4xl mb-5">
          Become an author and share your great stories
        </h1>
        <p className="text-base lg:text-md font-base text-gray-500">
          Become an author to read and share new perspectives on just about any
          topic. Everyone’s welcome.
        </p>
        <Link to="/register">
          <button className="mt-8 sm:mt-10 md:mt-20 bg-indigo-600 hover:text-indigo-600 hover:bg-indigo-100 hover:border-indigo-600 border text-white text-lg font-medium py-2 px-4 md:py-3 md:px-8 rounded-full object-right transition transfrom duration-300 ease-out">
            Become an author
          </button>
        </Link>
      </div>
      <div className="p-5 lg:p-10">
        <img
          src="https://ncmaz.chisnghiax.com/wp-content/uploads/2021/09/BecomeAnAuthorImg.02703848-2.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Join;
