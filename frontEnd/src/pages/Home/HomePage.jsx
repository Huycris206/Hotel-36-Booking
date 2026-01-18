import React from 'react'
import QuizApp from '../../components/ui/Quiz.jsx'
import Header from '@/components/ui/header.jsx'
import Footer from '@/components/ui/footer.jsx'
const HomePage = () => {
  return (
    <div className="min-h-screen w-full relative w-screen">
        {/* Aurora Silk Fade Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(150deg, #B39DDB 0%, #D1C4E9 20%, #F3E5F5 40%, #FCE4EC 60%, #FFCDD2 80%, #FFAB91 100%)`,
        }}
      /> 
      <div className="relative z-10 ">
        <Header/>

        <main className="max-w-2xl -6 mx-auto space-y-6">
          <QuizApp/>
        </main>

        <Footer/>
      </div>
        
    </div>    
  )
}

export default HomePage
