import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

import { getPlayerId, getPlayerStatistics, getTankNameById } from '../../api/index.js';

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const PlayerContainer = styled.div`
    display: flex;
    padding: 5px;
`

const statContainer = {

};

function PlayerPage() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [wn8, setWn8] = useState([]);
    const [tankData, setTankData] = useState([]);

    const location = useLocation();

    const getPlayerData = async () => {
        const player = await getPlayerId(location.state.playerName.toLowerCase());
        setName(player[1]);
        await getPlayerStatistics(player[0])
            .then((response) => {
                console.log(response);
                setWn8(response['overallWn8']);
                setTankData(response['tankData']);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!localStorage.getItem("1")) {
            getTankNameById();
        }
        setLoading(true);
        getPlayerData();
    }, []);

    return (
        <div>
            {
                loading ? 
                <Loader>
                    <ClipLoader
                        size={150}
                        color={'white'}
                        loading={loading}
                    />
                </Loader>
                :
                <PlayerContainer>
                </PlayerContainer>
            }
        </div>
    );

}

export default PlayerPage;
