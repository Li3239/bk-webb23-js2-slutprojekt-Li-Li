// caculate the Total Price
export function CartInfo(data) {
    console.log('[CartInfo]  param data= ', data);
    let price = 0;
    let number = 0;
    let item = [];
    if(data) {
        data.forEach(element => {
            price += element.price * element.amount;
            number += element.amount;
        });
    }

    // item.push({ totalPrice: price, quantity: number });
    item = { totalPrice: price, quantity: number };

    return item;
}