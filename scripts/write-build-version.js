import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const commitCount = execSync('git rev-list --count HEAD').toString().trim();

const version = {
  build: commitCount,
  versionString: `0.1.0+build.${commitCount}`
};

console.log('Writing build version: ', version.versionString)
writeFileSync('./src/lib/build-version.json', JSON.stringify(version, null, 2));
