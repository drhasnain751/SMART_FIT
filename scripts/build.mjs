import { createRequire } from 'module';
import path from 'path';
import { pathToFileURL } from 'url';

const requireFromFrontend = createRequire(path.resolve('Smart_Fit_frontend/package.json'));
const vitePkgDir = path.dirname(requireFromFrontend.resolve('vite/package.json'));
const viteBin = path.join(vitePkgDir, 'bin/vite.js');

process.argv = [process.argv[0], viteBin, 'build', 'Smart_Fit_frontend', ...process.argv.slice(2)];
await import(pathToFileURL(viteBin).href);
