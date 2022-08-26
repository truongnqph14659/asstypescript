import { getPro } from './../../api/product';
import { accesories } from './../../component/Home/component/Accessories';
import banner_user from "../../component/Home/component/NavbarHome"
import Header from "../../../src/component/Home/HeaderHome"
import products from "../../component/Home/component/products"
import footer from '../../component/Home/footer';

const Home ={
    async render(id:any){
       const {data} = await getPro()
       localStorage.setItem('dataPro', JSON.stringify(data))
       if(typeof(id)=='object'){
        return `
        ${Header.render()}
        ${await banner_user.render()}
        ${await products.render(id)}
        ${accesories.render()}
        ${footer.render()}
        `
       }
       return `
            ${Header.render()}
            ${await banner_user.render()}
            ${await products.render(id)}
            ${accesories.render()}
            ${footer.render()}
       `
    }
}

export default Home
