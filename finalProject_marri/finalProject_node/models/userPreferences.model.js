const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        username: { type: String, unique: true, required: true },
        query: {type: String, required: true},
        category: {type: String, required: true},
        startDate: { type: Date, default: Date.now},
        endDate: { type: Date, default: Date.now }
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserPreferences', schema);
