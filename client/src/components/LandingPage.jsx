import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    return(
        <div className='landing'>
            <br />
            <h1 className='landing_title'>Welcome to <br/> Videogame App</h1>
           
            
            <Link to = '/home'>
                <button className='landing_btn'>START</button>
            </Link>
            
            
        </div>
    );
};



