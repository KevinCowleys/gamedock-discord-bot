const Users = require("../schemas/users");
const Matches = require("../schemas/matches");
const GlobalVariables = require("../globals/variables.js");

const { spawn } = require('child_process');

//https://stackoverflow.com/questions/39897505/python-and-node-js-on-heroku/39947385#39947385

// * Gets the ESEA ID from the DB while passing through their discord ID
async function getIDFromDB(DiscordID) {
    for await (const result of Users.findOne({discord: DiscordID})) {
        return result
    }
}

// * Gets the Discord ID from the DB while passing through their ESEA ID
async function getDiscordDB(ESEAID) {
    for await (const result of Users.findOne({id: ESEAID})) {
        return result
    }
}

// * Gets user from the ESEA API through a python script and returns the matchID if it exists
async function getUserESEA(fetchUserESEA) {
    const childPython = spawn('python3', [`${process.cwd()}/python/getUserESEA.py`, fetchUserESEA]);

    for await (const data of childPython.stdout) {
        dataMod = data.toString().replace(/\s/g, '');
        console.log(`matchID: ${dataMod}`);
        return dataMod;
    }
}

async function getMatchDB(matchID) {
    for await (const result of Matches.findOne({"data.id": {$eq: matchID}})) {
        return result
    }
}

async function getMatchESEA(matchID) {
    const childPython = spawn('python3', [`${process.cwd()}/python/getMatchESEA.py`, matchID]);

    for await (const data of childPython.stdout) {
        let dataMod = data.toString().replace(/'/g,"\"").replace(/None/g,"null").replace(/True/g,"true").replace(/False/g,"false");
        dataMod = JSON.parse(dataMod);
        return dataMod;
    }
}

async function getUsersInVoice(voiceChannel) {
    var membersInVoice = [];
    let channel = await GlobalVariables.GamedockGuild.channels.cache.get(voiceChannel);
    for (const member of channel.members) {
        membersInVoice.push(member);
    }
    return membersInVoice;
}

module.exports = {
    getIDFromDB: getIDFromDB,
    getDiscordDB: getDiscordDB,
    getUserESEA: getUserESEA,
    getMatchDB: getMatchDB,
    getMatchESEA: getMatchESEA,
    getUsersInVoice: getUsersInVoice
};