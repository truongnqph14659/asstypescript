import { data } from 'jquery';
import './style.css'
import Navigo from 'navigo'
import AddProductPage from './pages/Admin/Product/add'
import AdminPage from './pages/Admin'
import updateProductPage from './pages/Admin/Product/update'
import Home from './pages/Home/Home'
import Signup from './pages/Home/signup'
import Signin from './pages/Home/singin'
import {DetailProduct} from './component/Home/component/Detail'
import { ListCart } from './pages/Home/CartList'

const router = new Navigo('/', {linksSelector: "a"})
type ComponentBase = {
    render:(id:any)=> Promise<string>,
    afterRender?: ()=>void
}
document.addEventListener('DOMContentLoaded',()=>{
    async function print(Page:ComponentBase,id?:any) {
      const app = document.querySelector('#app')
      if (app) {
        app.innerHTML = await Page.render(id)
      }
      if (Page.afterRender) Page.afterRender()
      if (JSON.parse(localStorage.getItem('user') || "false") ){
        const user = document.querySelector('.lognout')
        user?.addEventListener('click',()=>{
          localStorage.removeItem('user')
          window.location.href ='/'
        })
      }
      
      const serchInput:any = document.querySelector('.serchInput')
      let ulDataShow:any = document.querySelector('.ulDataShow')
      const nameData = JSON.parse(localStorage.getItem('dataPro')|| "false");
      const suggestSearch =  document.querySelector('.suggestSearch')
      serchInput?.addEventListener('focus',()=>{
        suggestSearch?.classList.add('showSearch')
      })
      
      // ===========================
      if (JSON.parse(localStorage.getItem('keyword') || "false") ) {
        serchInput.value = JSON.parse(localStorage.getItem('keyword')|| "false")
      }
      // ===========================
      let dataUser:any[]
      serchInput?.addEventListener('input',()=>{
        dataUser=[]
        let data = nameData.map((item:any)=>item.name.toLocaleLowerCase().includes(serchInput.value.toLocaleLowerCase()))
        data.forEach((item:any,index:any) => {
          if(item){
            dataUser.push(nameData[index])
          }
        });
        // ===========================
        ulDataShow.innerHTML = dataUser.map((item:any)=>{
          return/*html*/`
          <a href="/search?keyword=${item.name}" class="flex hover:bg-slate-200 px-3 justify-between items-center">
            <li class=" cursor-pointer">${item.name}</li>
            <img class="w-[20px] py-1" src="${item.image}" alt="" />
          </a>
          `
        }).join('') 
      })
    }
      router.on("/admin/*", ()=>print(AdminPage), {
        before(done, params) {
            if (JSON.parse(localStorage.getItem('user') || "false") ) {
                const role = JSON.parse(localStorage.getItem('user')|| "false").role;
                if (role == 1) {
                    done();
                } else {
                    document.location.href = "/"
                }
            } else {
                document.location.href = "/"
            }
        }
    })
    router.on("/",()=>{},{
      before(done,params){
          localStorage.removeItem('keyword')
          done()
      }
    })
    router.on({
      '/':()=>print(Home),
      '/admin/addPro':()=>print(AddProductPage),
      '/admin/brand/:id':(data:any)=>print(AdminPage,+data.data.id),
      '/admin/updatepro/:id':(data:any)=>print(updateProductPage,+data.data.id),
      '/detail/:id':(data:any)=>print(DetailProduct,+data.data.id),
      '/signup':()=>print(Signup),
      '/signin':()=>print(Signin),
      '/cart':()=>print(ListCart),
      '/brands/:id':(data:any)=>print(Home,+data.data.id),
      '/search':(data:any)=>print(Home,data)
    })
    router.resolve()
  
  })