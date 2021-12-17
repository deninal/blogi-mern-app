import { useContext, useEffect, useState } from "react";
import Gallery from "../components/gallery/Gallery";
import SidebarItem from "../components/sidebar/SidebarItem";
import axios from "axios";
import { Context } from "../context/Context";
import { motion } from "framer-motion";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cat, setCat] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      fullname: user.fullname,
      username: user.username,
      title,
      description,
      categories: cat,
      userPic: user.profilePic,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.picture = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

  return (
    <motion.div
      className="max-w-7xl w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="w-full">
        {/* Header Image */}
        <section className="relative h-96 w-full items-center justify-center bg-gray-400">
          <label htmlFor="fileInput" className="cursor-pointer">
            {/* <h1 className="flex cursor-pointer opacity-0 hover:opacity-100 hover:bg-gray-500 hover:bg-opacity-50 text-white text-lg font-semibold absolute w-full h-full items-center justify-center">
              Upload Image
            </h1> */}
            {!file ? (
              <img
                className="flex absolute w-full h-full object-cover"
                src="https://i.ibb.co/crxC3SC/cover.png"
                alt=""
              />
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="h-96 w-full object-cover"
              />
            )}
          </label>
        </section>

        <div className="flex mt-5 lg:space-x-5 max-w-7xl">
          {/* Left side / Write form */}
          <section className="py-10 px-3 md:px-10 bg-white w-full lg:w-3/4">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-2 w-full">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <input
                  type="text"
                  placeholder="Title"
                  autoFocus={true}
                  className="w-full focus:outline-none border-b focus:border-indigo-700 sm:text-lg md:text-2xl  p-2 "
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-10">
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                />
                {/* <textarea
                  placeholder="Tell your story..."
                  type="text"
                  className="w-full h-96 my-10 p-3 text-lg focus:outline-none border-b focus:border-indigo-700"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea> */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 ">
                  <p className="hidden sm:inline-flex text-gray-500 font-medium text-lg">
                    {" "}
                    Category:
                  </p>
                  <p className="text-2xl font-semibold text-indigo-700">#</p>
                  {/* <input
                    type="text"
                    placeholder="Enter Category"
                    className="border-b p-2 focus:outline-none focus:border-indigo-700"
                    onChange={(e) => setCat(e.target.value)}
                  /> */}
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

                <button className="button" type="submit">
                  Publish
                </button>
              </div>
            </form>
          </section>

          {/* Right side / Sidebar */}
          <section className="lg:w-1/4">
            <div className="hidden lg:inline-flex flex-col w-full">
              <h1 className="text-xl font-semibold border-b-2 py-3 w-full items-center justify-center flex">
                Gallery
              </h1>
              <Gallery />
            </div>
            <div className="hidden lg:inline-flex flex-col w-full">
              <h1 className="text-xl font-semibold border-b-2 py-3 w-full items-center justify-center flex">
                Tags
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

export default Write;
