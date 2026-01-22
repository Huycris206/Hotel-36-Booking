import React from 'react'
import QuizApp from '../../components/ui/Quiz.jsx'
import Header from '@/components/ui/header/Header.jsx'
import Footer from '@/components/ui/footer.jsx'
import RoomCard from '@/components/rooms/RoomCard.jsx'
import RoomList from '@/components/rooms/RoomList.jsx'
import AuroraBg from '@/components/ui/AuroraBg.jsx'
const HomePage = () => {
  return (
    <AuroraBg>
      <Header/>

      <div className="container mx-auto px-4">
        <RoomList/>
      </div>

      <Footer/>
    </AuroraBg>
  )
}

export default HomePage
