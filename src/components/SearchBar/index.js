import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function SearchBar() {
    const [search, setSearch] = useState('');
    const navigation = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigation('/clanmap', { state: { clanName: search } });
    };

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input 
                    className='search-bar'
                    placeholder='Enter Clan Name (e.g. MELLY)'
                    type='text' 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    onSubmit={handleSubmit}
                />
            </form>
        </div>
    );
}

export default SearchBar;