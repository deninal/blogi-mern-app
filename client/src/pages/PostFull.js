import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Gallery from "../components/gallery/Gallery";
import SidebarItem from "../components/sidebar/SidebarItem";
import { Context } from "../context/Context";
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion";
import parse from "html-react-parser";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function PostFull() {
  const PublicFolder = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cat, setCat] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setCat(res.data.categories);
    };
    fetchPost();
  }, [path]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/posts");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, {
        username: user.username,
        title,
        description,
        categories: cat,
      });
      setUpdateMode(false);
    } catch (error) {}
  };

  return (
    <motion.div
      className="max-w-7xl w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col w-full max-w-7xl">
        {/* Header */}
        <section className="relative items-center w-full h-96">
          <h1 className="absolute h-5/6 w-full flex items-end px-16 py-10 text-white font-bold text-3xl md:text-4xl lg:text-5xl filter drop-shadow-lg">
            {title}
          </h1>

          {post.picture && (
            <img
              className="rounded-b-md h-full w-full object-cover"
              src={PublicFolder + post.picture}
              alt=""
            />
          )}
        </section>

        {/* Post Metadata */}
        <section className="flex space-x-2 md:space-x-3 items-center w-full mt-5 justify-between">
          <div className="flex flex-grow space-x-2 md:space-x-3 items-center ">
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={PublicFolder + post.userPic}
              alt=""
            />
            <p className="text-xs md:text-lg font-normal text-gray-700 hover:underline">
              <Link to={`/posts/?user=${post.fullname}`}>{post.fullname}</Link>
            </p>
            <p className="hidden md:flex">•</p>
            <p className="text-xs md:text-lg font-normal text-gray-700">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex space-x-1 md:space-x-3">
            {post.username === user?.username && (
              <p
                className="text-xs md:text-lg py-1 px-3 md:px-8 border border-indigo-700 rounded-full text-indigo-700 font-semibold cursor-pointer hover:bg-indigo-700 hover:text-white transition transform duration-300 ease-out"
                onClick={() => setUpdateMode(true)}
              >
                Edit
              </p>
            )}
            {post.username === user?.username && (
              <p
                className="text-xs md:text-lg py-1 px-3 md:px-8 border bg-red-700 border-red-700 rounded-full text-white font-semibold cursor-pointer hover:bg-transparent hover:text-red-700 transition transform duration-300 ease-out"
                onClick={handleDelete}
              >
                Delete
              </p>
            )}
          </div>
          <div className="lg:w-1/4"></div>
        </section>

        {updateMode ? (
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            placeholder="Title"
            autoFocus={true}
            className="w-full  focus:outline-none border-[1.5px] focus:border-[1.5px] border-gray-300 focus:border-blue-400 sm:text-lg md:text-2xl p-2 mt-5 "
          />
        ) : (
          <span></span>
        )}

        <div className="w-full flex space-x-5">
          {/* Post Body */}

          <section className="py-10 md:flex lg:w-3/4 w-full">
            <div className="flex md:flex-col gap-5 md:gap-5 py-2 ">
              <FaFacebook
                size="2em"
                className="cursor-pointer text-gray-700 hover:text-blue-700 transition transform duration-300 ease-out"
              />
              <FaTwitter
                size="2em"
                className="cursor-pointer text-gray-700 hover:text-blue-400 transition transform duration-300 ease-out"
              />
              <FaInstagram
                size="2em"
                className="cursor-pointer text-gray-700 hover:text-pink-600 transition transform duration-300 ease-out"
              />
            </div>
            <div className="flex flex-col md:flex-row space-x-2 md:px-5 w-full">
              {updateMode ? (
                <div className="flex flex-col w-full">
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                    }}
                  />

                  {/* <TextareaAutosize
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="flex w-full my-10 p-3 text-lg focus:outline-none border-b focus:border-indigo-700"
                  /> */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 ">
                      <p className="text-gray-600 font-medium text-lg">
                        {" "}
                        Category:
                      </p>
                      <p className="text-2xl font-semibold text-indigo-700">
                        #
                      </p>

                      <label className="">
                        <select
                          className="border border-gray-300 px-2 py-1 text-indigo-700 font-semibold focus:outline-none"
                          onChange={(e) => setCat(e.target.value)}
                        >
                          <option value="JavaScript">JavaScript</option>
                          <option value="React">React</option>
                          <option value="Node">Node</option>
                          <option value="Programming">Programming</option>
                          <option value="Webdev">Webdev</option>
                          <option value="Design">Design</option>
                          <option value="frontend">frontend</option>
                          <option value="backend">backend</option>
                          <option value="blockchain">Blockchain</option>
                          <option value="Typescript">Typescript</option>
                          <option value="ML">ML</option>
                          <option value="Python">Python</option>
                        </select>
                      </label>
                    </div>
                    <button className="w-32 button" onClick={handleUpdate}>
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap font-normal text-gray-700 text-lg md:text-xl">
                  {parse(description)}
                </p>
              )}
            </div>
          </section>

          {/* Right side / Sidebar */}
          <section className="lg:w-1/4">
            <div className="hidden lg:inline-flex flex-col w-full">
              <h1 className="text-xl font-semibold border-b-2 py-3 w-full items-center  flex">
                Gallery
              </h1>
              <Gallery />
            </div>
            <div className="sticky top-0 hidden lg:inline-flex flex-col w-full">
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
          </section>
        </div>
      </div>
    </motion.div>
  );
}

export default PostFull;
