const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    libelle: { type: String },
    prix: {type: Number},
    description: { type: String },
    quantite: {type: Number},
}, { timestamps: true });
module.exports = mongoose.model("Product", productSchema);