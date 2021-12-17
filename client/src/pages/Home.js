import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import Slider from "../components/header/Slider";
import CatCard from "../components/Cards/CatCard";
// import AuthCard from "../components/Cards/AuthCard";
import Join from "../components/Cards/Join";
import { Context } from "../context/Context";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { Carousel } from "3d-react-carousal";
import Header from "../components/header/Header";
import { Skeleton } from "@mui/material";

function Home() {
  const { user } = useContext(Context);
  const [cats, setCats] = useState([]);
  // const [users, setUsers] = useState([]);
  const PublicFolder = "http://localhost:5000/images/";

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const [posts, setPosts] = useState([]);

  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <motion.div
      className="max-w-7xl w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="max-w-7xl w-full ">
        <div className="w-full relative items-center h-full  mt-10">
          <Carousel
            slides={posts
              .map((post) => (
                <Header
                  key={post._id}
                  picture={PublicFolder + post.picture}
                  category={post.categories}
                  title={post.title}
                  author={post.fullname}
                  userPic={
                    PublicFolder + post.userPic ||
                    "https://icon-library.com/images/default-profile-icon/default-profile-icon-8.jpg"
                  }
                  date={new Date(post.createdAt).toLocaleDateString()}
                  readMore="Read More"
                  destination={`/post/${post._id}`}
                  cat={`/posts/?cat=${post.categories}`}
                />
              ))
              .slice([posts.length - 6])
              .reverse()}
            autoplay={false}
            interval={1000}
          />

          {/* <Slider /> */}
        </div>

        <section className="mt-20">
          <h1 className="w-full flex justify-center text-xl md:text-4xl font-bold px-5 md:px-0 mb-10 ">
            Trending topics
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 justify-between gap-5 md:gap-10">
            {cats.map((c) => (
              <CatCard
                key={c._id}
                catName={c.name}
                picture={c.picture}
                link={`/posts/?cat=${c.name}`} // destination to be changed from "/"  to "/posts" when Posts page is build
                postsNr={
                  posts.filter((item) => item.categories[0] === c.name).length
                } // categories is an array of categories but with only one element. It doesn't calculate properly the number of posts if more than one categories are added to each post
              />
            ))}
          </div>
        </section>

        {/* <section>
        <h1 className="w-full flex justify-center text-xl md:text-4xl font-bold px-5 md:px-0 my-20">
          Our Authors
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 justify-between gap-5 md:gap-10">
          {users.map((a) => (
            <AuthCard authName={a.fullname} authPic={a.profilePicture} />
          ))}
        </div>
      </section> */}

        {!user && (
          <section className="mt-20">
            <Join />
          </section>
        )}
      </div>
    </motion.div>
  );
}

export default Home;
