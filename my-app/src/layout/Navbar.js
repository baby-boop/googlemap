import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Google map test
                </Link>

            <Link className='btn btn-outline-light' to="/map">
                Газрын зураг
            </Link>
            <Link className='btn btn-outline-light bg-primary' to="/arcgis">
                ARCgis
            </Link>
  
            </div>
        </nav>
    </div>
  )
}
