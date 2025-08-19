const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    deadline: { type: String, reqiured: true },
    assignedTo: { type: String, required: true },
    status: { type: String, enum: ['complete', 'incomplete'], default: 'incomplete' },
    progress: {type: Number, required: true}
}, { timestamps: true });


module.exports = mongoose.model('Task', TaskSchema);