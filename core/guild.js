const GlobalVariables = require("../globals/variables.js");

async function getGuild() {
    return GlobalVariables.client.guilds.cache.find((guild) => guild.id === GlobalVariables.GamedockGuild);
}

module.exports = {
    getGuild: getGuild
};