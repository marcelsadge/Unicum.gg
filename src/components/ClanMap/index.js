import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getClanMapData, getClanId } from '../../api/index.js';

function ClanMap() {
    const [clanId, setClanId] = useState('');
    const [clanData, setClanData] = useState([]);

    const location = useLocation();

    useEffect(() => {
        const getData = async () => {
            const id = await getClanId(location.state.clanName);
            setClanId(id);
            getClanMapData(id);
        }
        getData();
    }, []);
    
    return (
        <div>
            <h1>
                {clanId}
            </h1>
        </div>
    );
}

export default ClanMap;
