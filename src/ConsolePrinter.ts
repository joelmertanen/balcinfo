const temperatureFormatter = (deg: number) => `${deg.toFixed(2)}°C`
const humidityFormatter = (hum: number) => `${hum.toFixed(2)}%`

const consolePrinter = (data: ReadingData) => {
    const str =
`***************
${new Date()}
Temperature: ${temperatureFormatter(data.temperature)}
Humidity: ${humidityFormatter(data.humidity)}`;
    console.log(str)
}

export default consolePrinter;
