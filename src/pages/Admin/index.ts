import { map } from 'jquery';
import { getExpand, getCateId, getPro, deletePro, getExpandItem, getProId } from './../../api/product';
import AdminHeader from "../../component/Admin/Header"
import Sidebar from "../../component/Admin/Sidebar"

const AdminPage = {
    async render(id:any){
        let databrands=""
        let namecate=""
        let idcheck = id>0?id:0
        let {data} = await getPro()
        if(id>0){ 
            let name
            data = []
            let dataBrand = await getExpand(id)
            dataBrand.data.categorybrands.forEach(async (item:any)=>{
                const dataRlate = await getExpandItem(item.id)
                if(dataRlate.data.products.length>0){
                    dataRlate.data.products.forEach((item:any)=>{
                        data.push(item)
                    })
                }
            })
            console.log(data);
            
            name = await getCateId(id)
            namecate = name.data.name 
            databrands = dataBrand.data.categorybrands.map((item:any)=>{
                return /*html*/`
                <option value="${item.id}">${item.name}</option>
                `
            }).join('')
            // console.log(items);
            
        }
        return /*html*/`
        ${AdminHeader.render()}
        <div class="flex mt-4 divide-x">
            <div class="w-[250px] flex-none">
                ${Sidebar.render()}
            </div>
            <div class="grow px-4">
                <div class="flex justify-between">
                    <div>
                    <h1 class="text-[30px] font-bold">${namecate}</h1>
                    </div>
                    <a href="/admin/addPro">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </a>
                </div>    
                <div class="flex">
                     <div class="self-center px-8">
                     lọc
                     </div>
                     <div class="w-64">
                     <p>Danh mục sản phẩm</p>
                     <select class="form-select" id="brands" data-idcate="${idcheck}" aria-label="Default select example">
                        <option disabled selected >Tất cả sản phẩm</option>
                        ${databrands}
                    </select>
                     </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr class="text-center align-middle">
                        <th scope="col">#</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Thành tiền </th>
                        <th scope="col">ảnh</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Ân / hiện</th>
                        <th scope="col">Thao tác</th>
                        <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody id="contend_row">
                        ${
                            data.map((item:any,index:any)=>{
                                return/*html*/`
                                <tr class="text-center align-middle">
                                    <th scope="row">${index+1}</th>
                                    <td>${item.name}</td>
                                    <td>${item.originalPrice}đ</td>
                                    <td>
                                        <div class="flex justify-center">
                                            <img src="${item.image}"  class="rounded w-[100px] h-[80px]" alt="...">
                                        </div>
                                    </td>
                                    <td>${item.description}</td>
                                    <td>
                                        <div class="flex justify-center form-check form-switch ">
                                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                                        </div>
                                    </td>
                                    <td>
                                        <a href='/admin/updatepro/${item.id}'>
                                        <i class="fa-solid fa-gears"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <i class="fa-solid fa-box-archive cursor-pointer" data-id="${item.id}" data-idcate="${idcheck}"></i>
                                    </td>
                                </tr>
                                `
                            }).join('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
        `
    },
    afterRender: async () => {
        const selectDelete = Array.from(document.querySelectorAll('.cursor-pointer'))
        const selectBrand = (<HTMLInputElement>document.querySelector('#brands'))
        let contend_row:any = document.querySelector('#contend_row')
        selectDelete.map((item:any)=>{
            item.addEventListener('click',async ()=>{
                const confirm = window.confirm('chắc chắn xóa không?')
                if(confirm){
                    const result =  await deletePro(+item.dataset.id)
                    if(result){
                    alert("xóa thành công!")
                    if(item.dataset.idcate>0){
                        setTimeout(() => {
                        window.location.href=`/admin/brand/${item.dataset.idcate}`
                      }, 1000)
                    }else{
                        setTimeout(() => {
                            window.location.href=`http://localhost:3000/admin`
                          }, 1000)
                    }
                }
                }
            })
        })
        selectBrand?.addEventListener('change',async ()=>{
            const {data} = await getExpandItem(selectBrand.value)
            const idcheck = selectBrand.dataset.idcate
            contend_row.innerHTML = data.products.map((item:any,index:any)=>{
                return/*html*/`
                <tr class="text-center align-middle">
                    <th scope="row">${index+1}</th>
                    <td>${item.name}</td>
                    <td>${item.originalPrice}đ</td>
                    <td>
                        <div class="flex justify-center">
                            <img src="${item.image}"  class="rounded w-[100px] h-[80px]" alt="...">
                        </div>
                    </td>
                    <td>${item.description}</td>
                    <td>
                        <div class="flex justify-center form-check form-switch ">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                        </div>
                    </td>
                    <td>
                        <a href='/admin/updatepro/${item.id}'>
                        <i class="fa-solid fa-gears"></i>
                        </a>
                    </td>
                    <td>
                        <i class="fa-solid fa-box-archive cursor-pointer" data-id="${item.id}" data-idcate="${idcheck}"></i>
                    </td>
                </tr>
                `
            }).join('') 
            AdminPage.afterRender()
        })

    }
}

export default AdminPage