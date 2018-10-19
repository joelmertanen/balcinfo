import { temperatureFormatter, humidityFormatter } from '../LedPrinter/formatters';

const consolePrinter = (data: ReadingData) => {
  const str =
    `***************
    ${data.timestamp}
  Temperature: ${temperatureFormatter(data.temperature)}
  Humidity: ${humidityFormatter(data.humidity)}`;
  console.log(str)
}

export default consolePrinter;
