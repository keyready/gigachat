const UserModel = require('./user.model');
const ChatModel = require('./chat.model');
const MessagesModel = require('./messages.model');
const GCTokens = require('./gigachat.model');

UserModel.hasMany(ChatModel);
ChatModel.belongsTo(UserModel);

ChatModel.hasMany(MessagesModel);
MessagesModel.belongsTo(ChatModel);

module.exports = {
    UserModel,
    ChatModel,
    MessagesModel,
    GCTokens,
};
