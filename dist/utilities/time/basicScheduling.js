const commonTimeUtils = require('./common');
const getScheduledTime = function (currentTime, cronConfig) {
    const originalDate = new Date(currentTime);
    const hours = cronConfig.hours;
    const minutes = cronConfig.minutes;
    let result = new Date(currentTime);
    const valuesToSet = { hours: originalDate.getHours(), date: originalDate.getDate(), minutes: originalDate.getMinutes() };
    valuesToSet.hours = isWildCard(hours) ? originalDate.getHours() : hours;
    valuesToSet.minutes = isWildCard(minutes) ? originalDate.getMinutes() : minutes;
    if (commonTimeUtils.didTimeFramePass(hours, "hours", originalDate)) {
        valuesToSet.date += 1;
    }
    if (commonTimeUtils.didTimeFramePass(minutes, "minutes", originalDate)) {
        valuesToSet.hours = isWildCard(hours) ? originalDate.getHours() + 1 : hours;
        valuesToSet.minutes = minutes;
    }

    if (isWildCard(minutes)) {
        if (!isWildCard(hours)) {
            valuesToSet.minutes = 0;
        }
    }

    commonTimeUtils.setTimeFrame(result, valuesToSet.hours, "hours");
    commonTimeUtils.setTimeFrame(result, valuesToSet.minutes, "minutes");
    commonTimeUtils.setTimeFrame(result, valuesToSet.date, "date");
    return result;
};

function isWildCard(value) {
    return value === "*";
}

module.exports = { getScheduledTime: getScheduledTime };