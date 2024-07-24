const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    },
}, {
    timestamps: true
});

ResponseSchema.static('getTotalByWorker', async function(worker) {
    const total = await this.aggregate([
        { $match: { worker } },
        { $group: { _id: null, total: { $sum: 1 } } }])

    return total[0].total
})

ResponseSchema.static('getResponseByRequest', async function(request) {
    const response = await this.aggregate([
        { $match: { request } },
    ])
    return response
})

module.exports = mongoose.model('Response', ResponseSchema)