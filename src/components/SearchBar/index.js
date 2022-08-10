import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function SearchBar() {
    const [type, setType] = useState('PLYR');
    const [search, setSearch] = useState('');
    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'PLYR') {
            navigation('/playerstat', { state: { playerName: search.toLowerCase() } });
        } else {
            navigation('/clanmap', { state: { clanName: search.toUpperCase() } });
        }
    };

    const toggleOption = () => {
        if (type === 'PLYR') {
            setType('CLAN');
        } else {
            setType('PLYR');
        }
    };

    return (
        <div className='search-row'>
            <form onSubmit={handleSubmit}>
                <input 
                    className='search-bar'
                    placeholder='Enter Clan Name'
                    type='text' 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <button onClick={toggleOption}>
                {type}
            </button>
        </div>
    );
}

export default SearchBar;