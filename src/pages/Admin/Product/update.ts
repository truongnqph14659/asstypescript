import { getProId } from './../../../api/product';

import { uploadFile } from './../../../component/Admin/uploadPic';
import { createProduct,getCate,getExpand,getBrand,updatePro} from "../../../api/product"
import swal from 'sweetalert';
import AdminHeader from "../../../component/Admin/Header"
import Sidebar from "../../../component/Admin/Sidebar"
import Product from "../../../model/product"
import { map } from 'jquery';

const updateProductPage = {
    render: async (id:any) => {
        let select=''
        const oldData = await getProId(id)
        console.log(oldData);
        
        const cate = await getBrand()
        cate.data.forEach((item:any) => {
        if (item.id == oldData.data.categorybrandId) {
            select += `<option selected value="${item.id}">${item.name}</option>`
        } else {
            select += `<option value="${item.id}">${item.name}</option>`
        }
        })

        const {data} = await getCate()
        return /*html*/`
        ${AdminHeader.render()}
        <div class="flex mt-4 divide-x">
            <div class="w-[250px] flex-none">
                ${Sidebar.render()}
            </div>
            <div class="grow px-4">
                <div>
                <h3>Thêm mới sản phẩm</h3>
                <form name='form_input' data-img="${
                    oldData.data.image
                  }" data-id="${id}">
                    <div class="grid grid-cols-3 gap-8">
                        <div class="">
                            <div class="flex flex-col justify-center items-center border rounded-md h-[250px]">
                                <div class="space-y-1 text-center">
                                    <img src="${oldData.data.image}" id="preview" class="w-[100px] h-[100px]" />
                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="flex text-sm text-gray-600">
                                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file_upload" accept="image/jpg, image/jpeg, image/png" type="file" class="sr-only">
                                    </label>
                                    </div>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 100MB</p>
                                </div>
                            </div>
                            <label for="">Mô tả ngắn</label>
                            <textarea class="w-full border" id="shortDescription" name="shortDescription">${oldData.data.shortDescription}</textarea>
                        </div>
                        <div class="col-span-2">
                            <div>Thông tin sản phẩm</div>
                            <div class="flex flex-col mt-4">
                            <label for="">Tên sản phẩm:</label>
                            <input id="name" name="Name_product" type="text" value="${oldData.data.name}" placeholder="Tên sản phẩm" class="w-full border rounded-sm h-10">
                            </div>
                            <div class="grid grid-cols-2 gap-4 mt-4">
                            <div class="flex flex-col">
                                <label for="">Giá gốc:</label>
                                <input id="originalPrice" name="originalPrice" value="${oldData.data.originalPrice}" type="text" placeholder="Giá gốc" class="w-full border rounded-sm h-10">
                            </div>
                            <div class="flex flex-col">
                                <label for="">Giá khuyến mãi:</label>
                                <input type="text" id="saleOffPrice" name="saleOffPrice" value="${oldData.data.saleOffPrice}" placeholder="Giá khuyến mãi" class="w-full border rounded-sm h-10">
                            </div>
                            <div class="">
                                <p>Category</p>
                                <select class="form-select" id="Category" name="category" aria-label="Default select example">
                                    <option disabled selected>Chọn Category</option>
                                    ${
                                      data.map((item:any)=>{
                                        return /*html*/`
                                        <option value="${item.id}">${item.name}</option>
                                        `
                                      }).join('')
                                    }
                                </select>
                            </div>
                            <div class="">
                                <p>Danh mục brand</p>
                                <select class="form-select" id="brand" name="brands" aria-label="Default select example">
                                    ${select}
                                </select>
                            </div>
                        </div>
                        <div class = "mt-5">
                            <label for="feature" class="block text-sm font-medium text-gray-700">
                                Đặc điểm nổi bật
                            </label>
                            <div class="mt-1">
                                <textarea id="feature" name="feature" rows="3" class="feature shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md h-48 " placeholder="you@example.com">
                                ${oldData.data.feature}
                                </textarea>
                            </div>
                        </div>
                        <div class = "mt-5">
                            <label for="desc" class="block text-sm font-medium text-gray-700">
                            Mô tả dài
                            </label>
                            <div class="mt-1">
                                <textarea id="desc" name="desc" rows="3" class="feature shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md h-48 " placeholder="you@example.com">
                                ${oldData.data.description}
                                </textarea>
                            </div>
                        </div>
                        <div class="px-4 py-3 text-left sm:px-6">
                            <button type="submit"  class="add-product-btn send inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                add 
                            </button>
                        </div>
                    </div>
                    </form>
                </div>        
        </div>
        `
    },
    afterRender: async () => {
        let defaultOption:string = ''
        var picUrl = ""
        const inputFile:any = document.querySelector('#file-upload')
        const preview:any = document.querySelector('#preview')
        const form_select:any = document.querySelector('#Category')
        const brand:any = document.querySelector('#brand')

        $(function () {
            (<any>$("form[name='form_input']")).validate({
                errorClass: 'error',
                errorElement: 'span',
                rules: {
                  Name_product: {
                    required: true,
                  },
                  originalPrice:{
                    required: true,
                  },
                  saleOffPrice: {
                    required: true,
                  },
                  desc: "required",
                  feature:{
                    required: true,
                  },
                  shortDescription: {
                    required: true
                  }
                  ,
                  brands:{
                    required:true
                  }
                },
                messages:{
                  Name_product:{
                    required:"không được bỏ trống",
                    minlength:"trên 5 ký tự"
                  },
                  originalPrice:{
                    required:"không được bỏ trống",
                  },
                  saleOffPrice:{
                    required:"không được bỏ trống",
                  },
                  feature:{
                    required:"không được bỏ trống"
                  },
                  desc:{
                    required:"không được bỏ trống"
                  },
                  shortDescription:{
                    required:"không được bỏ trống"
                  },
                  brands:{
                    required:"không được bỏ trống"
                  }
                },
                submitHandler: async function (form:any,event:any) {
                    event.preventDefault()
                    const id = form.dataset.id
                    const img = form.dataset.img
                    const name = (<HTMLInputElement>document.querySelector("#name")).value
                    const originalPrice = (<HTMLInputElement>document.querySelector("#originalPrice")).value
                    const saleOffPrice = (<HTMLInputElement>document.querySelector("#saleOffPrice")).value
                    const cateBrand = (<HTMLInputElement>document.querySelector("#brand")).value
                    const shortDescription = (<HTMLInputElement>document.querySelector("#shortDescription")).value
                    const feature = (<HTMLInputElement>document.querySelector("#feature")).value
                    const desc = (<HTMLInputElement>document.querySelector("#desc")).value
                    picUrl=img
                    if (inputFile.value !== '') {
                        if(inputFile.files[0].size>100000){
                              swal("kích thước ảnh quá 100mb")
                        }else{
                          const pic = await uploadFile(inputFile.files[0])
                          picUrl = pic.data.url
                          preview.src = picUrl
                        }
                    }
                    const data= {
                      name: name,
                      originalPrice: +originalPrice,
                      saleOffPrice: +saleOffPrice,
                      categorybrandId: +cateBrand,
                      feature: feature,
                      description: desc,
                      shortDescription:shortDescription,
                      image: picUrl
                    }
                    const notice = await updatePro(id,data)
                    if(notice){
                      swal({
                        title: "update thanh cong!",
                      })
                      setTimeout(() => {
                        window.location.href="http://localhost:3000/admin"
                      }, 1000);
                    }
                }
            })
          })
          inputFile?.addEventListener('change', async ()=>{
            const pic = inputFile.files[0]
            if(pic.size>100000){
                   swal("kích thước ảnh quá 100mb")
            }else{
             const picCloud = await uploadFile(pic)
             preview.src = picCloud.data.url
             picUrl = picCloud.data.url
            }
          })
          form_select.addEventListener('change',async ()=>{
            defaultOption = ''
            defaultOption+='<option disabled selected>Chọn brands</option>'
            const data:any = await getExpand(form_select.value)
            defaultOption+= data.data.categorybrands.map((item:any)=>{
              return /*html*/`
              <option value="${item.id}">${item.name}</option>
              `
            }).join('')
            brand.innerHTML = defaultOption
          })
    }
}

export default updateProductPage