const {defineConfig} = require('@playwright/test');
module.exports=defineConfig({
  testDir:'./tests',
  timeout:30000,
  expect:{timeout:5000},
  projects:[{name:'chromium',use:{browserName:'chromium'}}],
  use:{baseURL:'http://127.0.0.1:4178',trace:'retain-on-failure',screenshot:'only-on-failure'},
  webServer:{command:'node dev-server.cjs',url:'http://127.0.0.1:4178/index.html',reuseExistingServer:!process.env.CI,timeout:15000}
});
