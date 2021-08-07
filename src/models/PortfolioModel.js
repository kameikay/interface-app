const mongoose = require('mongoose')

const PortfolioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    videoURL: { type: String, required: false },
    images: { type: String, required: false },
})

const PortfolioModel = mongoose.model('Portfolio', PortfolioSchema)

function Portfolio(body) {
    this.body = body;
}