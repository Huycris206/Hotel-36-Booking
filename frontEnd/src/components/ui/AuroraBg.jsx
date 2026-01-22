import React from 'react'

const AuroraBg = ({children,}) => {
  return (
    <div className="min-h-screen w-full relative w-screen flex flex-col ">
        {/* Aurora Silk Fade Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(150deg, #B39DDB 0%, #D1C4E9 20%, #F3E5F5 40%, #FCE4EC 60%, #FFCDD2 80%, #FFAB91 100%)`,
        }}
      /> 
      <div className="relative z-10 space-y-6 flex flex-col flex-1 ">
        {children}
      </div>
        
    </div>
  )
}

export default AuroraBg
