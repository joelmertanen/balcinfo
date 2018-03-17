import {temperatureFormatter, humidityFormatter} from './formatters';

const consolePrinter = (data: ReadingData) => {
    const str =
`***************
${new Date()}
Temperature: ${temperatureFormatter(data.temperature)}
Humidity: ${humidityFormatter(data.humidity)}`;
    console.log(str)
}

export default consolePrinter;
