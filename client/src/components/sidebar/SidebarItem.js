import { Link } from "react-router-dom";

function SidebarItem({ category, link }) {
  return (
    <div className="mb-5">
      <Link to={link}>
        <a href="#" className="text-indigo-500 mr-2 font-medium text-lg hover:underline">
          #{category}
        </a>
      </Link>
    </div>
  );
}

export default SidebarItem;
