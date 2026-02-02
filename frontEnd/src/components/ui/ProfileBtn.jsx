import { Link } from "react-router-dom";
import { User } from "lucide-react";

const ProfileBtn = ({ name,index=0 }) => {
  return (
    <Link
      to="/profile"
      className="flex items-center gap-3 text-gray-700 hover:text-orange-500 px-4 py-3"
    >
      {index===0?(
        <>
        <User size={18} />
        <span className="text-sm font-medium">
          {name || "Tài Khoản"}
        </span>
        </>
      ):(
        <User size={18} />
      )}
    </Link>
  );
};

export default ProfileBtn;