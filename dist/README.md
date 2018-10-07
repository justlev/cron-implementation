# CRON simulator

## Technology
This CRON simulator is implemented in NodeJS.
A wrapper script in Bash is available.

## Implementation
The solution was implemented in 2 ways:
1. Straight-forward and basic solution - a more straightforward (utilities/time/basicScheduling.js)
2. Generic, extendable solution (utilities/time/genericScheduling.js)
The generic one is used by default, though one can easily switch to the basic solution in the app.js, in the SchedulerService instance creation.

## Remarks
The solution uses Dependency Injection and Separation of Concerns in order to achieve code decoupling and testability.
If you use the generic solution, it works by hierarchy of time units ( day > hour > minute > second ).
Should you decide to add another time unit to the solution, it would be enough to just add it in it's proper in the hierarchy array, and add it's handling in the common.js time utils (which handle time object parsing, and questions like "Has the specified timeframe passed comparing to now?".

## Requirements
Node environment

## Running
You can use the start.sh script in order to run the solution.
I have also added a test file named 'testCron', which contains the use cases from the example.
Running the solution is done via the following command:
```
chmod +x ./start.sh
./dist/start.sh HH:MM < configFile
```
Example:
`./dist/start.sh 16:10 < testCron`

## TODO
1. The time utility can be splitted even more into separate concerts
2. Add unit tests and system tests
3. Add API documentation and expose the service on an API layer