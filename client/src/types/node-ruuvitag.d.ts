export function on(eventName: 'found', cb: (r: RuuviTag) => void): void

export interface RuuviTagData {
  'dataFormat': number,
  'rssi': number,
  'humidity': number,
  'temperature': number,
  'pressure': number,
  'accelerationX': number,
  'accelerationY': number,
  'accelerationZ': number,
  'battery': number 
}

export interface RuuviTag {
  id: string,
  on(e: 'updated', cb: (m: RuuviTagData) => void): void
}

