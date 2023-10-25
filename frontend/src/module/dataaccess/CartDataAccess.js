const ERR_GET = 'Something is wrong in getCartData function.';
const ERR_POST = 'Something is wrong in postCartData function.';
const ERR_PATCH = 'Something is wrong in patchCartData function.';
const ERR_DELETE = 'Something is wrong in deleteCartData function.';
const baseUrl =`http://localhost:3000/cart`;

export async function getCartData(id) {
    let url = baseUrl;
    if(id != undefined) url = baseUrl + `?id=${id}`;
    // console.log('Get cart data URL : ', url);

    try{
        const response = await fetch(url);
        if(response.status >= 200 && response.status < 300) {
            const data = await response.json();
            // console.log(data);
            return data;
        } else {
            throw ERR_GET;
        }
    } catch(ex) {
        console.log(ex);
    }
}

export async function postCartData(obj) {
    const url = baseUrl;
    console.log('Post cart data url :', url);

    const newContent = {
        id: obj.id,
        title: obj.title,
        amount: 1,
        category: obj.category,
        imgUrl1: obj.imgUrl1,
        price: obj.price,
        inventory: obj.inventory
    };

    const header = {
        "Content-type": "application/json; charset=UTF-8"
    };
    
    const options = {
        method: "POST",
        body: JSON.stringify(newContent),
        headers: header
    };
    
    try{
        const request = await fetch(url, options);
        console.log(request);
        if(request.status >= 200 && request.status < 300){
            const obj = request.json();
            console.log(obj);
            return obj
        } else {
            console.log(request.status);
            throw ERR_POST;
        }
    } catch(ex) {
        console.log(ex);
    }
}

// update
export async function patchCartData(id, amount, action) {
    const url = baseUrl + `?id=${id}`;
    console.log('Patch cart data url :', url);

    // sent to server req.body
    const content = {
        amount: action? parseInt(amount) + 1 : parseInt(amount) -1
    };

    const header = {
        "Content-type": "application/json; charset=UTF-8"
    };
    
    const options = {
        method: "PATCH",
        body: JSON.stringify(content),
        headers: header
    };

    try{
        const request = await fetch(url, options);
        if(request.status >= 200 && request.status < 300) {
            const obj = await request.json();
            console.log(obj);
            return obj;
        } else {
            throw ERR_PATCH;
        }
    } catch(ex) {
        console.log(ex);
    }
}

// remove data from cart.json
export async function deleteCartData(id) {
    // const url = baseUrl + `?id=${id}`;
    const url = (id != undefined)? (baseUrl + `?id=${id}`) : baseUrl;
    console.log('Delete cart data url = ', url);
    
    const options = {
        method: "DELETE"
    };

    try{
        const request = await fetch(url, options);
        if(request.status >= 200 && request.status < 300) {
            const obj = request.json();
            console.log(obj);
            return obj;
        } else {
            throw ERR_DELETE;
        }
    } catch(ex){
        console.log(ex);
    }
}