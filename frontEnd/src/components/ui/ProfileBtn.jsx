import { Link } from "react-router-dom";
import { User } from "lucide-react";

const ProfileBtn = ({ name,index=0 }) => {
  return (
    <Link
      to="/profile"
      className="flex items-center gap-1 text-gray-700 hover:text-orange-500"
    >
      {index===0?(
        <>
        <User size={18} />
        <span className="text-sm font-medium">
          {name || "User"}
        </span>
        </>
      ):(
        <User size={18} />
      )}
    </Link>
  );
};

export default ProfileBtn;