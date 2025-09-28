require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF,
  DEPLOY_SSH_KEY_PATH = '~/.ssh/practicum/private_key',
  PORT = 3001,
  NODE_ENV = 'production',
  JWT_SECRET,
  DB_ADDRESS,
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
        DB_ADDRESS,
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
      'pre-deploy-local': `scp -i ${DEPLOY_SSH_KEY_PATH} .env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm i && npm run build && pm2 restart ecosystem.config.js',
    },
  },
};
