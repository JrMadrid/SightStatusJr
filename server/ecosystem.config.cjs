module.exports = {
  apps: [{
    name: 'back',
    script: 'src/index.js',
    // MODOS
    env: { // DESARROLLO
      watch: true,
      NODE_ENV: 'development',
      DEBUG: 'app:*',
      DEV: true,
      MOCKS: true,
    },
    env_production: { // PRODUCCIÓN
      watch: false,
      NODE_ENV: 'production',
      DEBUG: '',
      DEV: false,
      MOCKS: false
    }
  }],
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};