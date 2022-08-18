import React from 'react';

import SearchBar from '../SearchBar';
import './index.css';

function HomePage() {
    return(
        <div>
            <div className='container'>
                <h1 style={{ color: '#fff', fontSize: 100 }}>
                    Insert Title
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
