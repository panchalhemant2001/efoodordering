const settings=require('./settings');

var sendTextMessage = function sendTextMessage(message, toNumber) {
  const accountSid = settings.accountSid;
  const authToken = settings.authToken;
  const client = require('twilio')(accountSid, authToken);

  client.messages
   .create({
      body: message,
      from: '+12267991623',
      to: toNumber
    })
   .then(message => console.log(message.sid))
   .done();
}


module.exports = {
  sendTextMessage: sendTextMessage
}
