const sha1 = require('sha1');
const request = require('../util/request.js');

const url = 'http://api.cn.ronghub.com/user/getToken.json';

const app_secret = 'zbA6YDkqYNq';
const app_key = '8luwapkv8j5hl';
const timestamp = + new Date();
const nonce = Math.random();

const signature = sha1(`${app_secret}${nonce}${timestamp}`);

module.exports = function (app) {
  app.get('/get_app_token', (req, res) => {
    request.post({
      url,
      form: req.query,
      headers: {
        'App-Key': app_key,
        'Timestamp': timestamp,
        'Nonce': nonce,
        'Signature': signature,
      }
    }).then(data => {
      try {
        request.success(res, JSON.parse(data));
      } catch (e) {
        request.success(res, data);
      }
    }, function (e) {
      request.error(res, e.message);
    });
  });
}
