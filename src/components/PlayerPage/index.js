import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

import { getPlayerId, getPlayerStatistics, getTankNameById } from '../../backend/api/index.js';

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75vh;
`

const PlayerPage = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const TextFont = styled.div`
    font-size: ${({ $font }) => $font} !important;
    color: white;
`

const TopStats = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const StatsContainer = styled.div`
    display: flex;
    font-size: 36px;
    color: white;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const RecentStats = styled.div`
`

const NameContainer = styled.div`
    display: flex;
    justify-content: left;
    font-size: 52px;
    color: white;
    margin-left: 100px;
`

const statContainer = {

};

function PlayerStatsPage() {
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
            {loading ? 
                <Loader>
                    <ClipLoader
                        size={150}
                        color={'white'}
                        loading={loading}
                    />
                </Loader>
                :
                <PlayerPage>
                    <TopStats>
                        <NameContainer>
                            {name}
                        </NameContainer>
                        <StatsContainer>
                            <TextFont $font={'18px'}>
                                Recent WN8: <br />
                            </TextFont>
                            ---
                        </StatsContainer>
                        <StatsContainer>
                            <TextFont $font={'18px'}>
                                Recent Win Rate: <br />
                            </TextFont>
                            ---
                        </StatsContainer>
                        <StatsContainer>
                            <TextFont $font={'18px'}>
                                Overall WN8: <br />
                            </TextFont>
                            {Math.floor(wn8)}
                        </StatsContainer>
                        <StatsContainer>
                            <TextFont $font={'18px'}>
                                Win Rate: <br />
                            </TextFont>
                            {Math.floor(wn8)}
                        </StatsContainer>
                    </TopStats>
                </PlayerPage>
            }
        </div>
    );

}

export default PlayerStatsPage;
