import { Link } from "react-router-dom";
import { User } from "lucide-react";

const ProfileBtn = ({ name }) => {
  return (
    <Link
      to="/profile"
      className="flex items-center gap-1 text-gray-700 hover:text-orange-500"
    >
      <User size={18} />
      <span className="text-sm font-medium">
        {name || "User"}
      </span>
    </Link>
  );
};

export default ProfileBtn;