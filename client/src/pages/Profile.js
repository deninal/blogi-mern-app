import axios from "axios";
import { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import { Context } from "../context/Context";
import { motion } from "framer-motion";

function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PublicFolder = "http://localhost:5000/images/";

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      fullname,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <motion.div
      className="max-w-7xl w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="md:flex w-full md:space-x-10 justify-center ">
        <div className="py-5 flex-grow">
          <section className="flex  items-center justify-center space-x-2 pb-10">
            {/* <h1 className="font-semibold text-lg md:text-2xl py-5">
            Update Your Account
          </h1> */}
            <p className="px-3 py-2 cursor-pointer border border-red-600 text-sm text-white font-medium bg-red-600 rounded-full hover:bg-transparent hover:text-red-600 transition transform duration-300 ease-out">
              Delete Account
            </p>
          </section>
          <form className="space-y-10 md:space-x-5" onSubmit={handleUpdate}>
            <div className="flex relative items-end justify-center ">
              <label
                htmlFor="fileInput"
                className="flex absolute cursor-pointer p-3 bg-gray-100 rounded-full  ml-28 shadow  hover:shadow-lg"
              >
                <FaPen className="text-gray-700 " />
              </label>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : PublicFolder + user.profilePic ||
                      "https://icon-library.com/images/default-profile-icon/default-profile-icon-8.jpg"
                }
                alt=""
                className="h-40 w-40 object-cover rounded-full shadow-xl"
              />
              <input
                className="hidden"
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="flex flex-grow flex-col space-y-5 justify-center">
              <input
                type="text"
                placeholder={user.fullname}
                className="input"
                defaultValue={user.fullname}
                onChange={(e) => setFullname(e.target.value)}
              />

              <input
                type="text"
                placeholder={user.username}
                className="input"
                defaultValue={user.username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="email"
                placeholder={user.email}
                className="input"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-col items-center justify-center">
                <button className="button" type="submit">
                  Update
                </button>
                {success && (
                  <span className="text-green-700 font-medium transition transform duration-900 ease-in">
                    Profile has been updated!
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="relative hidden md:inline-flex flex-grow w-2/4 items-center justify-center">
          <h1 className="z-30 flex absolute h-full w-full bg-indigo-700 bg-opacity-60 items-center justify-center text-white font-bold text-5xl uppercase">
            Profile
          </h1>

          <img
            src="https://images.pexels.com/photos/3182752/pexels-photo-3182752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
            className="h-full object-cover "
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Settings;
