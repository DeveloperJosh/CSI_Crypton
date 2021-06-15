const Mongoose = require('mongoose');

const PrefixSchema = new Mongoose.Schema({
    Prefix: {
        type: String
    },
    GuildID: String
});

const MessageModel = module.exports = Mongoose.model('prefixes', PrefixSchema);
