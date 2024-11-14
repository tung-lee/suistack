import React from 'react'
// import comming from '../assets/comming.png'

const CommingToolbar = () => {
  return (
    <div className="flex items-center gap-2 p-2">
      <img src={'./comming.png'} alt="Coming soon" className="w-6 h-6" />
      <span className="text-gray-600">Coming Soon</span>
    </div>
  )
}

export default CommingToolbar
