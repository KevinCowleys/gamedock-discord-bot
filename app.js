const Discord = require("discord.js");
const { token } = require("./config.json");
var GlobalVariables = require("./globals/variables.js");
GlobalVariables.client = new Discord.Client();

const fs = require("fs");

GlobalVariables.client.events = new Discord.Collection();
GlobalVariables.client.commands = new Discord.Collection();
GlobalVariables.client.mongo = require("./mongo");

// * Starting all events
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    GlobalVariables.client.on(eventName, event.bind(null, GlobalVariables.client));
}

// * Getting command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    GlobalVariables.client.commands.set(command.name, command);
}

GlobalVariables.client.mongo.init();
GlobalVariables.client.login(token);

console.log("Hello from the discord bot file");