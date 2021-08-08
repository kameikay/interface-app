const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: false },
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

    static async showAll() {
        const portfolio = await PortfolioModel.find();
        return portfolio;
    }

    static async findById(id) {
        if (typeof id !== "string") return;
        const portfolio = await PortfolioModel.findById(id);
        return portfolio;
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

    async edit(id) {
        if (typeof id !== "string") return;
        if (this.errors.length > 0) return;

        this.portfolio = await PortfolioModel.findByIdAndUpdate(id, this.body, {
            new: true,
        });
    }

    static async delete(id) {
        if (typeof id !== "string") return;

        const portfolioCase = await PortfolioModel.findOneAndDelete({
            _id: id,
        });
        return portfolioCase;
    }
}

module.exports = Portfolio;
