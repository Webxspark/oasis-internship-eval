const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    action: { type: String, required: true },
    loginTime: { type: String, required: true },
    logoutTime: { type: String, default: null },
    ipAddress: { type: String, required: true },
    tokenName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Log', LogSchema);