# Balcony information

The client project consist of two components, `Measure` and `Persist`. There is also `LedPrinter` for printing the latest temperature value in the LED panel of the Sense Hat, but it has issues with orientation which I haven't had the time to fix yet.

Initially I implemented reading the temperature data from the Sense Hat, but due to its physical positioning next to the Raspberry Pi's board itself, the results are hugely inaccurate.

Now it reads data from a single RuuviTag, which works nicely.

## Requirements
* Raspberry Pi (Sense Hat optional)
* RuuviTag
* Node 9.x
* `redis`
* `yarn`

## Measure

`Measure` gets the measurements from Raspberry Pi's Sense Hat with the help of [nodeimu](https://github.com/rupnikj/nodeimu). The values are stored to a local Redis to cope with connection issues. `Measure` adds a timestamp to the results.

The readings are stored in the following format:
```
interface PersistedResult {
    timestamp: string;
    temperature: string;
    humidity: string;
};
```

Appending the (unorthodoxically named) command line parameter `--fakeMeasure` for `Measure` forces it to use the hardcoded measurement
values instead of sensors to help with developing.

## Persist

`Persist` pops the (already persisted ;) values from Redis and pushes them to your favorite internet store.
The storage is configured in root level's `config.json`. See `config.sample.json`.

## Running

Compile the Typescript with `yarn tsc`.

Either run manually or then add the following to the crontab with `crontab -e`.
```
* * * * * cd PATH_TO_PROJECT && PATH_TO_NPM/npm run measure > YOUR_LOGGING_PATH/latest_measurement.log 2>&1
0 * * * * cd PATH_TO_PROJECT && PATH_TO_NPM/npm run persist > YOUR_LOGGING_PATH/latest_persist.log 2>&1
```
