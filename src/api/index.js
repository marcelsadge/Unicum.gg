
const api_key = 'a1ade2adb0a147e81c3115c498bbb1c7';

export async function getClanId(clan) {
    const data = await fetch(`https://api.worldoftanks.com/wot/clans/list/?application_id=${api_key}&search=${clan}`, {
        method: 'GET'
    }).then((response) => response.json())
        .then((result) => {
            return result.data;
        });
    for (const element in data) {
        if (data[element]['tag'] === clan) {
            return data[element]['clan_id'];
        }
    }
    return '';
}

export async function getClanMapData(id) {
    let adjMap = new Map();
    let uniqueClans = [];
    let clanData = [];
    const clanInfo = await fetch(`https://api.worldoftanks.com/wot/clans/info/?application_id=${api_key}&clan_id=${id}`, {
        method: 'GET'
    }).then((response) => response.json())
        .then((result) => {
            return result.data;
        });
    const clanMembers = clanInfo[id]['members'];
    for (const member of clanMembers) {
        const member_id = member.account_id;
        const clanHistory = await fetch(`https://api.worldoftanks.com/wot/clans/memberhistory/?application_id=${api_key}&account_id=${member_id}`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((result) => {
                return result.data;
            });
        let currClan = id;
        for (const clan of clanHistory[member_id]) {
            const clan_id = clan.clan_id;
            const arr = [clan_id, currClan];
            if (!uniqueClans.includes(clan_id)) {
                uniqueClans.push(clan_id);
                const query = await fetch(`https://api.worldoftanks.com/wot/clans/info/?application_id=${api_key}&clan_id=${clan_id}`, {
                    method: 'GET'
                }).then((response) => response.json())
                    .then((result) => {
                        return result.data;
                    });
                clanData.push(query[clan_id.toString()]);
            }
            if (!(arr in adjMap)) {
                adjMap.set([clan_id, currClan], 1);
                currClan = clan_id;
            } else {
                let count = adjMap.get([clan_id, currClan]);
                count += 1;
                adjMap.set([clan_id, currClan], count);
            }
        }
    }
    return [adjMap, clanData];
}

export async function getPlayerId(player) {
    const id = await fetch(`https://api.worldoftanks.com/wot/account/list/?application_id=${api_key}&search=${player}`, {
        method: 'GET'
    }).then((response) => response.json())
        .then((result) => {
            return result.data;
        });
    for (const element in id) {
        if (id[element]['nickname'].toLowerCase() === player) {
            return id[element]['account_id'];
        }
    }
    return '';
}

export async function getPlayerStatistics(player_id) {
    const expectedValues = await fetch(`https://static.modxvm.com/wn8-data-exp/json/wn8exp.json`, {
        method: 'GET'
    }).then((response) => response.json())
        .then((result) => {
            return result.data;
        });
    const valuesMap = new Map();
    for (const value in expectedValues) {
        valuesMap.set(expectedValues[value]['IDNum'], expectedValues[value]);
    }
    const playerStats = await fetch(`https://api.worldoftanks.com/wot/tanks/stats/?application_id=${api_key}&account_id=${player_id}`, {
        method: 'GET'
    }).then((response) => response.json())
        .then((result) => {
            return result.data;
        });
    let stats = {};
    const vehicles = playerStats[player_id];
    for (const element in vehicles) {
        const focus = vehicles[element]['all'];
        if (focus['battles'] !== 0) {
            let currVehicle = {};
            currVehicle['avg_dmg'] = focus['damage_dealt'] / focus['battles'];
            currVehicle['avg_spots'] = focus['spotted'] / focus['battles'];
            currVehicle['avg_frag'] = focus['frags'] / focus['battles'];
            currVehicle['avg_def'] = focus['dropped_capture_points'] / focus['battles'];
            currVehicle['wr'] = focus['wins'] / focus['battles'];

            const vehicleExp = valuesMap.get(vehicles[element]['tank_id']);
            if (vehicleExp) {
                const DAMAGEr   = currVehicle['avg_dmg'] / vehicleExp.expDamage;
                const SPOTr     = currVehicle['avg_spots'] / vehicleExp.expSpot;
                const FRAGr     = currVehicle['avg_frag'] / vehicleExp.expFrag;
                const DEFr      = currVehicle['avg_def'] / vehicleExp.expDef;
                const WINr      = currVehicle['wr'] * 100 / vehicleExp.expWinRate;

                const WINc     = Math.max(0, (WINr - 0.71) / (1 - 0.71));
                const DAMAGEc  = Math.max(0, (DAMAGEr - 0.22) / (1 - 0.22));
                const FRAGc    = Math.max(0, Math.min(DAMAGEr + 0.2, (FRAGr - 0.12) / (1 - 0.12)));
                const SPOTc    = Math.max(0, Math.min(DAMAGEr + 0.1, (SPOTr - 0.38) / (1 - 0.38)));
                const DEFc     = Math.max(0, Math.min(DAMAGEr + 0.1, (DEFr - 0.1) / (1 - 0.1)));

                const WN8 =
                    980 * DAMAGEc +
                    210 * DAMAGEc * FRAGc +
                    155 * FRAGc * SPOTc +
                    75 * DEFc * FRAGc +
                    145 * Math.min(1.8, WINc);

                stats[vehicles[element]['tank_id']] = { 
                    'wn8': WN8, 
                    'avg_dmg': currVehicle['avg_dmg'],
                    'avg_spots': currVehicle['avg_spots'],
                    'avg_frag': currVehicle['avg_frag'],
                    'avg_def': currVehicle['avg_def'],
                    'wr': currVehicle['wr'],
                };
            }
        }
    }
    return stats;
}
