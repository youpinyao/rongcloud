const request = require('../util/request.js');
const headers = require('../util/headers');

const url = 'http://api.cn.ronghub.com/user/info.json';

const users = {};

module.exports = function (app) {
  app.get('/get_user_info', (req, res) => {
    if (users[req.query.userId]) {
      console.log('get user info from cache', req.query.userId, JSON.stringify(users[req.query.userId]));
      request.success(res, users[req.query.userId]);
      return;
    }

    request.post({
      url,
      form: req.query,
      headers,
    }).then(data => {
      try {
        if (JSON.parse(data).errorMessage) {
          request.error(res, JSON.parse(data));
        } else {
          users[req.query.userId] = JSON.parse(data);
          request.success(res, JSON.parse(data));
        }
      } catch (e) {
        request.success(res, data);
      }
    }, function (e) {
      request.error(res, e.message);
    });
  });
}
