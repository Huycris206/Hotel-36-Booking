import React from 'react'
import { Link } from 'react-router-dom';


const Logo = () => {
  return (
    <div>
        <Link to="/"className="flex items-center gap-6">
          <div className="text-2xl font-bold text-orange-500 cursor-pointer">KS36</div>
        </Link>
    </div>
  )
}

export default Logo
