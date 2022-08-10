import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { getPlayerId, getPlayerStatistics } from '../../api/index.js';

function PlayerPage() {

    const [playerData, setPlayerData] = useState([]);

    const location = useLocation();

    const getPlayerData = async () => {
        const player_id = await getPlayerId(location.state.playerName);
        const playerJson = await getPlayerStatistics(player_id);
    };

    useEffect(() => {
        getPlayerData();

    }, []);

    return (
        <div>
            {}
        </div>
    );

}

export default PlayerPage;
