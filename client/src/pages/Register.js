import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        fullname,
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <motion.div
      className="max-w-7xl w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="md:flex w-full md:space-x-10 justify-center h-full">
        <div className="py-5 flex-grow my-auto">
          <section className="flex items-center justify-between mb-5">
            <div>
              <h1 className="w-full flex justify-center text-indigo-700 font-bold text-xl md:text-3xl lg:text-4xl">
                Welcome!
              </h1>
              <h3 className="text-gray-500 text-md w-full justify-center flex ">
                Create your account
              </h3>
            </div>

            <Link to="/login">
              <p className="underline text-lg font-semibold cursor-pointer text-gray-600">
                Login
              </p>
            </Link>
          </section>

          <form
            className="space-y-10 md:space-x-5 py-5"
            onSubmit={handleSubmit}
          >
            <div className="flex relative items-end justify-center">
              {/* <label
              htmlFor="fileInput"
              className="flex absolute cursor-pointer p-3 bg-gray-100 rounded-full  ml-28 shadow  hover:shadow-lg"
            >
              <FaPen className="text-gray-700 " />
            </label> */}
              <img
                src="https://i.ibb.co/CQC8g2h/login.png"
                alt=""
                className="h-32 w-32 object-cover rounded-full shadow-xl"
              />
              <input className="hidden" type="file" id="fileInput" />
            </div>

            <div className="flex flex-grow flex-col space-y-5 justify-center">
              <input
                type="text"
                placeholder="Full Name"
                className="input"
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                className="input"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-grow items-center justify-between space-x-3">
                <button className="button" type="submit">
                  Sign Up
                </button>
              </div>
              {error && (
                <span className="font-medium text-lg text-red-500">
                  Please try again with valid data!
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="relative hidden md:inline-flex flex-grow w-2/4 items-center justify-center">
          <span className="z-30 flex absolute h-full w-full bg-indigo-700 bg-opacity-60 items-center justify-center text-white font-bold text-5xl uppercase"></span>

          <img
            src="https://images.unsplash.com/photo-1600275668998-134e47cff95a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
            alt=""
            className="h-full object-cover "
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
