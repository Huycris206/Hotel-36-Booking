import React from 'react'
import { useState } from 'react'

import Header from '@/components/layout/header/Header.jsx'
import Footer from '@/components/layout/Footer.jsx'
import RoomCard from '@/components/rooms/RoomCard.jsx'
import RoomList from '@/components/rooms/RoomList.jsx'
import AuroraBg from '@/components/ui/AuroraBg.jsx'
import HeaderBooking from '@/components/layout/headerBooking/HeaderBook.jsx'
const HomePage = () => {
  const [type, setType] = useState("hour");
  return (
    <AuroraBg>
      <HeaderBooking type={type} setType={setType}/>

      <div className="container mx-auto px-4">
        <RoomList timeType={type}/>
      </div>

      <Footer/>
    </AuroraBg>
  )
}

export default HomePage
