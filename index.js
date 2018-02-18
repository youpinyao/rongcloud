const express = require('express');
const chalk = require('chalk');
const app = express();
const ws = require('express-ws')(app);

const getAppToken = require('./routes/get_app_token.js');
const getUserInfo = require('./routes/get_user_info.js');

app.use('/modules', express.static('node_modules'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, x-session-id, x-refer-url, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

getAppToken(app);
getUserInfo(app);

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log();
  console.log(chalk.green(`listening at http://${host}:${port}`), server.address());
  console.log();
});
