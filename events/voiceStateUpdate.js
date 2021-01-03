const { prefix } = require("../config.json");
const core = require("../core/core.js");
const channels = require("../core/channels.js");
const roles = require("../core/roles.js");
const GlobalVariables = require("../globals/variables.js");
const Users = require("../schemas/users");

//https://stackoverflow.com/questions/39897505/python-and-node-js-on-heroku/39947385#39947385

module.exports = async (client, oldMember, newMember) => {

    const newUserChannel = newMember;
    const oldUserChannel = oldMember;
    const member = newMember ? newMember : oldMember;

    // Needed to check if it's already running
    // if (GlobalVariables.isCoreRunning != true) {
    //     GlobalVariables.isCoreRunning = true;
    //     await start();
    //     GlobalVariables.isCoreRunning = false;
    // }
    // else {
    //     console.log("already running");
    // }

    await start();

    async function start() {
        // * What happens when the user presses the disconect button or moves
        // * Needed to be checked first to remove old channels / roles on move
        if (oldUserChannel.channel != null) {
            if (GlobalVariables.temporaryRoles.includes(oldUserChannel.channel.name)) {
                if (oldUserChannel.channel.members.size <= 0) {
                    // * Removes removed Role from Global array
                    GlobalVariables.temporaryRoles = GlobalVariables.temporaryRoles.filter(item => item != oldUserChannel.channel.name);

                    await roles.deleteRole(oldUserChannel.channel.name);
                    await channels.deleteTempChannel(oldUserChannel.channel.name);
                }
            }
        }

        if (newUserChannel.channel != null) {
            // * What happens when the user connects or moves to pug-queue channel
            if (newUserChannel.channel.name.toLowerCase() === "pug-queue") {
                checkDiscordDB();
            }
        }
    }

    function checkDiscordDB() {
        Users.findOne({discord: member.id}, function (err, docs) {
            if (err){ 
                console.log(err) 
            } else { 
                if (docs != null)
                {
    
                } else {
                    GlobalVariables.textChannel.send(`${"<@" + member.id + ">"} you need to link your discord to the Gamedock database. Use ${ prefix } linkDiscord ESEAID`);
                }
            } 
        });
    }
};