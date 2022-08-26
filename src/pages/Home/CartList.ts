import { addToDb, increaseItemInCart } from './../../utils/cart';
import { data, map } from 'jquery';
import swal from 'sweetalert';
import HeaderHome from "../../component/Home/HeaderHome";
import { remove } from '../../utils/cart';
import footer from "../../component/Home/footer";
import { rerender } from '../../utils/rerender';
export const ListCart = {
    async render(){
        let totalPrice = 0
        let user = 0
        if(JSON.parse(localStorage.getItem('user') || "false")){
            user = JSON.parse(localStorage.getItem('user') || "false").id
        }
        const data = JSON.parse(localStorage.getItem('cart') || "false").length>0?JSON.parse(localStorage.getItem('cart') || "false"):[]
        if(data.length>0){
            data.forEach((item:any) => {
                totalPrice+=(item.quantity*item.originalPrice)  
            });  
        }
        return/*html*/`
        ${HeaderHome.render()}
        <div class="container">
        <h4 class="title_giohang">Giỏ hàng</h4>
            <div class="table-responsive-xl">
                <table class="table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col a">sản phẩm</th>
                            <th scope="col b">tên sản phẩm</th>
                            <th scope="col c">đơn giá</th>
                            <th scope="col c">số lượng</th>
                            <th scope="col c">tổng tiền</th>
                            <th scope="col">xóa</th>
                        </tr>
                    </thead>
                    <tbody class="tbody">
                        ${
                            data.map((item:any)=>{
                                return/*html*/`
                                <tr class="tr_data_cart">
                                    <th class="a">
                                        <img src="${item.image}" class="rounded mx-auto d-block">
                                    </th>
                                    <td class="b">${item.name}</td>
                                    <td class="c price_item">${item.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td class="c"><input type="number" min="1" name="quantity_order" data-id="${item.id}" data value="${item.quantity}" class="form-control quantity_order m-auto"></td>
                                    <td class="c tong_tien_item">
                                    ${(item.quantity*item.originalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
                                    </td>
                                    <td>
                                        <div class="d-grid gap-xl-1 d-md-block">
                                            <button class="btn btn-primary delete_items" data-id="${item.id}">xóa</button>
                                        </div>
                                    </td>
                                </tr>

                                `
                            }).join('')
                        }
                                
                    </tbody>
                </table>
            </div>
            <div class="d-xl-flex justify-content-xl-between flex_payment">
                <div class="continue_purchase">
                    <div class="card-body">
                        <a href="index.php">tiếp tục mua sắm</a>
                    </div>
                </div>
                <div class="table-responsive-sm">
                    <table class="table table-borderless table_payment">
                        <tbody>
                            <tr>
                                <td class="price_text">tổng tiền:</td>
                                <td class="price_number">
                                ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="payment_shipping">phí vận chuyển và thuế được tính lúc thanh toán
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="payment_button">
                                        <button class="payOrder" data-user="${user}">thanh toán</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
    ${footer.render()}
        `
    },
    afterRender(){
        const quantity_order =  document.querySelectorAll('.quantity_order')
        const user:any = document.querySelector('.payOrder')
        const tr_data_cart = document.getElementsByClassName('tr_data_cart')
        const deleteNode = document.querySelectorAll('.delete_items')
        const get_input_value = document.getElementsByClassName('quantity_order')
        for (var i = 0; i < tr_data_cart.length; i++) {
            get_input_value[i].addEventListener('input', (e:any) => {
                var parent = e.target.parentElement.parentElement
                var kq = parent.querySelector('.price_item').innerHTML.replace(/,/g, "") *e.target.value
                parent.querySelector('.tong_tien_item').innerHTML = kq.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"
                ListCart.tong_tien()
            })
        }
        deleteNode.forEach((item:any)=>{
            item.addEventListener('click',()=>{
                let id = item.dataset.id
                remove(id)   
            })
        })
        quantity_order.forEach((item:any)=>{
            item.addEventListener('input',()=>{
                const id = item.dataset.id
                increaseItemInCart(id,item.value)
            })
        })
        user?.addEventListener('click',()=>{
            const userId = user.dataset.user
            if(userId==0){
                swal({
                    title: 'cần tài khoản mua hàng',
                    icon: 'warning',
                    timer: 3000,
                })
                return
            }
            addToDb(userId)
            
            
        })
    },
    tong_tien(){
        var tong = 0;
        var hien_thi_tt:any = document.querySelector('.price_number')
        var tong_tien = document.querySelectorAll('.tong_tien_item');
        tong_tien.forEach((price_item) => {
            tong += Number(price_item.innerHTML.toString().replace(/,|đ/g, ""))
        })
        hien_thi_tt.innerHTML = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
    }
}