import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiSparkles } from "react-icons/hi";
import Gallery from "../components/gallery/Gallery";
import SidebarItem from "../components/sidebar/SidebarItem";

function About() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);
  return (
    <motion.div
      className="max-w-7xl w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="h-full">
        <section className="relative flex h-2/3 max-h-[500px] w-full rounded-b-xl items-end ">
          <span className="bg-gray-600 h-full w-[80%] opacity-30 rounded-b-xl"></span>
          <img
            className="h-full w-[85%] object-cover rounded-b-xl object-right"
            src="https://images.pexels.com/photos/4549414/pexels-photo-4549414.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            alt="About us"
          />
          <h1 className="absolute mb-10 text-white font-semibold text-3xl md:text-5xl drop-shadow-lg bg-indigo-700 items-center px-3 md:px-10 py-3 2xl:px-16 rounded-md">
            About Us
          </h1>
        </section>
        <section className="w-full mt-20 flex">
          <div className="md:w-2/3 lg:w-4/6 md:pr-10">
            <h1 className="text-3xl font-semibold">
              A Professional Publishing Platform
            </h1>
            <p className="mt-5 text-gray-800 text-lg leading-relaxed ">
              Blogi is a MERN blogging application with user
              authentication.
              <br />
              <br />
              In order to write a new blog post, the user has to create and
              account and login
              <br />
              <br /> The front-end of the app is build using React, React
              Router, Tailwind.css and some Framer Motion animations.
              <br />
              <br />
              The backend is written in express, and it has been deployed using
              Heroku's free tier and the Mongodb Atlas's cloud service is used
              for the database service.
              <br />
              <br />
              Axios is used to interface with the API, and React context for
              state management.
              <br />
              <br />
              Additionally it uses CKEditor as a rich text editor for writting
              posts which support some basic features like bold, italic,
              hyperlinks, blockquotes or undo/redo changes.
              <br />
              <br />
              While the design is pretty responsive, many elements need further
              improvements in the next version.
            </p>
          </div>
          {/* Right side / Sidebar */}
          <section className="md:w-1/3 lg:w-2/6">
            <div className=" hidden md:inline-flex flex-col w-full">
              <h1 className="text-xl font-semibold border-b-2 py-3 w-full items-center flex">
                <HiSparkles className="text-yellow-500 mr-2" /> Trending topics
              </h1>
              <div className="py-5 flex flex-wrap">
                {categories.map((category) => (
                  <SidebarItem
                    category={category.name}
                    link={`/posts/?cat=${category.name}`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden md:inline-flex flex-col w-full">
              <h1 className="text-xl font-semibold border-b-2 py-3 w-full items-center  flex">
                Gallery
              </h1>
              <Gallery />
            </div>
          </section>
        </section>
      </div>
    </motion.div>
  );
}

export default About;
