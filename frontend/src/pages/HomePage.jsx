import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  return (
     
    <div>
        
        <h1 className='text-red-300'>welcome</h1>
        <button className='btn btn-secondary' onClick={()=>toast.success("this is scuccess toast")}>click me</button>
    </div>
  )
}

export default HomePage