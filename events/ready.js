const { prefix } = require("../config.json");
const core = require("../core/core.js");
const channel = require("../core/channels.js");
const guild = require("../core/guild.js");
const cronJobs = require("../core/cron-jobs.js");
const GlobalVariables = require("../globals/variables.js");

module.exports = async(client) => {
    try {
        console.log(`Logged in as ${client.user.tag}!`)
        client.user.setPresence({ activity: { name: `${ prefix } help`, type: "LISTENING" }, status: "online" });

        GlobalVariables.GamedockGuild = await guild.getGuild();
        GlobalVariables.textChannel = await channel.getChannel('pug-bot');
        GlobalVariables.mainCatagory = await channel.getChannel('ESEA');
        GlobalVariables.mainCatagory = GlobalVariables.mainCatagory["id"];
        GlobalVariables.mainChannel = await channel.getChannel('pug-queue');
        GlobalVariables.mainChannel = GlobalVariables.mainChannel["id"];

        cronJobs.startCron();
    } catch (e) {
        console.log(e);
    }
};