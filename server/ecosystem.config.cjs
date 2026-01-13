module.exports = {
  apps: [{
    name: 'sightstatusjr-backend',
    script: 'src/index.js',

    // Conexiones (SSH/TCP)
    exec_mode: 'fork',
    instances: 1,

    env: {
      NODE_ENV: 'development',
      watch: true,
      DEBUG: 'app:*',
      DEV: true,
      MOCKS: true
    },

    env_production: {
      NODE_ENV: 'production',
      watch: false,
      DEV: false,
      DEBUG: '',
      MOCKS: false
    },

    error_file: './logs/err.log',
    out_file: './logs/out.log',
    time: true,

    autorestart: true,
    max_restarts: 5,
    min_uptime: '10s',

    // Evita fugas de memoria
    max_memory_restart: '1G',

    // Cierre limpio (SSH / sockets)
    kill_timeout: 5000
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/main',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};