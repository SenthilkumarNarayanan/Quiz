import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <button>link</button>
    <Link to="/App" className='btn'> Start Quiz</Link>
    </div>
  )
}

export default Start
