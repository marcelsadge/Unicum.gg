import { wn8Formula } from "./util";

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
    const plyrStats = calculateOverallWN8(player_id, valuesMap, playerStats);
    return plyrStats;
}

export async function calculateOverallWN8(player_id, valuesMap, playerStats) {
    let stats = {};
    let totalDamage = 0;
    let totalFrags = 0;
    let totalSpots = 0;
    let totalDef = 0;
    let totalWr = 0;
    let totalExpDamage = 0;
    let totalExpFrag = 0;
    let totalExpSpot = 0;
    let totalExpDef = 0;
    let totalExpWr = 0;
    const vehicles = playerStats[player_id];
    for (const element in vehicles) {
        const tank = vehicles[element]['all'];
        if (tank['battles'] !== 0) {
            let currVehicle = {};
            const vehicleExp = valuesMap.get(vehicles[element]['tank_id']);
            if (vehicleExp) {
                currVehicle['avg_dmg'] = tank['damage_dealt'] / tank['battles'];
                currVehicle['avg_spots'] = tank['spotted'] / tank['battles'];
                currVehicle['avg_frag'] = tank['frags'] / tank['battles'];
                currVehicle['avg_def'] = tank['dropped_capture_points'] / tank['battles'];
                currVehicle['wr'] = tank['wins'] / tank['battles'];

                totalDamage += tank['damage_dealt'];
                totalFrags += tank['frags'];
                totalSpots += tank['spotted'];
                totalDef += tank['dropped_capture_points'];
                totalWr += (currVehicle['wr'] * 100) * tank['battles'];

                totalExpDamage += vehicleExp.expDamage * tank['battles'];
                totalExpFrag += vehicleExp.expFrag * tank['battles'];
                totalExpSpot += vehicleExp.expSpot * tank['battles'];
                totalExpDef += vehicleExp.expDef * tank['battles'];
                totalExpWr += vehicleExp.expWinRate * tank['battles'];

                if (vehicleExp) {
                    const WN8 = wn8Formula(currVehicle['avg_dmg'], currVehicle['avg_spots'], currVehicle['avg_frag'], 
                        currVehicle['avg_def'], currVehicle['wr'] * 100, vehicleExp.expDamage, vehicleExp.expSpot,
                            vehicleExp.expFrag, vehicleExp.expDef, vehicleExp.expWinRate);
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
    }
    const overallWN8 = wn8Formula(totalDamage, totalSpots, totalFrags, totalDef, totalWr,
            totalExpDamage, totalExpSpot, totalExpFrag, totalExpDef, totalExpWr);
    stats['overallWn8'] = overallWN8;
    return stats;
}

export async function getPlayerOverallStats(player_id) {
    const overallStats = await fetch(`https://api.worldoftanks.com/wot/account/info/?application_id=${api_key}&account_id=${player_id}`, {
        method: 'GET'
    }).then((response) => response.json())
        .then((result) => {
            return result.data;
        });
    return overallStats;
}
