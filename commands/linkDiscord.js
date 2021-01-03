const Users = require("../schemas/users");

module.exports = {
    name: 'linkdiscord',
    description: 'Links discord account to Gamedock ESEA database.',
    args: true,
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You have not provided any arguments, ${message.author}`);
        };
        if (args[0]) {
            eseaAcc = null;
            Users.findOne({id: parseInt(args[0])}, function (err, docs) {
                if (err){ 
                    console.log(err) 
                } else{ 
                    eseaAcc = docs;
                    if (eseaAcc != null) {
                        if (eseaAcc.discord != null) {
                            return message.channel.send(`ESEA account is already linked to ${"<@" + eseaAcc.discord + ">"}`);
                        } else {
                            Users.findOneAndUpdate({id: parseInt(args[0])}, {$set: {discord: message.author.id}}, {new: true}, (err, doc) => {
                                if (err) {
                                    console.log("Something went wrong when updating the data!");
                                }
                                return message.channel.send(`Discord account successfully linked to ESEA account alias: ${eseaAcc.alias}`);
                            });
                        };
                    } else {
                        return message.channel.send('Discord account wasn\'t linked. Use "!gd addESEA id" to add your ESEA account first.');
                    }
                } 
            });
        }
    },
};