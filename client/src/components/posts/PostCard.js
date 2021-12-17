import { Link } from "react-router-dom";

function PostCard({
  category,
  title,
  date,
  readMore,
  destination,
  author,
  picture,
  userPic,
  cat,
  authDest
}) {
  return (
    <div className="flex p-3 md:p-8 lg:p-10 rounded-xl border border-gray-200 bg-white hover:shadow-md content place-content-between">
      <section className="flex  flex-col place-content-between w-4/6 lg:w-1/2">
        <Link to={cat}>
          <p className="text-indigo-600 font-semibold cursor-pointer hover:underline">
            #{category}
          </p>
        </Link>

        <Link to={destination}>
          <h1 className="font-bold text-xl xl:text-2xl break-words hover:underline cursor-pointer my-5">
            {title}
          </h1>
        </Link>

        <div className="flex items-center">
          <div className="relative flex items-center justify-center overflow-hidden shadow-xl w-10 h-10 md:w-16 md:h-16 rounded-full mr-3">
            <img className="absolute h-full w-full object-cover" src={userPic} alt="" />
          </div>
          <div>
            <Link to={authDest}>
              <p className="text text-lg font-semibold hover:underline">{author}</p>
            </Link>
            <p className="flex text-sm text-gray-500 font-normal">
              {date} • 5 min read
            </p>
          </div>

          {/* <div className="flex items-center space-x-5">
          
          <Link to={destination}>
            <button className="bg-indigo-600 hover:text-indigo-600 hover:bg-white hover:border-indigo-600 border text-white text-lg font-medium py-2 px-5 rounded-full object-right transfrom translate duration-200 ease-out">
              {readMore}
            </button>
          </Link>
        </div> */}
        </div>
      </section>
      <Link to={destination}>
        <section className="relative -mr-10 md:-mr-16 lg:mr-0 flex items-center justify-center m-3 overflow-hidden shadow-xl w-28 h-28 md:h-40 md:w-40 xl:w-60 xl:h-60 rounded-full cursor-pointer">
          <img
            className="absolute h-full w-full transition-all duration-500 ease-in-out transform object-cover hover:scale-125"
            src={picture}
            alt=""
          />
        </section>
      </Link>
    </div>
  );
}

export default PostCard;
