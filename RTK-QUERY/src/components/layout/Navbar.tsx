import React from 'react'
import { Link } from 'react-router'
import { ModeToggle } from '../mode-toggoler'

export default function Navbar() {
  return (
    <div className='p-8'>
     <div> This is navbar</div>
    <div>
        <button className='p-4'><Link to="/tasks">Tasks</Link></button>
      <button><Link to="/users">Users</Link></button>
    </div>
      <div>
        <ModeToggle></ModeToggle>
      </div>
    </div>
  )
}
