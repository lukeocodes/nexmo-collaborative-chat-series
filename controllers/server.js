exports.status = function(req, res, next) {
  res.json({ 
    appId: process.env.NEXMO_APPLICATION_ID,
    defaultConversationId: process.env.NEXMO_DEFAULT_CONVERSATION_ID,
    status: 'ok'
  });
};