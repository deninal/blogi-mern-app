import axios from "axios";
import { useEffect, useState } from "react";
import {Carousel} from '3d-react-carousal';
import { useLocation } from "react-router";
import Header from "./Header";

function Slider() {
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
  
  const slides = posts
  .map((post) => (
    <Header
      key={post._id}
      picture={PublicFolder + post.picture}
      category={post.categories}
      title={post.title}
      author={post.fullname}
      userPic={
        PublicFolder+post.userPic||
       "https://icon-library.com/images/default-profile-icon/default-profile-icon-8.jpg"
     }
      date={new Date(post.createdAt).toLocaleDateString()}
      readMore="Read More"
      destination={`/post/${post._id}`}
      cat={`/posts/?cat=${post.categories}`}
    />
  )).slice([posts.length - 5])
  

  

  return (
    <div className="w-full relative items-center justify-center">
      <Carousel slides={slides} autoplay={false} interval={1000}/>
      {/* <div>
        {posts
          .map((post) => (
            <Header
              key={post._id}
              picture={PublicFolder + post.picture}
              category={post.categories}
              title={post.title}
              author={post.fullname}
              userPic={
                PublicFolder+post.userPic||
               "https://icon-library.com/images/default-profile-icon/default-profile-icon-8.jpg"
             }
              date={new Date(post.createdAt).toLocaleDateString()}
              readMore="Read More"
              destination={`/post/${post._id}`}
              cat={`/posts/?cat=${post.categories}`}
            />
          ))
          .slice([posts.length - 1])}
      </div> */}
    </div>
  );
}

export default Slider;
