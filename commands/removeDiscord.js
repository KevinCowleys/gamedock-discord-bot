const Users = require("../schemas/users");

module.exports = {
    name: 'removediscord',
    description: 'Links discord account to Gamedock ESEA database.',
    args: true,
    execute(message, args) {
        if (!message.member.roles.cache.find(role => role.name === "Staff") || !message.member.roles.cache.find(role => role.name.toLowerCase() === "admin")) {
            return message.channel.send(`You don't have permission to run this command, <@${message.author.id}>`);
        } else {
            if (!args.length) {
                return message.channel.send(`You need to provide a Discord ID, ${message.author}`);
            } else {
                Users.findOne({discord: args[0]}, function (err, docs) {
                    if (err){ 
                        console.log(err) 
                    } else{ 
                        eseaAcc = docs;
                        if (eseaAcc != null) {
                            if (eseaAcc.discord != null) {
                                // if (eseaAcc.discord != message.author.id) {
                                //     return message.channel.send(`Only the owner can remove their discord. Contact <@141179845445943296> for more assistance if needed.`);
                                // }
                                Users.findOneAndUpdate({discord: args[0]}, {$set: {discord: undefined}}, {new: true}, (err, doc) => {
                                    if (err) {
                                        console.log("Something wrong when updating data!");
                                    }
                                    return message.channel.send(`Discord account has succesfully been unlinked from ${eseaAcc.alias}'s ESEA account.`);
                                });
                            } else {
                                return message.channel.send(`Discord account has already been removed.`);
                            }
                        } else {
                            return message.channel.send('Discord account wasn\'t removed, because it\'s not linked.');
                        }
                    } 
                });
            }
        }
    },
};