import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { ClipLoader } from 'react-spinners';

import { getPlayerId, getPlayerStatistics } from '../../api/index.js';

const loadingContainer = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '90vh',
};

function PlayerPage() {
    const [loading, setLoading] = useState(false);
    const [playerData, setPlayerData] = useState([]);

    const location = useLocation();

    const getPlayerData = async () => {
        const player_id = await getPlayerId(location.state.playerName);
        const playerJson = await getPlayerStatistics(player_id)
            .then((response) => {
                console.log(response);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        getPlayerData();
    }, []);

    return (
        <div>
            {
                loading ? 
                <div style={loadingContainer}>
                    <ClipLoader
                        size={150}
                        color={'#123abc'}
                        loading={loading}
                    />
                </div>
                :
                <h1>Loaded</h1>
            }
        </div>
    );

}

export default PlayerPage;
