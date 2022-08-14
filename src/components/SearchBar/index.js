import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';

import './index.css';

const SearchForm = styled.form`
    margin-left: 1rem;
`
const SearchBox = styled.div`
    padding: 2px 4px;
    display: flex;
    align-items: center;
    width: 700px;
    height: 50px;
    background-color: #242729;
    color: white;
    :hover {
        background-color: #222527;
        box-shadow: 0px 1px 3px rgba(20, 20, 50, 1) ;
    }
`

const SearchInput = styled(InputBase)`
    width: 100%
`

function SearchBar() {
    const [type, setType] = useState('PLYR');
    const [search, setSearch] = useState('');
    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'PLYR') {
            navigation('/playerstat', { state: { playerName: search } });
        } else {
            navigation('/clanmap', { state: { clanName: search } });
        }
    };

    const toggleOption = () => {
        if (type === 'PLYR') {
            setType('CLAN');
        } else {
            setType('PLYR');
        }
    };
    /*
    return (
        <div>
            <div className='search-row'>
                <form onSubmit={handleSubmit}>
                    <input 
                        className='search-bar'
                        placeholder={type === 'PLYR' ? 'Enter Player Name' : 'Enter Clan Name'}
                        type='text' 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <button onClick={toggleOption}>
                    {type}
                </button>
            </div>
        </div>
    );
    */
    return (
        <SearchForm onSubmit={handleSubmit}>
            <SearchBox>
                <SearchInput
                    placeholder={type === 'PLYR' ? 'Enter Player Username' : 'Enter Clan Name'}
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                />
            </SearchBox>
        </SearchForm>
    );
}

export default SearchBar;