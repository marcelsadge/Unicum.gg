
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
            return data[element].clan_id;
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
    console.log(clanData);
    return [adjMap, clanData];
}
