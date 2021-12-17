import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { motion } from "framer-motion";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
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
                Login to continue
              </h3>
            </div>
            <Link to="/register">
              <p className="underline text-lg font-semibold cursor-pointer text-gray-600">
                Register
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
                className="h-32 w-32 object-cover rounded-full shadow-xl "
              />
              <input className="hidden" type="file" id="fileInput" />
            </div>
            <div className="flex flex-grow flex-col space-y-5 justify-center">
              <input
                type="text"
                placeholder="Username"
                className="input"
                ref={userRef}
              />

              <input
                type="password"
                placeholder="Password"
                className="input"
                ref={passwordRef}
              />
              <div className="flex flex-grow items-center justify-between space-x-3">
                <button
                  className="button disabled:opacity-50"
                  type="submit"
                  disabled={isFetching}
                >
                  Login
                </button>
                <p className="hover:underline cursor-pointer">
                  Forgot Password?
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="relative hidden md:inline-flex flex-grow  lg:w-1/2  items-center justify-center">
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

export default Login;
