const express = require('express');
const chalk = require('chalk');
const app = express();
const ws = require('express-ws')(app);

const getAppToken = require('./routes/get_app_token.js');

app.use('/modules', express.static('node_modules'));

getAppToken(app);

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log();
  console.log(chalk.green(`listening at http://${host}:${port}`), server.address());
  console.log();
});
