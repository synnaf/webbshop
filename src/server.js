//Här ska vi definiera vår server 
const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 8080; 
const ProductModel = require("../model/productSchema")

//views och routes 
const ROUTE = {
    main: "/", 
    product: "/product", 
    gallery: "/gallery", 
    addProduct: "/add-product"
} 

const VIEW = {
    gallery: "gallery", 
    product: "product", 
    main: "main"
}

//lägg in sass-moddleware 
//lägg in express static 
if (process.env.NODE_ENV == "developement") {
    const sassMiddleware = require("node-sass-middleware")
    app.use(sassMiddleware({
        src: path.join(__dirname, "sass"), 
        dest: path.join(__dirname, "public"), 
        outputStyle: "compressed"
    }))
}

app.use(express.static("public")); 
app.use(express.urlencoded({extended: true})); 
app.set("view engine", "ejs")

// -------------------- OUR ROUTES ------------------ //

//Route till produktgalleri 
app.get(ROUTE.gallery, async (req, res)=> {
    const productList = await ProductModel.find()
    res.status(200).render(VIEW.gallery, {productList}); 
})

//Route till en enskild product  
app.get(ROUTE.product, (req, res)=> {
    res.status(200).render(VIEW.product, {}); 
})

//Post till product page 
app.post(ROUTE.addProduct, (req, res)=> {
    new ProductModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }).save(); 
    //send to database 
    res.status(200).redirect(ROUTE.gallery); 
})

app.get(ROUTE.main, (req, res) => {
    res.status(200).render(VIEW.main, {}); 
})

module.exports = { app, port, express }

