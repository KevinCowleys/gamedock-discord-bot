const Discord  = require("discord.js");
const Users = require("../schemas/users");
const { prefix } = require("../config.json");

//https://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812
module.exports = {
    name: 'help',
    alias: 'h',
    description: 'Shows command all commands for the bot.',
    usage: "[command | alias]",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('#91A6A6')
            .setTitle('Commands:')
            // .setDescription('Shows command all commands for the bot')
            .setFooter('')
            .addFields(
                { name: `${prefix} help`, value: 'Shows command all commands for the bot.', inline: false },
                { name: `${prefix} linkDiscord [ESEA-ID]`, value: 'Links discord account to Gamedock ESEA database.', inline: false },
                { name: `${prefix} removeDiscord [Discord-ID]`, value: 'Removes discord account to Gamedock ESEA database. (Admin command)', inline: false },
            )
        return message.channel.send(embed);
    },
};