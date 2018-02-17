const request = require('../util/request.js');
const headers = require('../util/headers');

const url = 'http://api.cn.ronghub.com/user/getToken.json';

module.exports = function (app) {
  app.get('/get_app_token', (req, res) => {
    request.post({
      url,
      form: req.query,
      headers,
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
