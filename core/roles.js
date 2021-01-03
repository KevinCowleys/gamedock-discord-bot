const core = require("./core.js");
const GlobalVariables = require("../globals/variables.js");

async function getRole(roleToGet) {
    return await GlobalVariables.GamedockGuild.roles.cache.find(role => role.name === roleToGet);
}

async function createRole(tempRoleName) {
    let checkRoleExist = await getRole(tempRoleName);
    if (checkRoleExist == null) {
        GlobalVariables.temporaryRoles.push(tempRoleName);
        console.log(`createRole - ${tempRoleName}`);
        await GlobalVariables.GamedockGuild.roles.create({data: {name: tempRoleName}});
    }
}

async function giveRole(teamName, arrUsers) {
    const userVoice = await core.getUsersInVoice(GlobalVariables.mainChannel);
    let arrDiscorIDs = [];
    const fetchedRole = await getRole(teamName);

    for (var i1 in userVoice) {
        arrDiscorIDs.push(userVoice[i1][0].toString());
    }
    for (var i2 in arrUsers) {
        let userDoc = await core.getDiscordDB(arrUsers[i2]["id"]);
        if (userDoc != null) {
            if (userDoc["discord"]) {
                if (arrDiscorIDs.includes(userDoc["discord"])) {
                    console.log('giveRole - User in discord');
                    for (user of userVoice) {
                        if (user[1].id === userDoc["discord"])
                        {
                            user[1].roles.add(fetchedRole);
                        }
                    }
                }
                else {
                    console.log('giveRole - User not in discord');
                }
            } else {
                console.log('giveRole - No discord');
            }
        }
    }
}

async function deleteRole(roleToDelete) {
    const roletodeleteF = await getRole(roleToDelete);

    if (roletodeleteF != null) {
        roletodeleteF.delete('The role needed to go')
        .then(deleted => console.log(`deleteRole - ${deleted.name}`))
        .catch(console.error);
    }
}

module.exports = {
    getRole: getRole,
    createRole: createRole,
    giveRole: giveRole,
    deleteRole: deleteRole,
};
