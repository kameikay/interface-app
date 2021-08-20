const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const PortfolioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: false },
    person: { type: String, required: false },
    function: { type: String, required: false },
    testimonialText: { type: String, required: false },
    address: { type: String, required: true },
    description: { type: String, required: true },
    videoURL: { type: String, required: false },
    images: [Object],
    createdAt: { type: Date, default: Date.now },
});

PortfolioSchema.pre("save", function () {
    if (!this.images[this.images.length - 1].url) {
        for (let i = 0; i < this.images.length; i++) {
            this.images[i].url = `${process.env.APP_URL}/uploads/${this.images[i].key}`;
        }
    }
});

PortfolioSchema.pre("findOneAndUpdate", function () {

    if (!this._update.images[this._update.images.length - 1].url) {
        for (let i = 0; i < this._update.images.length; i++) {
            this._update.images[i].url = `${process.env.APP_URL}/uploads/${this._update.images[i].key}`;
        }
    }
});

PortfolioSchema.pre("remove", function () {
    if (process.env.STORAGE_TYPE === "s3") {
        let objectsKeys = [];

        for (let i in this.images) {
            objectsKeys.push(this.images[i].key);
        }

        const objects = objectsKeys.map((key) => ({ Key: key }));

        return s3
            .deleteObjects({
                Bucket: process.env.BUCKET_NAME,
                Delete: {
                    Objects: objects,
                },
            })
            .promise();
    } else {
        let objectsKeys = [];

        for (let i in this.images) {
            objectsKeys.push(this.images[i].key);
        }

        objectsKeys.forEach((key) => {
            return promisify(fs.unlink)(
                path.resolve(__dirname, "..", "public", "uploads", key)
            );
        });
    }
});

const PortfolioModel = mongoose.model("Portfolio", PortfolioSchema);

class Portfolio {
    constructor(body, files) {
        this.body = body;
        this.files = files;
        this.reqBodyAndFiles = null;
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
        let imagesArray = [];
        this.files.forEach((e) => {
            const file = {
                name: e.originalname,
                size: e.size,
                key: e.key,
                url: e.location,
            };

            imagesArray.push(file);
        });

        this.reqBodyAndFiles = {
            name: this.body.name,
            category: this.body.category,
            person: this.body.person,
            function: this.body.function,
            testimonialText: this.body.testimonialText,
            address: this.body.address,
            description: this.body.description,
            videoURL: this.body.videoURL,
            images: imagesArray,
        };

        if (this.errors.length > 0) return;
        this.portfolio = await PortfolioModel.create(this.reqBodyAndFiles);
    }

    async edit(id) {
        if (typeof id !== "string") return;
        if (this.errors.length > 0) return;

        // V
        let oldPortfolio = await Portfolio.findById(id)

        let imagesArray = [...oldPortfolio.images];
        
        this.files.forEach((e) => {
            const file = {
                name: e.originalname,
                size: e.size,
                key: e.key,
                url: e.location,
            };

            imagesArray.push(file);
        });

        this.reqBodyAndFiles = {
            name: this.body.name,
            category: this.body.category,
            person: this.body.person,
            function: this.body.function,
            testimonialText: this.body.testimonialText,
            address: this.body.address,
            description: this.body.description,
            videoURL: this.body.videoURL,
            images: imagesArray,
        };

        this.portfolio = await PortfolioModel.findByIdAndUpdate(id, this.reqBodyAndFiles, {
            new: true,
        });
    }

    static async delete(id) {
        if (typeof id !== "string") return;

        const portfolioCase = await PortfolioModel.findById(id);

        await portfolioCase.remove();

        return portfolioCase;
    }
}

module.exports = Portfolio;
