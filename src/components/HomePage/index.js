import React from 'react';
import SearchBar from '../SearchBar';
import './index.css';

function HomePage() {
    return(
        <div className='container'>
            <h1 className='header'>
                Unicum.gg
            </h1>
            <div className='search-bar-container'>
                <SearchBar
                />
            </div>
        </div>
    );
}

export default HomePage;
