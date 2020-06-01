import path from 'path';
import fs from 'fs';

import FileDataDTO from '../dtos/fileDataDTO';

const packageNames = ['sport'];

export default function getPackageData(packageName: string): FileDataDTO {
  let filePath = '';
  if (packageNames.indexOf(packageName) < 0) {
    filePath = path.resolve(__dirname, '..', 'assets', `blank.png`);
  } else {
    filePath = path.resolve(
      __dirname,
      '..',
      'assets',
      'pack',
      `${packageName}.png`,
    );
  }

  const fileData = fs.readFileSync(filePath);

  return {
    type: 'package',
    data: `data:image/png;base64,${fileData.toString('base64')}`,
  };
}
