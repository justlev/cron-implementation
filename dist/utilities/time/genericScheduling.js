const commonTimeUtils = require('./common');
const timeFramesHierarchy = ['date', 'hours', 'minutes'];
const getScheduledTime = function (currentTime, cronConfig) {
    const originalDate = new Date(currentTime);
    let result = new Date(currentTime);
    const valuesToSet = { hours: originalDate.getHours(), date: originalDate.getDate(), minutes: originalDate.getMinutes() };
    for (let i = timeFramesHierarchy.length - 1; i > 0; i--) {
        const thisTimeUnit = timeFramesHierarchy[i];
        const nextTimeUnit = timeFramesHierarchy[i - 1];
        valuesToSet[thisTimeUnit] = isWildCard(cronConfig[thisTimeUnit]) ? valuesToSet[thisTimeUnit] : cronConfig[thisTimeUnit];
        if (commonTimeUtils.didTimeFramePass(cronConfig[thisTimeUnit], thisTimeUnit, originalDate)) {
            valuesToSet[nextTimeUnit] = isWildCard(cronConfig[nextTimeUnit]) ? valuesToSet[nextTimeUnit] + 1 : cronConfig[nextTimeUnit];
        }
        if (isWildCard(cronConfig[thisTimeUnit])) {
            if (!isWildCard(cronConfig[nextTimeUnit])) {
                valuesToSet[thisTimeUnit] = 0;
            }
        }
    }
    for (let i = 0; i < timeFramesHierarchy.length; i++) {
        const thisTimeUnit = timeFramesHierarchy[i]; // minutes
        commonTimeUtils.setTimeFrame(result, valuesToSet[thisTimeUnit], thisTimeUnit);
    }
    return result;
};

function isWildCard(value) {
    return value === "*";
}

module.exports = { getScheduledTime: getScheduledTime };