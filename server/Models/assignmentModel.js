const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    user_id:String,
    name:{type: String, required: true},
    title: { type: String, required: true },
    type: {type: String, required: true},
    submitted: { type: Boolean, default: false },
    status: { type: String, default: 'Started' },
    score: { type: Number},
    answer:{type: mongoose.Mixed},
    options:[Array]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;