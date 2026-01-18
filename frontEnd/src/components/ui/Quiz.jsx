import React from 'react';
const gay=["mẹ mày béo","ba mày gay","ông mày hói"
]
const QuizApp = () => {
  return (
    <div className='flex flex-col gap-4'>
      {gay.map((item, index)=>(
        <button key={index} className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors shadow-sm font-medium">{item}</button>
      ))}
    </div>
  )
}

export default QuizApp
