# CRON implementation

## Technology
This CRON parser and scheduler is implemented in NodeJS. <br />
A wrapper script in Bash is available.

## Implementation
The solution was implemented in 2 ways: <br />
1. Straight-forward and basic solution - a more straightforward (utilities/time/basicScheduling.js)
<br />
2. Generic, extendable solution (utilities/time/genericScheduling.js)
<br />
The generic one is used by default, though one can easily switch to the basic solution in app.js, in the SchedulerService instance creation.

## Remarks
The solution uses Dependency Injection and Separation of Concerns in order to achieve code decoupling and testability. <br />
If you use the generic solution, it works by hierarchy of time units ( day > hour > minute > second ). <br />
Should you decide to add another time unit to the solution, it would be enough to just add it in it's proper place in the hierarchy array, and add it's handling in the common.js time utils (which handle time object parsing, and questions like "Has the specified timeframe passed comparing to now?".

## Requirements
Node environment

## Building
I've packed the solution with its dependencies.
It is possible to rebuild it by running these commands:
```
npm i
npm run build
```

## Running
You can use the start.sh script in order to run the solution. <br />
I have also added a test file named 'testCron', which contains the use cases from the example.
Running the solution is done via the following command: <br />
Add permissions: `chmod +x ./start.sh`. And then <br />
```
./dist/start.sh HH:MM < configFile
```
Example:
`./dist/start.sh 16:10 < testCron`

## TODO
1. The time utility can be beautified and it's efficiency can be improved <br />
2. Add unit tests and system tests <br />
3. Add API documentation and expose the service on an API layer (if required) <br />