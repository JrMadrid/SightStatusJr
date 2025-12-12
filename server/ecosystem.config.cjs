module.exports = {
  apps: [{
    name: 'back',
    script: 'src/index.js',
    env: { // desarrollo
      watch: true,
      DEBUG: 'app:*',
      NODE_ENV: 'development',
      APP_HOST: 'localhost',
      APP_PORT: 88,
      DEV: true,
      MOCKS: true,
      DB_HOST: '192.168.100.17',
      DB_DATABASE: 'statusAppsDev',
      DB_USER: 'sa',
      DB_PASSWORD: 'superadmin'
    },
    env_production: { // producción
      watch: false,
      DEBUG: '',
      NODE_ENV: 'production',
      APP_HOST: '192.168.100.17',
      APP_PORT: 88,
      DEV: false,
      MOCKS: false,
      DB_HOST: '192.168.100.17',
      DB_DATABASE: 'statusAppsDev',
      DB_USER: 'sa',
      DB_PASSWORD: 'superadmin'
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