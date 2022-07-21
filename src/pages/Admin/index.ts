import AdminHeader from "../../component/Admin/Header"
import Sidebar from "../../component/Admin/Sidebar"

const AdminPage = {
    async render(){
        return /*html*/`
        ${AdminHeader.render()}
        <div class="flex mt-4 divide-x">
            <div class="w-[250px] flex-none">
                ${Sidebar.render()}
            </div>
            <div class="grow px-4">
                <div class="flex justify-between">
                    <div>
                    <h1 class="text-[30px] font-bold">Điện Thoại</h1>
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
                     <select class="form-select" aria-label="Default select example">
                        <option selected>Tất cả sản phẩm</option>
                        <option value="1">Điện thoại</option>
                        <option value="2">Máy tính</option>
                        <option value="3">Tai nghe</option>
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
                    <tbody>
                        <tr class="text-center align-middle">
                        <th scope="row">1</th>
                        <td>Iphone</td>
                        <td>10.000.000đ</td>
                        <td>
                            <div class="flex justify-center">
                                <img src="https://1.bp.blogspot.com/-hN0NCoAmEDY/X8z1OcRjXmI/AAAAAAAAlc0/hHqbHzqOPhIABiVomzpYacPeEufV816QQCNcBGAsYHQ/s0/hinh-nen-may-cuc-dep.jpg"  class="rounded w-[100px]" alt="...">
                            </div>
                        </td>
                        <td>Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, </td>
                        <td>
                            <div class="flex justify-center form-check form-switch ">
                                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                            </div>
                        </td>
                        <td>
                            <a href="index">
                            <i class="fa-solid fa-share-from-square"></i>
                            </a>
                        </td>
                        <td>
                            <a href="index">
                            <i class="fa-solid fa-bell"></i>
                            </a>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `
    }
    
}

export default AdminPage