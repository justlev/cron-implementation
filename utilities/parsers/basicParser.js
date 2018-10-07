'use strict';
class BasicCronParser {
    parseCron(cron){
        if (typeof(cron) === 'undefined'){
            return null;
        }
        const splitted = cron.split(' ');
        const minutes = splitted[0];
        const hours = splitted[1];
        const process = splitted[2];
        return {
            minutes: minutes,
            hours: hours,
            date: '*',
            process: process
        };
    }
}

module.exports = BasicCronParser;