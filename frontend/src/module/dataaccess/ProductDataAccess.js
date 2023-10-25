const ERR_GET = 'Something is wrong in getProductData function.';
const ERR_PATCH = 'Something is wrong in patchProductData function.';
const baseUrl =`http://localhost:3000/products`;

// export async function getProductData(title, category) {
export async function getProductData(searchObj) {
    let url = baseUrl;
    console.log('[ProductDataAccess.js] getProductData searchObj >>>>>>>', searchObj);

    const buildTempUrl = () => {
        let tempUrl = '';
        
        // check title search key 
        if (searchObj.title) {
            tempUrl += `?title=${searchObj.title}`;
        }

        // check category search key 
        if (searchObj.category) {
            if (tempUrl) {
                tempUrl += '&';
            } else {
                tempUrl += '?';
            }
            tempUrl += `category=${searchObj.category}`;
        }

        // check orderby 
        if (searchObj.orderby != undefined) {
            if (tempUrl) {
                tempUrl += '&';
            } else {
                tempUrl += '?';
            }
            tempUrl += `orderby=${searchObj.orderby}`;
        }
        console.log('[ProductDataAccess.js] getProductData tempUrl >>>>>>>', tempUrl);
        return tempUrl;
    }

    url = url + buildTempUrl();
    console.log('[ProductDataAccess.js] getProductData URL :', url);

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

// update
export async function patchProductData(id, amount) {
    const url = baseUrl + `?id=${id}`;
    // console.log('Patch product data url :', url);

    // sent to server req.body
    const content = {
        amount: parseInt(amount)
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
            // console.log(obj);
            return obj;
        } else {
            throw ERR_PATCH;
        }
    } catch(ex) {
        console.log(ex);
    }
}