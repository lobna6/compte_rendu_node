var express = require("express");
var router = express.Router();
var productModels = require("../model/produit");
/* GET product page. */
router.get("/addproduct", function (req, res, next) {
  res.render("addproduct");
});
router.post("/addPandrout", async function (req, res, next) {
  try {
    const { libelle, prix, description, quantite } = req.body;
    const checkIfproductExists = await productModels.findOne({ libelle });
    if (checkIfproductExists) {
      throw new Error("Product already exists");
    }
    const product = new productModels({
      libelle: libelle,
      prix: prix,
      description: description,
      quantite: quantite,
    });
    await product.save();
    res.redirect("/product/listproducts");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.get("/listproducts", async function (req, res, next) {
  const products = await productModels.find();
  res.render("listproducts", { products: products });
});
router.get("/delete/:id", async function (req, res, next) {
  const { id } = req.params;
  await productModels.deleteOne({ _id: id }).then(() => {
    res.redirect("/product/listproducts");
  });
});
router.get("/modifier/:id", async function (req, res, next) {
  const { id } = req.params;
  const products = await productModels.findById(id);
  res.render("modifierproduct", { product: products });
});
router.post("/modPandrout/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { libelle, prix, description, quantite } = req.body;
    productModels.findByIdAndUpdate(
      id,
      {
        libelle: libelle,
        prix: prix,
        description: description,
        quantite: quantite,
      },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated product : ", docs);
        }
      }
    );
    res.redirect("/product/listproducts");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
