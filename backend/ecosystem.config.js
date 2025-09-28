require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF,
  DEPLOY_SSH_KEY_PATH = '~/.ssh/practicum/private_key',
  PORT = 3000,
  NODE_ENV = 'production',
  JWT_SECRET,
  DATABASE_URL,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: './dist/app.js',
      env_production: {
        PORT,
        NODE_ENV,
        JWT_SECRET,
        DATABASE_URL,
      },
    },
  ],

  deploy: {
    production: {
      key: DEPLOY_SSH_KEY_PATH,
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build && pm2 restart ecosystem.config.js',
    },
  },
};
