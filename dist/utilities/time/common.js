function didTimeFramePass(value, unit, currentDate) {
    if (value === "*") return false;
    if (unit === "hours") {
        return value < currentDate.getHours();
    } else if (unit === "minutes") {
        return value < currentDate.getMinutes();
    }
    return false;
}

function setTimeFrame(date, value, type) {
    if (type === 'date') {
        date.setDate(value);
    }
    if (type === 'hours') {
        date.setHours(value);
    }
    if (type === 'minutes') {
        date.setMinutes(value);
    }
}

module.exports = { setTimeFrame: setTimeFrame, didTimeFramePass: didTimeFramePass };