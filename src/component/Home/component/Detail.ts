import { addToCart } from './../../../utils/cart';
import { getProId, getExpandItem } from './../../../api/product';
import HeaderHome from '../HeaderHome';
import footer from '../footer';
export const DetailProduct = {
   async render(id:any) {
        const {data} = await getProId(id)
        const category =  await getExpandItem(data.categorybrandId)
        const convert_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data.originalPrice)
        const convert_price_sale = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data.saleOffPrice)
        return /* html */ `
        ${HeaderHome.render()}
        <div class="mt-[30px] ">
                    <div class="ml-[140px]">
                    <p class="h5">${data.name}</p>
                    </div>
                    <hr>
                    <div class="flex">
                        <div>
                            <img class="h-[400px] mr-[70px] pt-[20px] "src="${data.image}" alt="">
                        </div>
                        <div>
                            <div class="flex   text-center">
                                <p class="text-red-600 text-[30px] pr-[20px] h4">${convert_price_sale }</p>
                                <p class="text-gray-600 text-[15px] pt-[13px] h4">${convert_price}</p>
                            </div>
                            <div class="">
                                <p class="">Mô tả ngắn: ${data.description} đ</p>
                            </div>
                            <div class="flex mt-[230px]">
                                <div class=" w-[200px] h-[50px] bg-red-600 mr-[20px]">
                                    <button type="button" class= "text-white pt-[12px]  pl-[60px]" >Mua ngay</button>
                                </div>
                                <div class=" text w-[50px] h-[50px] flex justify-center items-center border-1 border-red-600">
                                    <i class="fa-solid fa-cart-plus cart cursor-pointer  text-red-500" data-id="${data.id}" ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="ml-[140px] mt-[70px]">
                            <p>Sản phẩm cùng loại</p>
                        </div>
                        <div class="ml-[140px] mt-[70px] flex">
                            ${
                                category.data.products.map((item:any) =>{   
                                    if(item.id != id){   
                                    const convert_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.originalPrice)

                                    const convert_price_sale = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.saleOffPrice)
                                    return`
                                        <div class="w-[200px] h-[250px] ml-[10px]  ">
                                            <div class="image_products">
                                                <a href="/detail/${item.id}">
                                                    <img class="w-[120px] h-[120px] m-auto" src="${item.image}" alt="">
                                                </a>
                                            </div>
                                            <div class="info_products">
                                                <div class="text-center mt-[5px]">
                                                    <p>${item.name}</p>
                                                    </div>
                                                <div class="flex   text-center">
                                                    <p class="text-red-600 text-[18px] pr-[10px]">${convert_price_sale} </p>
                                                    <p class="text-gray-600 text-[13px] pt-[5px]">${convert_price} </p>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                                                    
                                }}).join("")
                            }
                        </div>
                    </div>
                    <div class="bg-slate-200 ml-[140px] mr-[140px]">
                        <div class=" text-center pt-[20px]">
                            <p class="text-red-500 h5 ">ĐẶC ĐIỂM NỔI BẬT</p>
                        </div>
                        <div class="ml-[140px] mr-[140px] pb-[20px]">
                            <p class="">${data.description}</p>
                        </div>
                    </div>
                    <div class="ml-[140px] mr-[140px]  mt-[20px] mb-[200px] ">
                        <p class="">${data.shortDescription}</p>
                    </div>
                </div>
                ${footer.render()}
            
        `
    },
    afterRender():void{
        const Cart:any = document.querySelector('.cart')
        const id = Cart.dataset.id
        Cart?.addEventListener('click',async()=>{ 
                const {data} = await getProId(id)
                addToCart({...data,quantity:1})
                return
       })
    }
}
