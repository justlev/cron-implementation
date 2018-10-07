const BasicCronParser = require('./utilities/parsers/basicParser');
const ScheduleService = require('./services/schedule');
const timeUtility = require('./utilities/time/genericScheduling');
const readline = require('readline');

const parserInstance = new BasicCronParser();
const schedulerInstnace = new ScheduleService(parserInstance, timeUtility);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

const currentTime = process.argv[2];
if (typeof currentTime === 'undefined') {
    console.error("Current time must be set, HH:MM");
}
const currentDateTime = getDateTime(currentTime);

rl.on('line', function (cronConfig) {
    estimateRunTimeForCron(currentDateTime, cronConfig);
});

//runOnFile("./testCron); - testing purposes
function estimateRunTimeForCron(currentDateTime, cronConfig) {
    const nextOccurrence = schedulerInstnace.getScheduledDateTime(currentDateTime, cronConfig);
    console.log(getExecutionDayString(currentDateTime, nextOccurrence.time) + " - " + nextOccurrence.process);
}

function getDateTime(userTime) {
    const date = new Date();
    const splitted = userTime.split(':');
    if (splitted.length < 2) return date;
    date.setHours(splitted[0]);
    date.setMinutes(splitted[1]);
    date.setSeconds(0);
    return date;
}

function getExecutionDayString(currentTime, executionTime) {
    const day = executionTime.getDate() - currentTime.getDate() === 0 ? "today" : "tomorrow";
    return `${executionTime.getHours().toString().padStart(2, '0')}:${executionTime.getMinutes().toString().padStart(2, '0')} ${day}`;
}