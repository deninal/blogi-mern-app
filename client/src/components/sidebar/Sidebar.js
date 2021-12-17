import axios from "axios";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="inline-flex space-x-2 md:space-x-3">

      {cats.map((c) => (
        <SidebarItem
          category={c.name}
          link={`/posts/?cat=${c.name}`} // destination to be changed from "/"  to "/posts" when Posts page is build
        />
      ))}
    </div>
  );
}

export default Sidebar; 
