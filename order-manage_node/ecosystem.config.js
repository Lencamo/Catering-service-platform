module.exports = {
  apps: [
    {
      name: 'order-manage_node',
      script: './src/main.js',
      instances: 4,
      exec_mode: 'cluster'
    }
  ]
}
