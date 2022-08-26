import { createOrder } from '../api/order';
import { ListCart } from './../pages/Home/CartList';
import  swal  from 'sweetalert';
import { rerender } from './rerender';
let cart:any=[];
if (localStorage.getItem('cart')) {
    const carts:any = localStorage.getItem('cart')
    cart = JSON.parse(carts) 
}

export const addToCart = (newProduct:any) => {
    const existProduct = cart.find((product:any) => product.id == newProduct.id);
    if (!existProduct) {
        cart.push(newProduct);
        swal({
            title: 'thêm sản phẩm vào giỏ hàng thành công',
            icon: 'success',
            timer: 3000,
        })

    } else {
        existProduct.quantity++;
        swal({
            title: 'bạn đã tăng thêm số lượng sản phẩm trong giỏ hàng',
            icon: 'success',
            timer: 3000,
        })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}
export const increaseItemInCart = (id:any,quantity:any)=> {
    const cartList:any = JSON.parse(localStorage.getItem('cart') || "false")
    if (quantity != 0 || quantity != '') {
        cartList.find((item:any)=>item.id == id).quantity=quantity
        localStorage.setItem('cart', JSON.stringify(cartList))
        return 
    }else{
    remove(id)
    rerender('#app',ListCart)
    }
}

export const remove =(id:any) => {
   const cartList:any = JSON.parse(localStorage.getItem('cart') || "false")
   const confirm = window.confirm('do you want delete?')
    if (confirm) {
       let carts =  cartList.filter((item:any)=>item.id != id)
        localStorage.setItem('cart', JSON.stringify(carts))
        rerender('#app',ListCart)
    }   
}
export const addToDb = (id:any)=>{
    const dataList:[] = JSON.parse(localStorage.getItem('cart') || "false")
    if(dataList.length==0) return
    dataList.forEach(async (item:any)=>{
        const dataObj = {proId:item.id,userId:id}
        await createOrder(dataObj)
        localStorage.removeItem("cart")
    })
    swal("đặt hàng thành công").then(()=>{
        location.href = '/'
    })

}
