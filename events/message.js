const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = async (client, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // * Command doesn't exist, return
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch(error) {
        console.error(error);
        message.reply('There was an issue with the command!');
    }
}