import React from 'react'
import { Link } from 'react-router-dom'
const SignInBtn = () => {
  return (
    <Link to="/register" className="bg-white text-orange-500 border border-orange-500 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-orange-500 hover:text-white transition">
        Đăng ký
    </Link>
  )
}

export default SignInBtn
