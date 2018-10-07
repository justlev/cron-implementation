"use strict";

class ScheduleService {
    constructor(cronParser, timeUtility) {
        this._cronParser = cronParser;
        this._timeUtility = timeUtility;
    }

    getScheduledDateTime(currentTime, cron) {
        const parsed = this._cronParser.parseCron(cron);
        if (parsed == null) return null;
        const scheduledTime = this._timeUtility.getScheduledTime(currentTime, parsed);
        return {
            time: scheduledTime,
            process: parsed.process
        };
    }
}

module.exports = ScheduleService;