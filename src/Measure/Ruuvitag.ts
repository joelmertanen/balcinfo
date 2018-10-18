import ruuvi from 'node-ruuvitag';
import { RuuviTag, RuuviTagData } from '../types/node-ruuvitag';

export const findTag = (tagId: string): Promise<RuuviTag> => {
  return new Promise((resolve) => {
    ruuvi.on('found', (tag: RuuviTag) => {
      if (tag.id === tagId) {
        resolve(tag);
      }
    });
  });
};

export const getRuuviResult = (tag: RuuviTag): Promise<ReadingData> => {
  return new Promise((resolve) => {
    tag.on('updated', (data: RuuviTagData) => {
      const measurement: ReadingData = {
        timestamp: (new Date()).toJSON(),
        temperature: data.temperature,
        humidity: data.humidity
      };
      resolve(measurement);
    });
  });
};

