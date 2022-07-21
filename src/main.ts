import './style.css'
import Navigo from 'navigo'
import AddProductPage from './pages/Admin/Product/add'
import AdminPage from './pages/Admin'
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
    }
    router.on({
      '/admin':()=>print(AdminPage),
      '/admin/addPro':()=>print(AddProductPage)
    })
    router.resolve()
  
  })