const mongoose = require("mongoose");

const PortfolioCaseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: String,
    description: String,
    videoURL: String,
    created_at: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model("Portfolio", PortfolioCaseSchema);

module.exports = Portfolio;
