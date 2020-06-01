import path from 'path';
import fs from 'fs';

import FileDataDTO from '../dtos/fileDataDTO';

const wheelNames = ['orcus_dark', 'orcus_white'];

export default function getWheelData(wheelName: string): FileDataDTO {
  let filePath = '';
  if (wheelNames.indexOf(wheelName) < 0) {
    filePath = path.resolve(__dirname, '..', 'assets', `blank.png`);
  } else {
    filePath = path.resolve(
      __dirname,
      '..',
      'assets',
      'wheels',
      `${wheelName}.png`,
    );
  }

  const fileData = fs.readFileSync(filePath);

  return {
    type: 'wheel',
    data: `data:image/png;base64,${fileData.toString('base64')}`,
    name: wheelName,
  };
}
