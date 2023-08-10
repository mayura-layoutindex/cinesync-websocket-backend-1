module.exports = {
  apps: [
    {
      name: "cinesync-cloud-message-service-development",
      script: "/usr/bin/npm",
      args: "run start:dev",
      instances: "1",
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "cinesync-cloud-message-service-stage",
      script: "/usr/bin/npm",
      args: "run start:stage",
      instances: "1",
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: "stage",
      },
    },
    {
      name: "cinesync-cloud-message-service-production",
      script: "/usr/bin/npm",
      args: "run start:prod",
      instances: "1",
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
