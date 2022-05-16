import React from 'react';
import './index.css';

function SearchBar() {
    const changeColorOnEnter = (e) => {
        e.target.style.background = '#3e2d72';
    };

    const changeColorOnLeave = (e) => {
        e.target.style.background = '#2d2055';
    };

    return (
        <div className='search-bar' onMouseEnter={changeColorOnEnter} onMouseLeave={changeColorOnLeave}>
            <form>
                <label className='search-label'>
                    Enter Clan Name
                </label>
            </form>
        </div>
    );
}

export default SearchBar;