import { data } from 'jquery';
import { getExpandItem, search } from './../../../api/product';
import { getPro } from "../../../api/product"
const products = {
    render: async (id:any)=>{
        let dataView
        if(id){
            if(typeof(id)=='object'){
                localStorage.setItem('keyword', JSON.stringify(id.params.keyword))
                const {data} = await search(id.params.keyword)
                dataView=data
            }else{
                const {data} = await getExpandItem(id)
                dataView = data.products
            }
        }else{
           const {data} = await getPro()
           dataView = data
        }
        
        return /*html*/`
        <div class="mt-[350px] ml-[15px]>
                    <div id="tieude">
                        <p class="h3 pl-[250px] pb-[30px]">ĐIỆN THOẠI NỔI BẬT</p>
                    </div>
                    <div class="grid grid-cols-5 px-10 place-items-center gap-2 text-center">
                        ${
                            dataView.map((item:any) =>{
                                const convert_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.originalPrice)
                                const convert_price_sale = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.saleOffPrice)
                                return`
                                    <div class="">
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
                                            <div class="h-[50px] bg-slate-300 w-[185px]  text-center">
                                                <div id="desc">
                                                    <p>day la san pham của năm mới</p>
                                                </div>
                                            </div>
                                            <div class=" text-center">
                                                <div>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                </div>
                                                <div><p>12 lượt đánh giá</p></div>
                                            </div>
                                        </div>
                                    </div>
                                `
                            }).join("")
                        }
                    </div>
                </div>
        `
    }
}

export default products