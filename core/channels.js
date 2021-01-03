const GlobalVariables = require("../globals/variables.js");

async function getChannel(channelName) {
    return GlobalVariables.client.channels.cache.find((channel) => channel.name === channelName)
}

async function deleteTempChannel(channelName) {
    let channel = await getChannel(channelName);
    await channel.delete();
}

module.exports = {
    getChannel: getChannel,
    // createTempChannel: createTempChannel,
    deleteTempChannel: deleteTempChannel,
    // moveUser: moveUser
};

// ? Needed to apparently avoid circular dependencies, yayy messy code :D

const core = require("./core.js");
const roles = require("./roles.js");

async function createTempChannel(channelName) {
    let channel = await getChannel(channelName);
    if (channel == null) {
        console.log("createTempChannel - Creating new channel");
        let channelRole = await roles.getRole(channelName);
        let bot = await roles.getRole("Gamedock");
        let channel = await GlobalVariables.GamedockGuild.channels.create(channelName, { type: 'voice', parent: GlobalVariables.mainCatagory, bitrate: 96000, permissionOverwrites: [
            {
                id: GlobalVariables.GamedockGuild.roles.everyone,
                deny: ['CONNECT'],
            },
            {
                id: channelRole,
                allow: ['CONNECT', 'SPEAK'],
            },
            {
                id: bot,
                allow: ['CONNECT', 'SPEAK'],
            },
        ],})
    }
}

async function moveUser(roleMove) {
    //https://stackoverflow.com/questions/55125513/how-do-i-move-everyone-from-a-certain-role-into-a-channel
    const team1role = await roles.getRole(roleMove);
    const team1members = team1role.members;

    const chanl = await getChannel(roleMove);

    const userVoice = await core.getUsersInVoice(GlobalVariables.mainChannel);
    for (const userNew of userVoice) {
        // console.log(userNew[1]);
        team1members.forEach((member) => {
            if (member.user.id === userNew[1].user.id) {
                member.voice.setChannel(chanl.id);
            }
        });
    }
}

module.exports.createTempChannel = createTempChannel;
module.exports.moveUser = moveUser;
