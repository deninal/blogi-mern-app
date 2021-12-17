

function PostcardLoader() {
  return (
    <div className="flex p-3 md:p-8 lg:p-10 rounded-xl bg-white border place-content-between">
      <section className="flex  flex-col place-content-between w-4/6 lg:w-1/2">
        <div className="bg-gray-300 animate-pulse h-5 w-16"></div>

        <div className="bg-gray-400 animate-pulse my-1 mt-5 w-full h-10"></div>
        <div className="bg-gray-400 animate-pulse my-1 w-full h-10"></div>
        <div className="bg-gray-400 animate-pulse my-1 mb-5 w-full h-10"></div>

     
          
            <div className="bg-gray-500 animate-pulse h-5 w-28"></div>
            <div className="bg-gray-500 animate-pulse h-4 w-36"></div>
         

       
      </section>

      <section className="relative -mr-10 md:-mr-16 lg:mr-0 flex items-center justify-center m-3 overflow-hidden w-28 h-28 md:h-40 md:w-40 xl:w-60 xl:h-60 rounded-full cursor-pointer  animate-pulse">
        <img
          className="absolute h-full w-full bg-gray-500 animate-pulse"
          src=""
          alt=""
        />
      </section>
    </div>
  );
}

export default PostcardLoader;
