const sha1 = require('sha1');

const app_secret = 'zbA6YDkqYNq';
const app_key = '8luwapkv8j5hl';
const timestamp = +new Date();
const nonce = Math.random();

const signature = sha1(`${app_secret}${nonce}${timestamp}`);

module.exports = {
  'App-Key': app_key,
  'Timestamp': timestamp,
  'Nonce': nonce,
  'Signature': signature,
}
