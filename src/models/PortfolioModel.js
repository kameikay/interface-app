const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: false },
    address: { type: String, required: true },
    description: { type: String, required: true },
    videoURL: { type: String, required: false },
    images: [Object],
    createdAt: { type: Date, default: Date.now },
});

PortfolioSchema.pre('save', function() {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/uploads/${this.key}`
    }
})

const PortfolioModel = mongoose.model("Portfolio", PortfolioSchema);

class Portfolio {
    constructor(body, files) {
        this.body = body;
        this.files = files;
        this.reqBodyAndFiles = null
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
        let imagesArray = []
        this.files.forEach(e => {
            const file = {
                name: e.originalname,
                size: e.size,
                key: e.key,
                url: e.location
            }

            imagesArray.push(file)
        })

        this.reqBodyAndFiles = {
            name: this.body.name,
            category: this.body.category,
            address: this.body.address,
            description: this.body.description,
            videoURL: this.body.videoURL,
            images: imagesArray,
        }
        
        if (this.errors.length > 0) return;

        this.portfolio = await PortfolioModel.create(this.reqBodyAndFiles);

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
