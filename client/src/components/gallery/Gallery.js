import GalleryItem from "./GalleryItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";

function Gallery() {
  const [posts, setPosts] = useState([]);
  const PublicFolder = "http://localhost:5000/images/";
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);


  return (
    <section className="justify-center">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 py-3">
        {posts.slice(0, 6).reverse().map((post) => (
          <GalleryItem photo={PublicFolder + post.picture}/>
        ))}
        </div>
    </section>
  );
}

export default Gallery;

