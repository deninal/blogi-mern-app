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
              Aenean consectetur massa quis sem volutpat, a condimentum tortor
              pretium. Cras id ligula consequat, sagittis nulla at, sollicitudin
              lorem. Orci varius natoque penatibus et magnis dis parturient
              montes.
              <br />
              <br /> Cras id ligula consequat, sagittis nulla at, sollicitudin
              lorem. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Phasellus eleifend, dolor vel
              condimentum imperdiet. In a professional context it often happens
              that private or corporate clients corder a publication to be made
              and presented with the actual content still not being ready.
              <br />
              <br /> Think of a news blog that’s filled with content hourly on
              the day of going live. However, reviewers tend to be distracted by
              comprehensible content, say, a random text copied from a newspaper
              or the internet. The are likely to focus on the text, disregarding
              the layout and its elements. <br />
              <br /> Most text editors like MS Word or Lotus Notes generate
              random lorem text when needed, either as pre-installed module or
              plug-in to be added. Word selection or sequence don’t necessarily
              match the original, which is intended to add variety.
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
