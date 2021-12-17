import {  useEffect, useState } from "react";

import PostCard from "../components/posts/PostCard";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [cats, setCats] = useState([]);
  const PublicFolder = "http://localhost:5000/images/";

  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <motion.div
      className="max-w-7xl w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="max-w-7xl w-full ">
        <section className="py-5 overflow-x-scroll scrollbar-hide md:overflow-hidden">
          <Sidebar className="flex " />
        </section>

        <div className="flex items-center justify-between">
          {posts.length > 0 ? (
            <h1 className="flex text-xl md:text-4xl font-bold px-5 md:px-0 ">
              Latest Articles
            </h1> //{posts[0].categories}
          ) : (
            <h1 className="flex text-xl md:text-4xl font-bold px-5 md:px-0 ">
              No articles found
            </h1>
          )}

          <Link to={"/posts"}>
            <button className="button">All Articles</button>
          </Link>
        </div>

        <section className="grid md:grid-cols-2 4xl:grid-cols-3 md:gap-10 py-5 gap-5 md:py-10 px-5 md:px-0 ">
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <PostCard
                key={post._id}
                category={post.categories}
                title={post.title}
                author={post.fullname}
                userPic={
                  PublicFolder + post.userPic ||
                  "https://icon-library.com/images/default-profile-icon/default-profile-icon-8.jpg"
                }
                picture={PublicFolder + post.picture}
                date={new Date(post.createdAt).toLocaleDateString()}
                readMore="Read More"
                destination={`/post/${post._id}`}
                cat={`/posts/?cat=${post.categories}`}
                authDest={`/posts/?user=${post.fullname}`}
              />
            ))}
        </section>
      </div>
    </motion.div>
  );
}

export default Posts;
