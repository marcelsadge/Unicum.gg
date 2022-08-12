import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { ClipLoader } from 'react-spinners';

import { getPlayerId, getPlayerStatistics, getTankNameById } from '../../api/index.js';

const loadingContainer = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '90vh',
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
                <div style={loadingContainer}>
                    <ClipLoader
                        size={150}
                        color={'#123abc'}
                        loading={loading}
                    />
                </div>
                :
                <div>
                    <h2>
                        Name: {name}
                        <br/>
                    </h2>
                    <h3>
                        WN8: {Math.floor(wn8)}
                        <br/>
                        {tankData.map((tank) => {
                            return (
                                <ui>
                                    {tank['name']}:{Math.floor(tank['wn8'])}<br/>
                                </ui>
                            );
                        })}
                    </h3>
                </div>
            }
        </div>
    );

}

export default PlayerPage;
