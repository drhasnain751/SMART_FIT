import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import app from './server/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const frontendDir = path.resolve(__dirname, 'Smart_Fit_frontend');

if (process.env.NODE_ENV === 'production') {
  const distDir = path.join(frontendDir, 'dist');
  app.use(express.static(distDir));
  app.get('/{*splat}', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  const requireFromFrontend = createRequire(path.join(frontendDir, 'package.json'));
  const { createServer: createViteServer } = requireFromFrontend('vite');
  const vite = await createViteServer({
    root: frontendDir,
    configFile: path.join(frontendDir, 'vite.config.js'),
    server: {
      middlewareMode: true,
      allowedHosts: true,
      hmr: false,
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, HOST, () => {
  console.log(`SmartFit server running at http://${HOST}:${PORT}`);
});
