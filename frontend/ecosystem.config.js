require("dotenv").config({ path: ".env.deploy" });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF,
  DEPLOY_SSH_KEY_PATH = "~/.ssh/practicum/private_key",
  PORT = 3000,
  NODE_ENV = "production",
} = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-frontend",
      script: "npm",
      args: "start",
      env_production: {
        PORT,
        NODE_ENV,
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
      "pre-deploy-local": `scp -i ${DEPLOY_SSH_KEY_PATH} .env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      "post-deploy":
        "npm i && npm run build && pm2 restart ecosystem.config.js",
    },
  },
};
