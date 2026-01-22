import React from 'react'
import { Link } from 'react-router-dom'
const LoginBtn = () => {
  return (
    <Link to="/login" className="text-orange-500 font-medium hover:text-orange-400">Đăng nhập</Link>
  )
}

export default LoginBtn
