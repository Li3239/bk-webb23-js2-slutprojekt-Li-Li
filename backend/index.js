const PRODUCT_JSON_FILE = './data/products.json';
const CART_JSON_FILE = './data/cart.json';
const _ = require('underscore');

const fs = require('fs'); // import file system
const express = require('express'); // import express Library

const app = express();
app.use(express.json());
// 下边的error，解决的办法是添加：Access-Control-Allow-Methods
// Method PATCH is not allowed by Access-Control-Allow-Methods.
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    next();
  });

// add listener  
app.listen('3000', ()=>{
    console.log('Listen on Port 3000.......');
})


// *******************************
// Product data
// *******************************
let products = '';
// get json data from json file
// fs.readFileSync: 直到文件读取完毕，否则一直停在这里，这是一个同步处理
products = JSON.parse(fs.readFileSync(PRODUCT_JSON_FILE, 'utf8'));

// get product data, parameter: req.query.title/req.query.category
// http://localhost:3000/products?title=soffa&category=soffor
app.get('/products', (req, res)=>{
    let body = [];
    try{
        const paramTitle = req.query.title;
        const paramCategory = req.query.category;
        const paramOrderby = req.query.orderby;
        console.log('req.query = ', req.query);
        // ===============================
        // only parameter "title" exists
        // ===============================
        if(paramTitle != undefined && paramCategory == undefined) {
            const title = paramTitle.toLowerCase();
            for(let product of products){
                const productTitle = product.title.toLowerCase();
                if(productTitle.includes(title)){
                    // console.log(productTitle);
                    body.push(product);
                }
            }
        } else if(paramTitle == undefined && paramCategory != undefined) {
            // ===============================
            // only parameter "category" exists
            // ===============================
            const category = paramCategory.toLowerCase();
            for(let product of products){
                const productCategory = product.category.toLowerCase();
                if(productCategory.includes(category)){
                    // console.log(productCategory);
                    body.push(product);
                }
            }
        } else if(paramTitle != undefined && paramCategory != undefined) {
            // =========================================
            // both parameter "title" and "category" exists
            // =========================================
            const title = paramTitle.toLowerCase();
            const category = paramCategory.toLowerCase();

            for(let product of products){
                const productTitle = product.title.toLowerCase();
                const productCategory = product.category.toLowerCase();
                if(productTitle.includes(title) && productCategory.includes(category)){
                    body.push(product);
                }
            }
        } else {
            // no request parameter
            // return all products
            body = products;
        }

        // sort in reverse order
        if(paramOrderby == 'false'){
            console.log('reverse sort by..........');
            body = _.sortBy(body, (element) => {
                return -element.price;
            });
        } else if(paramOrderby == 'true'){
            console.log('positive sort by..........');
            body = _.sortBy(body, (element) => {
                 return element.price;
            });
        }
    } catch(ex) {
        body = {error: 'Something went wrong in backend Fetch(get products) function: '};
        console.log(ex);
    }

    // console.log('Product data amount', body.length);
    res.send(body);
});

// update: http://localhost/products?id=SK-001
// parameter id includes in req.query.id
// parameter value:SK-001 includes in req.body.id
app.patch('/products', (req, res)=>{
    const myAmount = req.body.amount;
    console.log('Patch product body.amount=', myAmount);
    if(myAmount == undefined || myAmount == null){
        return;
    }
    const queries = req.query;
    // parameter exists
    if(queries.id != undefined){
        for(const product of products) {
            if(product.id.toLowerCase() == queries.id.toLowerCase()) {
                console.log('Patch product=', product);
                product.inventory = ((product.inventory - myAmount) >= 0) ? 
                                     (product.inventory - myAmount) : 0;
                product.soldQuantity = product.soldQuantity + myAmount;
            }
        }
    } else {
        // parameter not exists => do nothing
        console.log(`Product id = [${req.query.id}] no match.`);
    }
    // update cart.json file
    fs.writeFileSync(PRODUCT_JSON_FILE, JSON.stringify(products));
    // return to frontend with response
    res.send(products);
})

// *******************************
// Cart data
// *******************************
let cart = '';
// get json data from json file
// fs.readFileSync: 直到文件读取完毕，否则一直停在这里，这是一个同步处理
cart = JSON.parse(fs.readFileSync(CART_JSON_FILE, 'utf8'));

// Get cart data, parameter: req.query.id
// http://localhost:3000/products?id=SF-002
app.get('/cart', (req, res)=>{
    let body = [];
    try{
        const id = req.query.id;
        // ===============================
        // only parameter "title" exists
        // ===============================
        if(id != undefined) {
            const tempId = id.toLowerCase();
            for(let item of cart){
                const cartId = item.id.toLowerCase();
                if(cartId.includes(tempId)){
                    // console.log(cartId);
                    body.push(item);
                }
            }
        } else {
            // no request parameter
            // return all cart data
            body = cart;
            // console.log('No request parameter defined');
        }
    } catch(ex) {
        body = {error: 'Something went wrong in backend Fetch(get cart) function.'};
        console.log(ex);
    }

    // console.log('Cart data: ', body);
    res.send(body);
})

// Post cart data
// http://localhost:3000/products
app.post('/cart', (req, res)=>{
    cart.push(req.body);
    fs.writeFileSync(CART_JSON_FILE, JSON.stringify(cart));

    // console.log('Cart data: ', cart);
    res.send(cart);
})

// update: http://localhost/cart?id=SK-001
// parameter id includes in req.query.id
// parameter value:SK-001 includes in req.body.id
app.patch('/cart', (req, res)=>{
    const myAmount = req.body.amount;
    if(myAmount == undefined || myAmount == null){
        return;
    }
    const queries = req.query;
    // parameter exists
    if(queries.id != undefined){
        for(const element of cart) {
            if(element.id == queries.id) {
                element.amount = myAmount;
            }
        }
    } else {
        // parameter not exists => do nothing
        console.log(`Cart id = [${req.query.id}] no match.`);
    }
    // update cart.json file
    fs.writeFileSync(CART_JSON_FILE, JSON.stringify(cart));
    // return to frontend with response
    res.send(cart);
})

// http://localhost:1234/cart?id=SP-001
app.delete('/cart', (req, res)=>{
    const queries = req.query;
    if(queries.id != undefined){
        for(const item of cart){
            cart = cart.filter((item) => {
                return item.id.toLowerCase() !== queries.id.toLowerCase();
            });
        }
    } else {
        // parameter not exists => delete all 
        cart = [];
        console.log(`No req.query exists, delet all cart data.`);
    }

    // write in json file
    fs.writeFileSync(CART_JSON_FILE, JSON.stringify(cart));
    // response back to fronend
    res.send(cart);
})
