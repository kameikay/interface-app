const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    videoURL: { type: String, required: false },
    images: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

const PortfolioModel = mongoose.model("Portfolio", PortfolioSchema);

class Portfolio {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.portfolio = null;
    }

    async register() {
        this.body = {
            name: this.body.name,
            category: this.body.category,
            address: this.body.address,
            description: this.body.description,
            videoURL: this.body.videoURL,
            images: this.body.images,
        };

        if (this.errors.length > 0) return;

        this.portfolio = await PortfolioModel.create(this.body);
    }
}

module.exports = Portfolio;
