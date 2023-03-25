import React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from '../../utils/utils'
import './style.scss'

export default function Sidebar() {
  return (
    <div className="col-auto px-0">
    <div id="sidebar" className="collapse collapse-horizontal show border-end" style={{height:'100%', backgroundColor:'var(--primary-color)'}}>
        <div className="sidebar-header"><span>SIDEBAR</span></div>
        <div id="sidebar-nav" className="list-group border-0 rounded-0 text-sm-start" style={{}}>
            <Link className='list-group-item border-end-0 d-inline-block text-truncate nav-link' to={'/'} relative="route">DashBoard</Link>
       </div>
       <button onClick={Logout} className='btn btn-primary mt-5 ms-4'>Logout</button>

    </div>
</div>
  )
}

