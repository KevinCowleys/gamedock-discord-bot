const cron = require("cron");
const GlobalVariables = require("../globals/variables.js");
const core = require("./core.js");
const channels = require("./channels.js");
const roles = require("./roles.js");

var tempGames = [];

function startCron() {

    let scheduleCheck = new cron.CronJob({
        cronTime : '* * * * *',  // The time pattern when you want the job to start
        onTick : checkCron, // Task to run
        onComplete : setCoreRunningFalse,
        start : true
    })
}

async function checkCron() {
    console.log("cronJobs - Start");
    if (GlobalVariables.isCoreRunning != true) {
        GlobalVariables.isCoreRunning = true;
        await mainJob();
        GlobalVariables.isCoreRunning = false;
    }
    else {
        console.log("cronJobs - already running");
    }
} 

function setCoreRunningFalse() {
    GlobalVariables.isCoreRunning = false;
}

async function mainJob() {
    userVoice = await core.getUsersInVoice(GlobalVariables.mainChannel);
    if (userVoice.length > 0) {

        for (var i in userVoice) {
            let discordUserID = await core.getIDFromDB(userVoice[i][0]);
            if (discordUserID != null) {
                let matchIDResult = await core.getUserESEA(discordUserID["id"]);
    
                if (matchIDResult != "False" && matchIDResult != null) { // &&!tempGames.includes(matchIDResult)
                    // tempGames.push(matchIDResult);
                    let matchResult = await core.getMatchDB(matchIDResult);
                    console.log();
    
                    if (matchResult != null) {
                        console.log("match result in DB");
                        if (matchResult["data"]["match_type"] === "all.ranked_pug") {
                            const teamAName = `${matchResult["data"]["id"]} - Team A`;
                            const teamBName = `${matchResult["data"]["id"]} - Team B`;
                            await roles.createRole(teamAName);
                            await roles.giveRole(teamAName, matchResult["data"]["team_1"]["players"]);
                            await channels.createTempChannel(teamAName);
                            await channels.moveUser(teamAName);
                            await roles.createRole(teamBName);
                            await roles.giveRole(teamBName, matchResult["data"]["team_2"]["players"]);
                            await channels.createTempChannel(teamBName);
                            await channels.moveUser(teamBName);
                        }
                    } else {
                        console.log("match result not in DB");
                        matchResult = await core.getMatchESEA(matchIDResult);
                        
                        if (matchResult != null) {
                            if (matchResult["data"]["match_type"] === "all.ranked_pug") {
                                const teamAName = `${matchResult["data"]["id"]} - Team A`;
                                const teamBName = `${matchResult["data"]["id"]} - Team B`;
                                await roles.createRole(teamAName);
                                await roles.giveRole(teamAName, matchResult["data"]["team_1"]["players"]);
                                await channels.createTempChannel(teamAName);
                                await channels.moveUser(teamAName);
                                await roles.createRole(teamBName);
                                await roles.giveRole(teamBName, matchResult["data"]["team_2"]["players"]);
                                await channels.createTempChannel(teamBName);
                                await channels.moveUser(teamBName);
                            }
                        } else {
                            console.log("match doesn't exist yet");
                        }
                    }
                }
            }
        }
    }
}

module.exports = {
    startCron: startCron
}