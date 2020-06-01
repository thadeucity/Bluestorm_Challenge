import path from 'path';
import fs from 'fs';

import FileDataDTO from '../dtos/fileDataDTO';

const headlightNames = ['halogen', 'led', 'projector'];

export default function getHeadlightData(headlightName: string): FileDataDTO {
  let filePath = '';
  if (headlightNames.indexOf(headlightName) < 0) {
    filePath = path.resolve(__dirname, '..', 'assets', `blank.png`);
  } else {
    filePath = path.resolve(
      __dirname,
      '..',
      'assets',
      'headlight',
      `${headlightName}.png`,
    );
  }

  const fileData = fs.readFileSync(filePath);

  return {
    type: 'headlight',
    data: `data:image/png;base64,${fileData.toString('base64')}`,
    name: headlightName,
  };
}
