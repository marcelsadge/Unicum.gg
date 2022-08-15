import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';

import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';

import './index.css';

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const SearchForm = styled.form`
    margin-left: 1rem;
`
const SearchBox = styled.div`
    padding: 5px 4px;
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
    width: 100%;
    font-family: 'Secular One' !important;
    color: #fff !important;
    padding-left: 20px;
    font-size: 16px;
`

const ServerButton = styled(Button)`
    font-family: 'Secular One' !important;
    font-size: 1rem !important;
    color: #111111;
    background-color: ${({ $option, $backgroundColor }) => ($option ? $backgroundColor : '#fff')} !important;
    padding: 2px 15px !important;
    &:hover {
        background-color: gray !important;
    }
`

function SearchBar() {
    const [server, setServer] = useState('1');
    const [type, setType] = useState('1');
    const [search, setSearch] = useState('');
    const navigation = useNavigate();

    const serverArray = ['NA', 'EU', 'ASIA'];
    const typeArray = ['PLYR', 'CLAN'];

    const serverOptions = [
        { server: 'NA', value: '1' },
        { server: 'EU', value: '2' },
        { server: 'ASIA', value: '3' },
    ];

    const typeOptions = [
        { type: 'PLYR', value: '1' },
        { type: 'CLAN', value: '2' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === '1') {
            navigation('/playerstat', { state: { playerName: search } });
        } else {
            navigation('/clanmap', { state: { clanName: search } });
        }
    };

    return (
        <SearchContainer>
            <ButtonContainer>
                <ButtonGroup style={{ marginRight: '5em' }}>
                    {serverOptions.map((svr, i) => (
                        <ServerButton
                            key={i}
                            $backgroundColor={'gray'}
                            $option={server === svr.value}
                            onClick={() => setServer(svr.value)}
                        >
                            {svr.server}
                        </ServerButton>
                    ))}
                </ButtonGroup>
                <ButtonGroup>
                    {typeOptions.map((t, i) => (
                        <ServerButton
                            key={i}
                            $backgroundColor={'gray'}
                            $option={type === t.value}
                            onClick={() => setType(t.value)}
                        >
                            {t.type}
                        </ServerButton>
                    ))}
                </ButtonGroup>
            </ButtonContainer>
            <br />
            <SearchForm onSubmit={handleSubmit}>
                <SearchBox>
                    <SearchInput
                        placeholder={type === '1' ? `Enter ${serverArray[parseInt(server) - 1]} Player Username` : `Enter ${serverArray[parseInt(server) - 1]} Clan Name`}
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </SearchBox>
            </SearchForm>
        </SearchContainer>
    );
}

export default SearchBar;