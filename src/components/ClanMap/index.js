import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ForceGraph3D from 'react-force-graph-3d';

import { getClanMapData, getClanId } from '../../api/index.js';

function ClanMap() {
    const isMounted = useRef(false);
    const [loading, setLoading] = useState(true);
    const [clanId, setClanId] = useState('');
    const [adjMap, setAdjMap] = useState(null);
    const [uniqueClans, setUniqueClans] = useState([]);

    const location = useLocation();

    const getData = async () => {
        const id = await getClanId(location.state.clanName);
        if (isMounted.current) {
            setClanId(id);
            const results = await getClanMapData(id)
                .then((result) => {
                    return result;
                });
            setAdjMap(results[0]);
            setUniqueClans(results[1]);
            setLoading(false);
        }
    }

    const generateClanGraph = () => {
        let edgeArray = [];
        const edges = Array.from(adjMap.keys());
        for (const element of edges) {
            let temp = {
                source: element[0],
                target: element[1],
                weight: adjMap.get(element),
            };
            edgeArray.push(temp);
        }
        console.log(uniqueClans)
        const uniqueNodes = uniqueClans.map((clan) => ({
            id: clan.clan_id,
            name: clan.tag,
            img: `https://na.wargaming.net/clans/media/clans/emblems/cl_369/${clan.clan_id}/emblem_256x256.png`,
        }));
        console.log(uniqueNodes);
        return {
            nodes: uniqueNodes,
            links: edgeArray
        };
    };

    useEffect(() => {
        isMounted.current = true;
        getData();
        return () => {
            isMounted.current = false;
            setAdjMap('');
            setClanId('');
            setLoading(false);
            setUniqueClans([]);
        };
    }, []);
    
    return (
        <div>
            {loading ? <h1>Loading...</h1> : 
            <ForceGraph3D
                graphData={generateClanGraph()}
                linkDirectionalParticles={1}
                linkDirectionalParticleWidth={2}
                linkDirectionalParticleColor={() => "red"}
            />
            }
        </div>
    );
}

export default ClanMap;
