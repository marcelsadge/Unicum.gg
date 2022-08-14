import React from 'react';

import SearchBar from '../SearchBar';
import NavBar from '../NavBar';
import './index.css';

function HomePage() {
    return(
        <div>
            <NavBar />
            <div className='container'>
                <h1 style={{ color: '#fff', fontSize: 36 }}>
                    Unicum.gg
                </h1>
                <div className='search-bar-container'>
                    <SearchBar
                    />
                </div>
                <br />
                <h1 style={{ color: '#fff', fontSize: 12 }}>
                    The Most Competitive Stats Site For World Of Tanks
                </h1>
            </div>
        </div>
    );
}

export default HomePage;
