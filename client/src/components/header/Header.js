import { Link } from "react-router-dom";

function Header({
  category,
  title,
  date,
  readMore,
  destination,
  author,
  picture,
  userPic,
  cat,
}) {
  return (
    <div className="flex w-full ">
      <div className="flex relative flex-col place-items-center w-full ">
        <div className="flex relative justify-center text-center items-end">
          <Link to={destination}>
            <img
              className="rounded-lg  h-[300px]  md:h-[400px] lg:h-[500px] w-screen object-cover"
              src={
                picture ||
                "http://axilthemes.com/themes/blogar/wp-content/uploads/2021/01/gallery-post-03-1230x615.jpg"
              }
              alt=""
            />
          </Link>

          <div className="absolute p-5 lg:px-10">
            <Link to={destination}>
              <h1 className="font-bold text-white drop-shadow-lg text-xl md:text-2xl xl:text-3xl break-words hover:underline cursor-pointer my-5">
                {title}
              </h1>
            </Link>
          </div>
        </div>

        {/* <div className="flex w-full md:w-4/6 justify-end items-end h-full -mt-28 md:-mr-28">
        <div className="flex mx-5 w-full h-full md:max-w-[600px] p-3 md:p-8 lg:p-10 rounded-xl border border-gray-50 bg-white hover:shadow-md content place-content-between">
          <section className="flex  flex-col place-content-between w-full">
            <Link to={cat}>
              <p className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                #{category}
              </p>
            </Link>

            <Link to={destination}>
              <h1 className="font-bold  text-xl md:text-2xl xl:text-3xl break-words hover:underline cursor-pointer my-5">
                {title}
              </h1>
            </Link>

            <div className="flex items-center justify-between  w-full">
              <div className="flex items-center">
                <div className="relative flex items-center justify-center overflow-hidden shadow-xl w-10 h-10 md:w-16 md:h-16 rounded-full mr-3">
                  <img
                    className="absolute h-full w-full object-cover"
                    src={userPic}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text text-lg font-semibold">{author}</p>
                  <div className="flex">
                    <p className="hidden sm:flex text-sm text-gray-500 font-normal mr-2">
                      {date} •
                    </p>
                    <span className="flex text-sm text-gray-500 font-normal">
                      
                      5 min read
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-5 -mr-10 md:-mr-20">
                <Link to={destination}>
                  <button className="bg-indigo-600 hover:text-indigo-600 hover:bg-white hover:border-indigo-600 border text-white text-lg font-medium py-2 px-4 md:py-3 md:px-8 rounded-full object-right transfrom translate duration-200 ease-out">
                    {readMore}
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default Header;
