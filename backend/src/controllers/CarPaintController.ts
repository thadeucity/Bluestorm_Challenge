import path from 'path';
import fs from 'fs';

import FileDataDTO from '../dtos/fileDataDTO';

export const availablePaintColors = [
  { name: 'blue', tagHex: '#085db2' },
  { name: 'black', tagHex: '#222222' },
  { name: 'green', tagHex: '#0bb40d' },
  { name: 'lime', tagHex: '#97cb0e' },
  { name: 'purple', tagHex: '#4a16c7' },
  { name: 'red', tagHex: '#cd0e1a' },
  { name: 'yellow', tagHex: '#c66c0d' },
];

const colorNames = availablePaintColors.map(color => color.name);

export function getPaintData(paintName: string): FileDataDTO {
  let filePath = '';
  if (colorNames.indexOf(paintName) < 0) {
    filePath = path.resolve(__dirname, '..', 'assets', 'paint', `blue.png`);
  } else {
    filePath = path.resolve(
      __dirname,
      '..',
      'assets',
      'paint',
      `${paintName}.png`,
    );
  }

  const fileData = fs.readFileSync(filePath);

  return {
    type: 'paint',
    data: `data:image/png;base64,${fileData.toString('base64')}`,
  };
}
